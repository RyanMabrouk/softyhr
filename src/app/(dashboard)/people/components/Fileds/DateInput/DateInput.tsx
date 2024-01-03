"use client";
import { DatePicker, DatePickerProps } from "antd";
import React, { useState } from "react";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import { getYearDiff } from "@/app/(dashboard)/people/components/utils/getYearDff";

function DateInput({ RowField, setTouched, defaultValue }: any) {
  const [value, setValue] = useState<string>(String(defaultValue));
  console.log(value);
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setTouched(true);
    setValue(dateString);
  };
  return (
    <div className="flex items-end justify-center gap-[1rem]">
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-gray text-sm font-light ">{RowField?.name}</h1>
        <DatePicker
          style={{ width: "11.3rem", borderRadius: "0.2rem" }}
          defaultValue={dayjs(value || data, "YYYY-MM-DD")}
          onChange={onChange}
          name={RowField?.name}
        />
      </div>
      {RowField?.ExtraTxt && (
        <h1>{`${RowField?.ExtraTxt}: ${getYearDiff(
          new Date(value),
          new Date(),
        )}`}</h1>
      )}
    </div>
  );
}

export default DateInput;
