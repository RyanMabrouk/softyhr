"use client";
import { DatePicker, DatePickerProps } from "antd";
import React from "react";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import { getYearDiff } from "@/app/employees/utils/getYearDff";

function DateInput({ RowField, setTouched }: any) {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setTouched(true);
  };

  return (
    <div className="flex items-end justify-center gap-[1rem]">
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-gray text-sm font-light ">{RowField?.name}</h1>
        <DatePicker
          style={{ width: "11.3rem" }}
          defaultValue={dayjs("2023-11-15", "YYYY-MM-DD")}
          onChange={onChange}
        />
      </div>
      {RowField?.ExtraTxt && (
        <h1>{`${RowField?.ExtraTxt}: ${getYearDiff(
          new Date("2003-11-15"),
          new Date(),
        )}`}</h1>
      )}
    </div>
  );
}

export default DateInput;
