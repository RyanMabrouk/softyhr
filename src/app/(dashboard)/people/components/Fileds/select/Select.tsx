"use client";
import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { RowFieldType } from "@/types/userInfoTypes.type";
interface SelectInputPropsType {
  RowField: RowFieldType;
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  defaultValue?: string;
}

function SelectInput({
  RowField,
  setTouched,
  defaultValue,
}: SelectInputPropsType) {
  const [value, setValue] = useState(String(defaultValue));
  const HandleChange = (e: any) => {
    if (setTouched) setTouched(true);
    setValue(e.target.value);
  };
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
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        sx={{
          border: "1px solid #D9D9D9",
          color: "black",
          ".MuiSvgIcon-root ": {
            fill: "#D9D9D9 !important",
          },
          height: "2rem",
          minWidth: "9rem",
          borderRadius: "0.1rem !important",
          fontWeight: "300",
          fontSize: "1rem",
        }}
        name={RowField?.name}
        defaultValue={value}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        onChange={HandleChange}
        className="!font-medium !text-gray-29 [&_.MuiOutlinedInput-notchedOutline]:border-none"
      >
        {RowField?.options?.map((element: any, index: number) => {
          return (
            <MenuItem
              value={element?.label || element?.name || element}
              className="p-1"
              key={index}
              sx={{ color: "300", fontSize: "14px" }}
            >
              {element?.label || element?.name || element}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}

export default SelectInput;
