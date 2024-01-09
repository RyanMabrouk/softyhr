import React from "react";
import { formatYYYYMMDD } from "@/helpers/date";
export function DateInput({
  name,
  label,
  defaultValue,
  setValueInParent,
}: {
  name: string;
  label: string;
  defaultValue: string | "";
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
        defaultValue={
          defaultValue ? formatYYYYMMDD(new Date(defaultValue)) : ""
        }
        onChange={(e) => {
          setValueInParent && setValueInParent(new Date(e.target.value));
        }}
        required
      />
    </div>
  );
}
