"use client";
import { RowFieldType } from "@/types/userInfoTypes.type";
import React, { memo, useState } from "react";

interface InputPropsType {
  RowField: RowFieldType;
  setTouched: (arg: boolean) => void;
  defaultValue: string;
}

const Input = ({ RowField, setTouched, defaultValue }: InputPropsType) => {
  const [value, setValue] = useState<string>(String(defaultValue || ""));
  return (
    <div className="flex flex-col items-start justify-center">
      <h1
        className={
          "text-gray text-sm font-light" +
          (RowField?.required ? " after:text-red after:content-['*']" : "")
        }
      >
        {RowField?.name}
      </h1>
      <input
        className="h-[2rem] rounded-sm border border-gray-19 px-2 font-light outline-none  focus:shadow focus:shadow-color-primary"
        type={RowField?.type || "text"}
        value={value}
        name={RowField?.name}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setTouched(true)}
        placeholder={RowField?.placeHolder || ""}
      />
    </div>
  );
};

export default memo(Input);
