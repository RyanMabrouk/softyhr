"use client";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { RowFieldType } from "@/types/userInfoTypes.type";
import { Row } from "react-day-picker";
interface SelectInputPropsType {
  RowField: RowFieldType;
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  defaultValue?: string | null;
  label?: string;
  minWidth?: string;
  setSelectedKeys?:
    | React.Dispatch<React.SetStateAction<string | null>>
    | undefined;
}

function SelectInput({
  RowField,
  setTouched,
  defaultValue = "",
  label,
  minWidth,
  setSelectedKeys,
}: SelectInputPropsType) {
  const [value, setValue] = useState(String(defaultValue));
  const HandleChange = (e: SelectChangeEvent<string>) => {
    if (setTouched) setTouched(true);
    setValue(e.target.value);
    setSelectedKeys && setSelectedKeys(e.target.value);
  };
  return (
    <div className="relative flex flex-col items-start justify-center">
      <h1
        className={
          "text-[14px] text-gray-29 " +
          (RowField?.required ? " after:text-red after:content-['*']" : "")
        }
      >
        {RowField?.name}
      </h1>
      <Select
        labelId="demo-simple-select-required-label"
        id="demo-simple-select-required"
        sx={{
          border: "1px solid #D9D9D9",
          color: "black",
          ".MuiSvgIcon-root ": {
            fill: "#D9D9D9 !important",
          },
          height: "2rem",
          minWidth: minWidth || "9rem",
          borderRadius: "0.2rem !important",
        }}
        name={RowField?.name}
        defaultValue={value}
        renderValue={(selected) => {
          if (value === "undefined" || value == "") {
            return (
              <h1 className="text-[0.95rem] font-normal !text-gray-13">
                {label}
              </h1>
            );
          }
          return selected;
        }}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        onChange={HandleChange}
        className="relative z-10 text-[0.95rem] !font-normal !text-gray-13 [&_.MuiOutlinedInput-notchedOutline]:border-none"
      >
        {RowField?.options?.map((element: any, index: number) => {
          return (
            <MenuItem
              value={element?.label || element?.name || element}
              className="p-1 !text-gray-13"
              key={index}
            >
              <h1 className="text-[0.95rem] !font-normal !text-gray-13">
                {element?.label || element?.name || element}
              </h1>
            </MenuItem>
          );
        })}
      </Select>
      <input
        required={RowField?.required}
        type="text"
        className="absolute bottom-0 left-10 h-[1px] w-[1px] opacity-0"
        value={value}
        readOnly
        hidden
        autoFocus
      />
    </div>
  );
}

export default SelectInput;
