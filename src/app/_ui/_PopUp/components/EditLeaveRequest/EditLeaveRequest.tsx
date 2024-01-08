"use client";
import useData from "@/hooks/useData";
import {
  database_leave_policies_type,
  database_leave_requests_type,
  database_profile_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import default_avatar from "/public/default_avatar.jpeg";
import { Hr } from "@/app/(dashboard)/people/[employeeId]/TimeOff/_ui/Hr";
import { formatDateToDayMonDD, formatYYYYMMDD } from "@/helpers/date";
import { Select } from "antd";
import deleteLeaveRequest from "@/actions/leave/deleteLeaveRequest";
import { SubmitBtn } from "@/app/(auth)/login/_ui/SubmitBtn";
import updateLeaveRequest from "@/actions/leave/updateLeaveRequest";
import {
  arrayOfWorkingDays,
  formatTotalHoursToTimeUnit,
} from "@/helpers/leave.helpers";
import DateRangeContextProvider, {
  dateRangeContext,
  dateRangeContextType,
} from "./context/dateRangeContext";
import { duration } from "@mui/material";
import { removeDuplicateObjectsFromArray } from "@/helpers/array.helpers";
type Option = {
  value: string;
  label: string;
};
type default_duration_type = {
  date: string;
  duration: string;
};
export default function EditLeaveRequest() {
  const Router = useRouter();
  const params = useParams();
  const {
    all_profiles: { data: all_profiles, isPending: isPending },
  } = useData();
  const user_profile = all_profiles?.find(
    (profile: database_profile_type) =>
      profile.user_id ==
      "69fc8647-c92d-4834-8238-efa5e82062f3" /*params.employeeId*/,
  );
  const full_name: string =
    user_profile?.["Basic Information"]?.["First name"] +
    " " +
    user_profile?.["Basic Information"]?.["Last name"];
  const job_title: string =
    (user_profile?.["Job Information"]?.sort(
      (a: any, b: any) =>
        new Date(b["Effective Date"]).getTime() -
        new Date(a["Effective Date"]).getTime(),
    ) ?? [])?.[0]?.["Job Title"] ?? "";

  return (
    <div className="z-50 flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <h1 className=" pb-2 text-2xl font-normal text-color-primary-4">
          Edit Time Off Request
        </h1>
        <div onClick={() => Router.back()}>
          <CgClose className="cursor-pointer text-3xl text-gray-15" />
        </div>
      </div>
      <div className="shadow-popup flex w-full min-w-[50rem] flex-col items-center bg-white px-8 py-6">
        <header className="flex w-full flex-row items-center gap-2 bg-gray-14 px-4 py-3">
          <Image
            src={default_avatar}
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
        <form
          className="flex w-full flex-col gap-4 px-2 pt-3"
          action={updateLeaveRequest}
        >
          <DateRangeContextProvider>
            <FormInputs />
          </DateRangeContextProvider>
          <hr className="h-[3px] w-full bg-primary-gradient" />
          <div className="flex flex-row gap-4 px-2 pt-3">
            <SubmitBtn className="!w-fit">Save</SubmitBtn>
            <button
              type="submit"
              className="h-11 w-fit cursor-pointer rounded-md bg-gray-14 px-3 font-semibold text-gray-25 transition-all duration-300 ease-linear hover:bg-gray-16"
              formAction={deleteLeaveRequest}
            >
              Cancel Request
            </button>
            <button
              className="cursor-pointer text-color5-500 hover:underline "
              type="button"
              onClick={() => Router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function FormInputs() {
  const searchParams = useSearchParams();
  const { setStartDate, setEndDate } =
    useContext<dateRangeContextType>(dateRangeContext);
  const {
    leave_categories: { data: leave_categories, isPending: isPending1 },
    leave_policies: { data: leave_policies, isPending: isPending2 },
    leave_requests: { data: leave_requests, isPending: isPending3 },
  } = useData();
  const isPending = isPending1 || isPending2 || isPending3;
  const request_data: database_leave_requests_type = leave_requests?.find(
    (request: database_leave_requests_type) =>
      request.id == Number(searchParams.get("leave_request_id")),
  );
  const policy: database_leave_policies_type = leave_policies?.find(
    (policy: database_leave_policies_type) =>
      policy.id === request_data?.policy_id,
  );
  const categorie: databese_leave_categories_type = leave_categories?.find(
    (categorie: databese_leave_categories_type) =>
      policy.categories_id === categorie.id,
  );
  return (
    <div className="flex flex-col gap-2 pb-3">
      <div className="flex flex-row items-center gap-2">
        <DateInput
          label="From"
          name="start_at"
          defaultValue={request_data?.start_at}
          setValueInParent={setStartDate}
        />
        <span className="-mb-4 text-3xl font-light leading-4"> - </span>
        <DateInput
          label="To"
          name="end_at"
          defaultValue={request_data?.end_at}
          setValueInParent={setEndDate}
        />
      </div>
      <CategoriesSelect
        label="Time Off Category"
        name="category"
        defaultValue={categorie}
        options={leave_categories?.map(
          (category: databese_leave_categories_type) => ({
            label:
              category.name.charAt(0).toUpperCase() + category.name.slice(1),
            value: category.id,
          }),
        )}
      />
      <Amount
        default_duration={request_data?.duration_used}
        default_satrt_at={request_data?.start_at}
        default_end_at={request_data?.end_at}
        track_time_unit={categorie?.track_time_unit}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="note" className="text-sm text-gray-21">
          Note
        </label>
        <textarea
          name="note"
          className="focus:shadow-green maw-w-[20rem] rounded-md border  border-gray-18 px-2 py-1 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] placeholder:text-gray-14 focus:outline-none "
          id="note"
          cols={10}
          rows={5}
          defaultValue={request_data?.note ?? ""}
          draggable
        />
      </div>
    </div>
  );
}
function DateInput({
  name,
  label,
  defaultValue,
  setValueInParent,
}: {
  name: string;
  label: string;
  defaultValue: string;
  setValueInParent?: React.Dispatch<React.SetStateAction<Date>>;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name + "_id"}
        className="relative w-fit text-sm text-gray-21"
      >
        {label}
        <span className="absolute -right-2 top-0 text-sm">*</span>
      </label>
      <input
        type="date"
        className="focus:shadow-green max-w-[10rem] rounded-md border  border-gray-18 px-2 py-1 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] placeholder:text-gray-14 focus:outline-none "
        name={name}
        id={name + "_id"}
        defaultValue={formatYYYYMMDD(new Date(defaultValue))}
        onChange={(e) =>
          setValueInParent && setValueInParent(new Date(e.target.value))
        }
        required
      />
    </div>
  );
}
function CategoriesSelect({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: databese_leave_categories_type;
  options: Option[];
}) {
  const [value, setValue] = useState(defaultValue?.id.toString());
  return (
    <div className="flex w-full flex-col gap-1">
      <label className="relative w-fit text-sm text-gray-21">
        {label} <span className="absolute -right-2 top-0 text-sm">*</span>
      </label>
      <div className="focus-within:shadow-green w-fit rounded-md">
        <Select
          data-placeholder-trigger="keydown"
          defaultValue={{
            label: defaultValue?.name,
            value: defaultValue?.id,
          }}
          onChange={(value) => setValue(value.toString())}
          className={` group h-9 w-full min-w-[12.5rem] rounded-md  border border-gray-18  px-2 py-1 capitalize text-gray-21 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] placeholder:text-gray-14 focus:border-transparent  focus:outline-none focus:ring-2 focus:ring-color-primary-5 group-focus-within:text-color-primary-5 [&_.ant-select-selection]:bg-color-primary-focus [&_.ant-select-selector]:!border-transparent`}
          options={options}
          aria-required="true"
        />
        <input type="text" name={name} value={value} hidden />
      </div>
    </div>
  );
}
function Amount({
  default_duration,
  track_time_unit,
  default_satrt_at,
  default_end_at,
}: {
  default_duration: default_duration_type[] | Json[];
  track_time_unit: "hours" | "days" | string;
  default_satrt_at: string;
  default_end_at: string;
}) {
  const { startDate, endDate } =
    useContext<dateRangeContextType>(dateRangeContext);
  const user_new_range =
    startDate || endDate
      ? arrayOfWorkingDays(
          startDate || new Date(default_satrt_at),
          endDate || new Date(default_end_at),
        )
      : [];
  const active_duration = removeDuplicateObjectsFromArray(
    [
      ...default_duration.map((d) => ({
        date: formatYYYYMMDD(new Date(d.date)),
        duration: d.duration,
      })),
      ...user_new_range,
    ],
    "date",
  );
  const total_duration = active_duration.reduce(
    (acc, duration) => acc + Number(duration.duration),
    0,
  );
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={"Amount" + "_id"}
        className="relative w-fit text-sm text-gray-21"
      >
        {"Amount"}
        <span className="absolute -right-2 top-0 text-sm">*</span>
      </label>
      <div className="flex w-fit flex-col items-center rounded-md border border-gray-18 text-gray-27">
        <div className="focus:shadow-green max-h-[12.5rem] w-fit min-w-[20rem] overflow-y-scroll  pt-2 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] placeholder:text-gray-14 focus:outline-none ">
          {active_duration.length > 0 &&
            active_duration
              ?.sort((a, b) => +new Date(a.date) - +new Date(b.date))
              .map((duration: default_duration_type, i) => (
                <div
                  key={duration.date + " " + i}
                  className="mr-auto flex flex-row items-center gap-8 px-4 pb-4 "
                >
                  <span>{formatDateToDayMonDD(new Date(duration.date))}</span>
                  <div className="flex flex-row items-center gap-2">
                    <input
                      type="text"
                      name={new Date(duration.date).toString()}
                      defaultValue={duration.duration}
                      className="focus:shadow-green flex h-8 w-12 items-center justify-center border border-gray-18 p-2 px-3 text-gray-27 focus:outline-none"
                      placeholder="0"
                    />
                    <span>Hours</span>
                  </div>
                </div>
              ))}
        </div>
        <div className="flex w-full flex-row items-center gap-1  bg-gray-14 px-4 py-3 text-lg font-normal">
          Total:{" "}
          <span className=" capitalize">
            {formatTotalHoursToTimeUnit(total_duration, track_time_unit)}
          </span>
        </div>
      </div>
    </div>
  );
}
