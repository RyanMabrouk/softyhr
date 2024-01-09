"use client";
import { InputIcons } from "@/constants/userInfo";
import { RowFieldType } from "@/types/userInfoTypes.type";
import React, { memo, useState } from "react";
import { FaLinkedin } from "react-icons/fa";

interface InputPropsType {
  RowField: RowFieldType;
  setTouched: (arg: boolean) => void;
  defaultValue: string;
}
const Input = ({ RowField, setTouched, defaultValue }: InputPropsType) => {
  const [value, setValue] = useState<string>(String(defaultValue || ""));
  const Component = InputIcons[RowField?.Icon?.toUpperCase() || ""];
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
      <div className="group flex items-center justify-start">
        {RowField?.Icon && (
          <span className="absolute ml-[1px]  h-[1.9rem] w-[1.8rem] bg-gray-14">
            <Component
              fill="gray"
              style={{
                fontSize: "1rem",
                position: "absolute",
                left: "0.4rem",
                top: "25%",
              }}
            />
          </span>
        )}
        <input
          className={
            "focus:focus-within:shadow-green h-[2rem] rounded-sm border border-gray-19 px-2 font-light outline-none  focus:!border-color-primary-3 " +
            (RowField?.Icon ? "pl-8 " : "")
          }
          type={RowField?.type || "text"}
          value={value}
          name={RowField?.name}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setTouched(true)}
          placeholder={RowField?.placeHolder || ""}
        />
      </div>
    </div>
  );
};

export default memo(Input);
