"use client";
import React, { Suspense, useState } from "react";
import CustomSwiper from "@/app/_ui/swiper";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Policy } from "./Policy";
import {
  database_leave_policies_policy_type,
  database_leave_policies_type,
  database_leave_request_duration_used_type,
  database_leave_requests_type,
  database_profile_leave_balance_type,
  databese_leave_categories_track_time_unit_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { generateLeaveCategorieIcon } from "@/helpers/TimeOff/leave.helpers";
import { useParams } from "next/navigation";
import useEmployeeData from "@/hooks/useEmloyeeData";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "@/app/_ui/Loader/Loader";
interface formatted_policy_type {
  id: number;
  name: string;
  title: string;
  category_time_unit: databese_leave_categories_track_time_unit_type;
  icon: JSX.Element;
  hours_scheduled: number;
  hours_available: number;
  type: database_leave_policies_policy_type;
}
export function PolyciesSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const params = useParams();
  const { employeeId } = params;
  const {
    leave_policies: { data: leave_policies, isPending: isPending1 },
    leave_categories: { data: leave_categories, isPending: isPending2 },
  } = useLeaveData();
  const {
    leave_requests: { data: leave_requests, isPending: isPending3 },
    leave_balance: { data: leave_balance, isPending: isPending4 },
  } = useEmployeeData({ employeeId: String(employeeId) });
  const isPending = isPending1 || isPending2 || isPending3 || isPending4;
  const user_policies_ids = leave_balance?.map(
    (e: database_profile_leave_balance_type) => e.policy_id,
  );
  const policies: formatted_policy_type[] | undefined = leave_policies
    ?.filter(
      (policy: database_leave_policies_type) =>
        user_policies_ids?.includes(policy.id) &&
        !leave_categories?.find(
          (categorie: databese_leave_categories_type) =>
            categorie.id === policy?.categories_id,
        )?.disabled,
    )
    ?.map((policy: database_leave_policies_type) => {
      const categorie: databese_leave_categories_type = leave_categories?.find(
        (categorie: databese_leave_categories_type) =>
          categorie.id === policy?.categories_id,
      );
      const hours_scheduled: number = leave_requests
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
        type: policy.type,
        title: categorie?.name,
        category_time_unit:
          categorie?.track_time_unit as databese_leave_categories_track_time_unit_type,
        icon: generateLeaveCategorieIcon({
          categorie: categorie,
          className: "h-9 w-9",
        }),
        hours_scheduled: hours_scheduled,
        hours_available:
          leave_balance?.find(
            (e: database_profile_leave_balance_type) =>
              e.policy_id == policy.id,
          )?.balance ?? 0,
      };
    });
  if (isPending) return <Loader />;
  return (
    <Suspense fallback={<Loader />}>
      <section className="relative mx-auto block w-full max-w-[57.5vw] px-12 ">
        {policies && policies?.length > 0 ? (
          <>
            <div className="btn_swiper_arrow_left absolute -left-5 top-[40%] cursor-pointer ">
              <FaArrowLeft
                className={`h-10 w-10 border border-gray-26 p-2 text-gray-25 ${activeIndex === 0 ? "hidden" : ""}`}
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
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                1400: {
                  slidesPerView: 3,
                },
              }}
              slides={policies?.map((policy, i: number) => (
                <Policy key={policy.name + i} {...policy} />
              ))}
            />
          </>
        ) : (
          <div className="flex w-full flex-col items-center justify-center text-sm">
            <Player
              src="https://lottie.host/a0bea92a-9e29-43fc-b1a4-403b36011fd7/ZRZhRyx6xp.json"
              className="h-40 w-40"
              loop
              autoplay
            />
            <span className="-mt-6 text-gray-34">
              This user has no active policies
            </span>
          </div>
        )}
      </section>
    </Suspense>
  );
}
