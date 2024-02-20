import React, { ReactNode } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Label } from "./InputGeneric";
export type Option = {
  group_name?: string; // add only the group name to create a group
  label: string | ReactNode;
  value: string | number;
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
  options: Option[];
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
          className={` group peer h-9 w-[12.5rem] rounded-sm  border  border-gray-18  py-1 text-gray-23 shadow-sm transition-all ease-linear first-letter:capitalize placeholder:text-gray-14 hover:shadow-md [&_.Mui-selected]:!bg-fabric-700 [&_.MuiOutlinedInput-notchedOutline]:border-none ${className}`}
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
            ? options?.map((option: Option, i: number): JSX.Element => {
                return option?.group_name ? (
                  <>
                    <hr className="m-0 h-[unset] !w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
                    <MenuItem
                      key={option?.group_name}
                      className="group peer !max-h-7  !w-full !border-y !border-black !px-2 !py-1 !text-center !text-[0.8rem] !capitalize !text-gray-21 !opacity-100"
                      disabled
                      aria-readonly
                      value="none"
                    >
                      {option?.group_name}
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem
                    value={option?.value}
                    className={`peer !max-h-8 !px-2 !py-2 text-[0.95rem] capitalize text-gray-23 hover:!bg-fabric-700 hover:text-white ${
                      option?.disabled ? "opacity-50" : "opacity-90"
                    }`}
                    key={Number(option?.value) + i}
                    disabled={option?.disabled}
                  >
                    {option?.label}
                  </MenuItem>
                );
              })
            : options?.map((option, i) => {
                return (
                  <MenuItem
                    value={option?.value}
                    className="peer capitalize text-gray-23 hover:!bg-fabric-700 hover:text-white "
                    key={(name ?? inputLabel ?? label) + i}
                  >
                    {option?.label}
                  </MenuItem>
                );
              })}
          {inputLabel && (
            <MenuItem
              value="none"
              className="peer invisible !hidden font-sans capitalize text-gray-23"
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
