"use client";
import useData from "@/hooks/useData";
import { database_profile_type } from "@/types/database.tables.types";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { CgClose } from "react-icons/cg";
import default_avatar from "/public/default_avatar.jpeg";
import { Hr } from "@/app/(dashboard)/people/[employeeId]/TimeOff/_ui/Hr";
import ErrorContextProvider from "./context/errorContext";
import { From } from "./components/From";

export type Option = {
  value: string;
  label: string;
};
export type default_duration_type = {
  date: string;
  duration: string;
};
export default function EditLeaveRequest() {
  const Router = useRouter();
  const { employeeId } = useParams();
  const searchParams = useSearchParams();
  const leave_request_id = Number(searchParams.get("leave_request_id"));
  const {
    all_profiles: { data: all_profiles },
  } = useData();
  // User Profile Data
  const current_user_profile = all_profiles?.find(
    (profile: database_profile_type) => profile.user_id == employeeId,
  );
  // Current User Data
  const full_name: string =
    current_user_profile?.["Basic Information"]?.["First name"] +
    " " +
    current_user_profile?.["Basic Information"]?.["Last name"];
  const job_title: string =
    (current_user_profile?.["Job Information"]?.sort(
      (a: any, b: any) =>
        new Date(b["Effective Date"]).getTime() -
        new Date(a["Effective Date"]).getTime(),
    ) ?? [])?.[0]?.["Job Title"] ?? "";

  return (
    <>
      <div className="z-50 flex flex-col gap-2 overflow-hidden">
        <div className="flex flex-row justify-between">
          <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
            {leave_request_id ? "Edit Time Off Request" : "Record Time Off"}
          </h1>
          <div onClick={() => Router.back()}>
            <CgClose className="cursor-pointer text-3xl text-gray-15" />
          </div>
        </div>
        <div className="shadow-popup flex w-[50rem] flex-col items-center rounded-sm bg-white px-8 py-6">
          <header className="flex w-full flex-row items-center gap-2 bg-gray-14 px-4 py-3">
            <Image
              src={current_user_profile?.avatar || default_avatar}
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
        </div>
      </div>
    </>
  );
}
