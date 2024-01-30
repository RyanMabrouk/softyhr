import React, { ReactNode } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Label } from "./InputGeneric";
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
  error,
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
  error?: boolean;
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
      <Label name={name} required={required} error={error}>
        {label}
      </Label>
      <div className="relative flex w-fit flex-row items-center justify-center gap-1.5">
        <Select
          variant="outlined"
          data-placeholder-trigger="keydown"
          label={label}
          id={label}
          className={` group peer h-9 w-[12.5rem]  rounded-md  border  border-gray-18 py-1 capitalize text-gray-27 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] transition-all ease-linear placeholder:text-gray-14 hover:shadow-md [&_.MuiOutlinedInput-notchedOutline]:border-none ${className}`}
          name={name}
          defaultValue={defaultValue ? defaultValue.value : "none"}
          displayEmpty
          required={required}
          onChange={(e) => setValueInParent && setValueInParent(e.target.value)}
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
                  <>
                    <hr className="m-0 h-[unset] !w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
                    <MenuItem
                      key={option?.group_name}
                      className="group peer !max-h-7  w-full border-y border-black !px-2 !py-1 text-center text-[0.8rem] capitalize text-gray-21 !opacity-100"
                      disabled
                      aria-readonly
                      value="none"
                    >
                      <span className="text-pretty">{option?.group_name}</span>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem
                    value={option?.value}
                    className={`peer !max-h-8 !px-2 !py-2 text-[0.95rem] capitalize text-gray-27 hover:!bg-fabric-700 hover:text-white ${
                      option?.disabled ? "opacity-50" : "opacity-90"
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
        {error && (
          <span className="absolute -bottom-[1.375rem] left-0 w-max text-sm text-color9-500">
            {error}
          </span>
        )}
      </div>
    </FormControl>
  );
}
