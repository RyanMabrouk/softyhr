import React from "react";
import { Option } from "../EditLeaveRequest/EditLeaveRequest";
import { Select } from "antd";

export function AmountSelect({
  label,
  defaultValue,
  options,
  setValueInParent,
}: {
  label: string;
  name: string;
  defaultValue: any;
  options: Option[];
  setValueInParent: React.Dispatch<React.SetStateAction<"1" | "-1">>;
}) {
  return (
    <div className="flex w-fit flex-col gap-1">
      <label className="relative w-fit text-sm text-gray-21">
        {label} <span className="absolute -right-2 top-0 text-sm">*</span>
      </label>
      <div className="focus-within:shadow-green flex w-fit flex-row rounded-md">
        <Select
          data-placeholder-trigger="keydown"
          defaultValue={defaultValue}
          onChange={(value) => {
            setValueInParent(value);
          }}
          className={` group h-9 w-full min-w-[12.5rem] rounded-md  border border-gray-18  px-2 py-1 capitalize text-gray-21 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] placeholder:text-gray-14 focus:border-transparent  focus:outline-none focus:ring-2 focus:ring-color-primary-5 group-focus-within:text-color-primary-5 [&_.ant-select-selection]:bg-color-primary-focus [&_.ant-select-selector]:!border-transparent`}
          options={options}
          aria-required="true"
        />
      </div>
    </div>
  );
}
