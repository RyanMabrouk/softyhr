"use client";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import default_avatar from "/public/default_avatar.jpeg";
import { Hr } from "@/app/(dashboard)/people/(employee)/[employeeId]/TimeOff/_ui/Hr";
import ErrorContextProvider from "./context/errorContext";
import { From } from "./components/From";
import useEmployeeData from "@/hooks/useEmloyeeData";
import PopUpSkeleton from "../../../PopUpSkeleton";

export type default_duration_type = {
  date: string;
  duration: string;
};
export default function EditLeaveRequest() {
  const { employeeId } = useParams();
  const searchParams = useSearchParams();
  const leave_request_id = Number(searchParams.get("leave_request_id"));
  const {
    employee_profile: { data: employee_profile },
  } = useEmployeeData({ employeeId: employeeId });
  // Current User Data
  const full_name: string =
    employee_profile?.["Basic Information"]?.["First name"] +
    " " +
    employee_profile?.["Basic Information"]?.["Last name"];
  const job_title: string =
    (employee_profile?.["Job Information"]?.sort(
      (a: any, b: any) =>
        new Date(b["Effective Date"]).getTime() -
        new Date(a["Effective Date"]).getTime(),
    ) ?? [])?.[0]?.["Job Title"] ?? "";

  return (
    <>
      <PopUpSkeleton
        className="flex w-[50rem] flex-col items-center px-8 py-6"
        title={leave_request_id ? "Edit Time Off Request" : "Record Time Off"}
      >
        <header className="flex w-full flex-row items-center gap-2 bg-gray-14 px-4 py-3">
          <Image
            src={employee_profile?.avatar || default_avatar}
            className="h-12 w-12 rounded-full"
            alt=""
            width={80}
            height={80}
          />
          <div className="flex flex-col">
            <div className="m-0 block text-[1.2rem] font-normal capitalize leading-[1.733rem] text-black">
              {full_name}
            </div>
            <div className="text-sm leading-6 text-gray-21">{job_title}</div>
          </div>
        </header>
        <Hr />
        <ErrorContextProvider>
          <From />
        </ErrorContextProvider>
      </PopUpSkeleton>
    </>
  );
}
