"use client";
import React, { useState } from "react";
import CustomSwiper from "@/app/_ui/swiper";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Policy } from "./Policy";
import useData from "@/hooks/useData";
import {
  database_leave_policies_type,
  database_leave_request_duration_used_type,
  database_leave_requests_type,
  database_profile_leave_balance_type,
  databese_leave_categories_track_time_unit_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { generateLeaveCategorieIcon } from "@/helpers/leave.helpers";
import useToast from "@/hooks/useToast";
import { useParams } from "next/navigation";
import useEmployeeData from "@/hooks/useEmloyeeData";
interface formatted_policy_type {
  id: number;
  name: string;
  title: string;
  category_time_unit: databese_leave_categories_track_time_unit_type;
  icon: JSX.Element;
  hours_scheduled: number;
  hours_available: number;
}
export function PolyciesSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const params = useParams();
  const { employeeId } = params;
  const {
    leave_policies: { data: leave_policies, isPending: isPending1 },
    leave_categories: { data: leave_categories, isPending: isPending2 },
  } = useData();
  const {
    leave_requests: { data: leave_requests, isPending: isPending4 },
    employee_profile: { data: employee_profile, isPending: isPending5 },
  } = useEmployeeData({ employeeId: employeeId });
  const isPending = isPending1 || isPending2 || isPending4 || isPending5;
  const user_policies_ids = employee_profile?.leave_balance?.map(
    (e: database_profile_leave_balance_type) => e.policy_id,
  );
  const policies: formatted_policy_type[] = leave_policies
    ?.filter(
      (policy: database_leave_policies_type) =>
        user_policies_ids?.includes(policy.id),
    )
    ?.map((policy: database_leave_policies_type) => {
      const categorie: databese_leave_categories_type = leave_categories?.find(
        (categorie: databese_leave_categories_type) =>
          categorie.id === policy?.categories_id,
      );
      const hours_scheduled = leave_requests
        ?.filter(
          (leave: database_leave_requests_type) =>
            new Date(leave.start_at) > new Date() &&
            leave.policy_id === policy.id &&
            leave.status === "approved",
        )
        .reduce(
          (acc: [], leave: database_leave_requests_type) => [
            ...acc,
            ...leave.duration_used,
          ],
          [],
        )
        .reduce(
          (acc: number, e: database_leave_request_duration_used_type) =>
            acc + Number(e.duration),
          0,
        );
      return {
        id: policy.id,
        name: policy.name,
        title: categorie?.name,
        category_time_unit: categorie?.track_time_unit,
        icon: generateLeaveCategorieIcon({
          categorie: categorie,
          className: "h-9 w-9",
        }),
        hours_scheduled: hours_scheduled,
        hours_available:
          employee_profile?.leave_balance?.find(
            (e: database_profile_leave_balance_type) =>
              e.policy_id == policy.id,
          )?.balance || 0,
      };
    });
  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <section className="relative mx-auto block w-full max-w-[57.5vw] px-12 ">
        {policies?.length > 0 && (
          <>
            <div className="btn_swiper_arrow_left absolute -left-5 top-[40%] cursor-pointer ">
              <FaArrowLeft
                className="h-10 w-10 border border-gray-26 p-2 text-gray-25"
                hidden={activeIndex === 0}
              />
            </div>
            <div
              className="btn_swiper_arrow_right absolute -right-5 top-[40%] cursor-pointer"
              hidden={activeIndex === policies?.length - 3}
            >
              <FaArrowRight className="h-10 w-10 border border-gray-26 p-2 text-gray-25" />
            </div>
            <CustomSwiper
              setActiveIndex={setActiveIndex}
              navigation={{
                prevEl: ".btn_swiper_arrow_left",
                nextEl: ".btn_swiper_arrow_right",
              }}
              slidesPerView={3}
              slides={policies?.map((policy, i: number) => (
                <Policy key={policy.name + i} {...policy} />
              ))}
            />
          </>
        )}
      </section>
    </>
  );
}
