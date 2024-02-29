"use client";
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import getCurrentorg from "@/api/getCurrentOrg";
import ExtraTxt from "./components/ExtraTxt";
import { RowFieldType } from "@/types/database.tables.types";
interface SelectInputPropsType {
  RowField: RowFieldType;
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  defaultValue?: string | null;
  label?: string;
  minWidth?: string;
  setSelectedKeys?: React.Dispatch<React.SetStateAction<string | null>>;
  dropDownDisplay?: boolean | undefined;
  className?: string | undefined;
}



function SelectInput({
  RowField,
  setTouched,
  defaultValue = "",
  label,
  minWidth = undefined,
  setSelectedKeys,
  dropDownDisplay = true,
  className = "",
}: SelectInputPropsType) {
  const [value, setValue] = useState<string>(String(defaultValue) || "");

  const ClearSelectHandler = () => {
    setValue("");
    setSelectedKeys && setSelectedKeys("");
  };

  const HandleChange = (e: SelectChangeEvent<string>) => {
    setTouched && setTouched(true);
    setValue(e.target.value);
    setSelectedKeys && setSelectedKeys(e.target.value);
  };

  return (
    <div className="flex items-end justify-center gap-[1rem]">
      <div className={"relative flex  flex-col items-start justify-center"}>
        <label
          className={
            "text-[14px] text-gray-29 " +
            (RowField?.required
              ? " after:text-color-primary-8 after:content-['*']"
              : "")
          }
        >
          {RowField?.name}
        </label>
        <Select
          labelId={"select-label"}
          required={RowField?.required}
          id={"select"}
          MenuProps={{ PaperProps: { style: { maxHeight: "15rem" } } }}
          sx={{
            border: "1px solid #D9D9D9",
            ".MuiSvgIcon-root ": {
              fill: "#686868 !important",
              backgroundColor: "#F4F4F4",
              width: "1.5rem",
              height: "100%",
              position: "absolute",
              right: 0,
              top: 0,
              display: dropDownDisplay ? "block" : "none",
            },
            ".MuiInputBase-inputAdornedEnd ":{
              paddingRight:'55px'
            },
            height: "2rem",
            borderRadius: "0.2rem !important",
          }}
          name={RowField?.name}
          {...(value !== "" ? { defaultValue: value } : {})}
          endAdornment={
            dropDownDisplay && (
              <div
                onClick={ClearSelectHandler}
                className="absolute right-[2.15rem] top-[0.3rem] cursor-pointer"
              >
                <MdOutlineClose className="text-lg text-gray-15" />
              </div>
            )
          }
          renderValue={(selected) => {
            if (value == "") {
              console.log(value, "value");
              return (
                <h1 className="text-[0.95rem] font-normal !text-gray-13">
                  - Select -
                </h1>
              );
            }
            return selected;
          }}
          displayEmpty
          defaultValue={defaultValue || ""}
          inputProps={{ "aria-label": "Without label" }}
          onChange={HandleChange}
          className={` relative z-10 min-w-[9rem] text-[0.95rem] !font-normal !text-gray-13 ${minWidth ? `min-w-${minWidth}` : ""} [&_.MuiOutlinedInput-notchedOutline]:border-none ${className}`}
        >
          {RowField?.options?.map((element: any, index: number) => {
            return (
              <MenuItem
                value={
                  element?.value || element?.label || element?.name || element
                }
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
      {RowField?.ExtraTxt_org && <ExtraTxt RowField={RowField} />}
    </div>
  );
}

export default memo(SelectInput);
