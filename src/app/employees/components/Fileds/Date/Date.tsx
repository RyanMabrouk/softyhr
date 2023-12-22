"use client";
import { DatePicker, DatePickerProps } from "antd";
import React from "react";
import "dayjs/locale/zh-cn";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";

function Date({ RowField }: any) {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="flex flex-col items-start justify-center">
      <h1 className="text-gray text-sm font-light ">{RowField?.name}</h1>
      <DatePicker
        style={{ width: "11.3rem" }}
        defaultValue={dayjs("2023-11-15", "YYYY-MM-DD")}
        onChange={onChange}
      />
    </div>
  );
}

export default Date;
