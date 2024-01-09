"use client";
import useData from "@/hooks/useData";
import { database_profile_type } from "@/types/database.tables.types";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Select } from "antd";
import { Option } from "../EditLeaveRequest";

export function CategoriesSelect({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: any;
  options: Option[];
}) {
  const {
    all_profiles: { data: all_profiles, isPending },
  } = useData();
  const user_id = useParams().employeeId;
  const leave_balance = all_profiles?.find(
    (profile: database_profile_type) => profile.user_id == user_id,
  )?.leave_balance;
  const [value, setValue] = useState(defaultValue?.value?.toString());
  return (
    <div className="flex w-full flex-col gap-1">
      <label className="relative w-fit text-sm text-gray-21">
        {label} <span className="absolute -right-2 top-0 text-sm">*</span>
      </label>
      <div className="focus-within:shadow-green flex w-fit flex-row rounded-md">
        <Select
          data-placeholder-trigger="keydown"
          defaultValue={defaultValue}
          onChange={(value) => {
            const policy_id = leave_balance?.find(
              (e: any) => e.categories_ids == value,
            )?.policy_id;
            setValue(policy_id);
          }}
          className={` group h-9 w-full min-w-[12.5rem] rounded-md  border border-gray-18  px-2 py-1 capitalize text-gray-21 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] placeholder:text-gray-14 focus:border-transparent  focus:outline-none focus:ring-2 focus:ring-color-primary-5 group-focus-within:text-color-primary-5 [&_.ant-select-selection]:bg-color-primary-focus [&_.ant-select-selector]:!border-transparent`}
          options={options}
          aria-required="true"
        />
        {/* Shitty code because you cant add a name tag to antd select componant i will fix later :) */}
      </div>
      <input
        type="text"
        name={name}
        value={value}
        required
        className="h-[1px] w-[1px] cursor-default opacity-0"
      />
    </div>
  );
}
