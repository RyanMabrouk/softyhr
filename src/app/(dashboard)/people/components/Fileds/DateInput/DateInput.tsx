"use client";
import { DatePicker, DatePickerProps } from "antd";
import React, { useState } from "react";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import { getYearDiff } from "@/helpers/date.helpers";
import { RowFieldType } from "@/types/database.tables.types";

interface DateInputPropsType {
  RowField:RowFieldType;
  setTouched?: (org: boolean) => void;
  defaultValue?: string | undefined;
}
function DateInput({ RowField, setTouched, defaultValue = "" }: DateInputPropsType) {
  const [value, setValue] = useState<string>(String(defaultValue));
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setTouched && setTouched(true);
    console.log(dateString > new Date().toISOString());
    if(dateString > new Date().toISOString() && RowField?.name != "End Date") setValue("");
    else setValue(dateString);
  };
  return (
    <div className="flex items-end justify-center gap-[1rem]">
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-gray text-sm font-light ">{RowField?.name}</h1>
        <DatePicker
          style={{ width: "11.3rem", borderRadius: "0.2rem" }}
          //defaultValue={""}
          onChange={onChange}
          //@ts-ignore
          value={value ? dayjs(value, "YYYY-MM-DD") : ""}
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
