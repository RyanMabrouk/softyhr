"use client";
import CustomSwiper from "@/app/_ui/swiper";
import { generateLeaveCategorieIcon } from "@/helpers/leave.helpers";
import useData from "@/hooks/useData";
import useEmployeeData from "@/hooks/useEmloyeeData";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";
import {
  database_leave_policies_policy_type,
  database_leave_policies_type,
  database_leave_request_duration_used_type,
  database_leave_requests_type,
  database_profile_leave_balance_type,
  databese_leave_categories_track_time_unit_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaCalculator } from "react-icons/fa6";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { PolicyInfo } from "./PolicyInfo";
import { Player } from "@lottiefiles/react-lottie-player";
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
export function TimeOff() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();
  const {
    leave_policies: { data: leave_policies, isPending: isPending1 },
    leave_categories: { data: leave_categories, isPending: isPending2 },
  } = useLeaveData();
  const {
    user_profile: { data: user_profile, isPending: isPending3 },
  } = useData();
  const {
    leave_requests: { data: leave_requests, isPending: isPending4 },
    leave_balance: { data: leave_balance, isPending: isPending5 },
  } = useEmployeeData({ employeeId: user_profile?.user_id });
  const isPending =
    isPending1 || isPending2 || isPending3 || isPending4 || isPending5;
  const user_policies_ids = leave_balance?.map(
    (e: database_profile_leave_balance_type) => e.policy_id,
  );
  const policies: formatted_policy_type[] = leave_policies
    ?.filter(
      (policy: database_leave_policies_type) =>
        user_policies_ids?.includes(policy.id) &&
        !leave_categories?.find(
          (categorie: databese_leave_categories_type) =>
            categorie.id === policy?.categories_id,
        )?.disabled,
    )
    .map((policy: database_leave_policies_type) => {
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
        type: policy.type,
        title: categorie?.name,
        category_time_unit: categorie?.track_time_unit,
        icon: generateLeaveCategorieIcon({
          categorie: categorie,
          className: "h-8 w-8",
        }),
        hours_scheduled: hours_scheduled,
        hours_available:
          leave_balance?.find(
            (e: database_profile_leave_balance_type) =>
              e.policy_id == policy.id,
          )?.balance ?? 0,
      };
    });
  return (
    <section className="flex h-[16rem] w-full max-w-[27.5rem] flex-col justify-between rounded-md border border-white bg-white p-1 pb-6 font-semibold shadow-md">
      <header className="flex flex-row items-center justify-between rounded-md bg-gray-14 px-6 py-2 text-fabric-700">
        <div className="flex flex-row items-center gap-1.5">
          <BsFillStopwatchFill className="h-5 w-5 text-fabric-700" />
          <span className="text-lg">Time Off</span>
        </div>
        <Link
          href={`/people/${user_profile?.user_id}/TimeOff`}
          className="cursor-pointer text-[0.8rem] hover:underline"
        >
          View history
        </Link>
      </header>
      <div>
        <section className="relative mx-auto block w-full px-8 ">
          {policies?.length > 0 ? (
            <>
              <div
                hidden={activeIndex === 0}
                className="btn_swiper_arrow_left absolute left-0 top-[40%] cursor-pointer rounded-md border border-gray-17 bg-gray-17 py-1 "
              >
                <IoMdArrowDropleft className="h-8 w-7 text-gray-25" />
              </div>
              <div
                className="btn_swiper_arrow_right absolute right-0 top-[40%] cursor-pointer rounded-md border border-gray-17 bg-gray-17 py-1"
                hidden={activeIndex === policies?.length - 2}
              >
                <IoMdArrowDropright className="h-8 w-7  text-gray-25" />
              </div>
              <CustomSwiper
                setActiveIndex={setActiveIndex}
                navigation={{
                  prevEl: ".btn_swiper_arrow_left",
                  nextEl: ".btn_swiper_arrow_right",
                }}
                slidesPerView={2}
                spaceBetween={10}
                slides={policies?.map((policy, i: number) => (
                  <PolicyInfo key={policy.name + i} {...policy} />
                ))}
              />
            </>
          ) : (
            <Player
              src="https://lottie.host/a0bea92a-9e29-43fc-b1a4-403b36011fd7/ZRZhRyx6xp.json"
              className="h-40 w-40"
              loop
              autoplay
            />
          )}
        </section>
      </div>
      <div className="flex w-full flex-row gap-4 px-4">
        <Link
          href={{
            pathname: pathname,
            query: { popup: "EDIT_LEAVE_REQUEST" },
          }}
          className=" flex w-full flex-row items-center justify-center gap-1 rounded-sm bg-fabric-700 px-4 py-1.5 text-lg font-semibold text-white shadow-sm outline-none transition-all ease-linear hover:bg-fabric-600 hover:shadow-md focus:outline-none "
        >
          <BsFillStopwatchFill className="h-5 w-5" />
          <span>Request Time Off</span>
        </Link>
        <Link
          className="tooltip"
          href={{
            pathname: pathname,
            query: {
              popup: "CALCULATE_LEAVE_BALANCE",
              policy_id: policies?.[activeIndex]?.id,
            },
          }}
          data-tip="Calculate Balance"
        >
          <FaCalculator className="flex h-10 w-10 cursor-pointer items-center  justify-center rounded-sm border border-gray-25 bg-white px-2.5 text-center text-gray-25 shadow-sm transition-all ease-linear hover:shadow-md" />
        </Link>
      </div>
    </section>
  );
}
