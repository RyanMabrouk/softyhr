import React, { ReactNode } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
export type Option = {
  value: string | number;
  label: string | ReactNode;
};
type GroupOptions = {
  group_name?: string; // add only the group name to create a group
  label?: string;
  value?: any;
  disabled?: boolean;
};
export function SelectGeneric({
  className,
  label,
  name = "select",
  defaultValue,
  options,
  group, // if true, options should be an array of objects with the following structure: {group_name: string, options: Option[]}
  required,
  setValueInParent,
  inputLabel,
  cursor = "black",
}: {
  className?: string;
  label?: string;
  name?: string;
  defaultValue?: Option;
  options: Option[] | GroupOptions[];
  group?: boolean;
  required?: boolean;
  setValueInParent?: React.Dispatch<React.SetStateAction<any>> | undefined;
  inputLabel?: string | ReactNode;
  cursor?: "white" | "black" | string;
}) {
  if (!options) return;
  return (
    <FormControl className="group flex w-fit flex-col gap-1">
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
        className={` group peer h-9 w-[12.5rem] rounded-md  border  border-gray-18 py-1 capitalize text-gray-27 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] transition-all ease-linear placeholder:text-gray-14 hover:shadow-md [&_.MuiOutlinedInput-notchedOutline]:border-none ${className}`}
        name={name}
        defaultValue={defaultValue ? defaultValue.value : "none"}
        displayEmpty
        required={required}
        onChange={(e) =>
          setValueInParent ? setValueInParent(e.target.value) : null
        }
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: cursor,
          },
          "& .MuiSvgIcon-root": {
            color: cursor,
          },
        }}
      >
        {group
          ? options?.map((option: any, i: number) => {
              return option?.group_name ? (
                <MenuItem
                  key={option?.group_name}
                  className="peer capitalize text-gray-27 opacity-50"
                  disabled
                  value="none"
                >
                  {option?.group_name}
                </MenuItem>
              ) : (
                <MenuItem
                  value={option?.value}
                  className={`peer capitalize text-gray-27 hover:!bg-fabric-700 hover:text-white ${
                    option?.disabled ? "opacity-50" : ""
                  }`}
                  key={option?.label + i}
                  disabled={option?.disabled}
                >
                  {option?.label}
                </MenuItem>
              );
            })
          : options?.map((option: any, i: number) => {
              return (
                <MenuItem
                  value={option?.value}
                  className="peer capitalize text-gray-27 hover:!bg-fabric-700 hover:text-white"
                  key={(name ?? inputLabel ?? label) + i}
                >
                  {option?.label}
                </MenuItem>
              );
            })}
        {inputLabel && (
          <MenuItem
            value="none"
            className="peer invisible !hidden font-sans capitalize text-gray-27"
            disabled
            //hidden={true}
          >
            {inputLabel}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
