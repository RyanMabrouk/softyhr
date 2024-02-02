"use client";
import { DatePicker, DatePickerProps } from "antd";
import React, { memo, useState } from "react";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import { getYearDiff } from "@/helpers/date.helpers";
import { RowFieldType } from "@/types/database.tables.types";
import { CalendarGeneric } from "@/app/_ui/CalenderGeneric";

interface DateInputPropsType {
  RowField: RowFieldType;
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  defaultValue?: string | undefined;
}
function DateInput({ RowField, setTouched, defaultValue = "" }: DateInputPropsType) {
  const [value, setValue] = useState<string>(String(defaultValue));
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setTouched && setTouched(true);
    console.log(dateString > new Date().toISOString());
    if(dateString > new Date().toISOString() && RowField?.name != "End Date" && RowField?.name != "Expiration") setValue("");
    else setValue(dateString);
  };
  /*{return (
    <div className="flex items-end justify-center gap-[1rem]">
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-[14px] text-gray-29 ">{RowField?.name}</h1>
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
  );*/
  return (
    <CalendarGeneric
      name={RowField?.name}
      label={RowField?.name}
      setAction={() => setTouched && setTouched(true)}
      defaultValue={defaultValue != "" ? new Date(defaultValue): undefined}
    />
  );
}

export default memo(DateInput);
