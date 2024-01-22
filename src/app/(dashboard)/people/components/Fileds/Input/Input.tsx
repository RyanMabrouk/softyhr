"use client";
import { InputIcons } from "@/constants/userInfo";
import { RowFieldType } from "@/types/userInfoTypes.type";
import React, { memo, useState } from "react";
import { FaLinkedin } from "react-icons/fa";

interface InputPropsType {
  RowField: RowFieldType;
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  defaultValue?: string;
}
const Input = ({ RowField, setTouched, defaultValue }: InputPropsType) => {
  const [value, setValue] = useState<string>(String(defaultValue || ""));
  const Component = InputIcons[RowField?.Icon?.toUpperCase() || ""];
  return (
    <div className="flex flex-col items-start justify-center">
      <h1
        className={
          "text-[14px] text-gray-29 " +
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
            "focus:focus-within:shadow-green h-[2rem] rounded-sm border border-gray-19 px-2 text-[0.95rem] font-normal outline-none  " +
            (RowField?.Icon ? "pl-8 " : "")
          }
          type={"text"}
          value={value}
          name={RowField?.name}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {
            if (setTouched) setTouched(true);
          }}
          placeholder={RowField?.placeHolder || ""}
          {...(RowField?.required && {required : true})}
        />
      </div>
    </div>
  );
};

export default memo(Input);
