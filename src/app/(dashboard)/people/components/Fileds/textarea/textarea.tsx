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
const Textarea = ({ RowField, setTouched, defaultValue }: InputPropsType) => {
  const [value, setValue] = useState<string>(String(defaultValue || ""));
  const Component = InputIcons[RowField?.Icon?.toUpperCase() || ""];
  return (
    <div className="flex w-full flex-col items-start justify-center">
      <h1
        className={
          "text-[14px] text-gray-29 " +
          (RowField?.required ? " after:text-red after:content-['*']" : "")
        }
      >
        {RowField?.name}
      </h1>
      <div className="group flex w-full items-center justify-start">
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
        <textarea
          className={
            "focus:focus-within:shadow-green h-[5rem] w-full rounded-sm border border-gray-19 px-2 font-normal !text-gray-13 outline-none  focus:!border-color-primary-3 " +
            (RowField?.Icon ? "pl-8 " : "")
          }
          value={value}
          name={RowField?.name}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {
            if (setTouched) setTouched(true);
          }}
          placeholder={RowField?.placeHolder || ""}
          required={RowField?.required || false}
        />
      </div>
    </div>
  );
};

export default memo(Textarea);
