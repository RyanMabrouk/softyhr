"use client";
import React, { useState } from "react";
import CustomSwiper from "@/app/_ui/swiper";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Policy } from "./Policy";
import useData from "@/hooks/useData";
import {
  database_leave_policies_type,
  database_leave_requests_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { generateLeaveCategorieIcon } from "@/helpers/leave.helpers";
interface formatted_policy_type {
  name: string;
  title: string;
  icon: JSX.Element;
  hours_scheduled: number;
  hours_available: number;
}
export function PolyciesSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    leave_policies: { data: leave_policies, isPending: isPending1 },
    leave_categories: { data: leave_categories, isPending: isPending2 },
    leave_requests: { data: leave_requests, isPending: isPending3 },
    user_profile: { data: user_profile, isPending: isPending4 },
  } = useData();
  const isPending = isPending1 || isPending2 || isPending3 || isPending4;
  const user_policies_ids = user_profile?.leave_balance?.map(
    (e: any) => Number(e.policy_id),
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
            leave.policy_id === policy.id,
        )
        .reduce(
          (acc: [], leave: database_leave_requests_type) => [
            ...acc,
            ...leave.duration_used,
          ],
          [],
        )
        .reduce((acc: number, e: any) => acc + Number(e.duration), 0);
      return {
        name: policy.name,
        title: categorie?.name,
        icon: generateLeaveCategorieIcon({
          categorie: categorie,
          className: "h-9 w-9",
        }),
        hours_scheduled: hours_scheduled,
        hours_available:
          user_profile?.leave_balance?.find(
            (e: any) => e.policy_id == policy.id,
          )?.balance || 0,
      };
    });
  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <section className="relative mx-auto block w-full max-w-[57.5vw] px-12 ">
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
    </section>
  );
}
