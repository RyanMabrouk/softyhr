"use client";
import { InputIcons } from "@/constants/userInfo";
import { RowFieldType } from "@/types/userInfoTypes.type";
import React, { memo, useState } from "react";

interface InputPropsType {
  RowField: RowFieldType;
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  defaultValue?: string;
  className?: string;
  setSelectedKeys?: React.Dispatch<React.SetStateAction<string>> | undefined;
}
const Input = ({
  RowField,
  setTouched,
  defaultValue,
  className,
  setSelectedKeys,
}: InputPropsType) => {
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
          <span className="absolute ml-[1.2px]  h-[1.85rem] w-[1.8rem] bg-gray-14">
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
            `focus:focus-within:shadow-green peer h-[2rem] overflow-hidden rounded-sm border border-gray-19 bg-white px-2 text-[0.95rem] font-normal outline-none  ${className} ` +
            (RowField?.Icon ? "pl-8 " : "")
          }
          type={RowField?.type}
          value={value}
          id={RowField?.name}
          name={RowField?.name}
          onChange={(e) => {
            setValue(e.target.value);
            setSelectedKeys && setSelectedKeys(e.target.value);
          }}
          onFocus={() => {
            if (setTouched) setTouched(true);
          }}
          placeholder={RowField?.placeHolder || ""}
          required={RowField?.required}
        />
      </div>
    </div>
  );
};

export default memo(Input);
