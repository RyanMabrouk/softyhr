import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Option } from "./_PopUp/components/EditLeaveRequest/EditLeaveRequest";
export function SelectGeneric({
  label,
  name,
  defaultValue,
  options,
  required,
  setValueInParent,
  inputLabel,
}: {
  label?: string;
  name?: string;
  defaultValue?: Option;
  options: Option[];
  required?: boolean;
  setValueInParent?: React.Dispatch<React.SetStateAction<any>> | undefined;
  inputLabel?: string;
}) {
  return (
    <FormControl className=" flex w-fit flex-col gap-1">
      {label && (
        <label htmlFor={label} className="relative w-fit text-sm text-gray-21">
          {label}{" "}
          {required && (
            <span className="absolute -right-2 top-0 text-sm">*</span>
          )}
        </label>
      )}
      <Select
        variant="outlined"
        data-placeholder-trigger="keydown"
        label={label}
        id={label}
        className={`peer-focus-within:hadow-green focus:shadow-green focus-within:shadow-green group peer h-9 w-[12.5rem]  rounded-md  border border-gray-18 py-1 capitalize text-gray-27 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] placeholder:text-gray-14 [&_.MuiOutlinedInput-notchedOutline]:border-none`}
        name={name ?? "select"}
        defaultValue={defaultValue ? defaultValue.value : "none"}
        displayEmpty
        required={required}
        onChange={(e) =>
          setValueInParent ? setValueInParent(e.target.value) : null
        }
      >
        <MenuItem
          value="none"
          className="peer font-sans capitalize text-gray-27"
          disabled
          hidden={true}
        >
          {inputLabel}
        </MenuItem>
        {options?.map((e: any, i: number) => {
          return (
            <MenuItem
              value={e?.value}
              className="peer capitalize  text-gray-27 "
              key={i}
            >
              {e?.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
