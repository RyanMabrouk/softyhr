import React, { ReactNode } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Label } from "./InputGeneric";
import { getTawindColor } from "../../helpers/getTailwindColor";
import { VscTriangleDown } from "react-icons/vsc";
const color = getTawindColor("color-primary-10");
export type Option = {
  group_name?: string; // add only the group name to create a group
  label: string | ReactNode;
  value: string | number;
};
export function SelectGeneric({
  className,
  label,
  error,
  name = "select",
  defaultValue,
  options,
  group, // if true, every option with a group_name will be a group_name label
  required,
  capitalize,
  setValueInParent,
  inputLabel,
  cursor = "black",
}: {
  className?: string;
  label?: string;
  name?: string;
  error?: boolean;
  defaultValue?: Option;
  options: Option[] | undefined | null;
  group?: boolean;
  required?: boolean;
  capitalize?: boolean;
  setValueInParent?: React.Dispatch<React.SetStateAction<any>> | undefined;
  inputLabel?: string | ReactNode;
  cursor?: "white" | "black" | string;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const cursor_type =
    cursor === "white"
      ? "text-white h-full min-w-3 mr-2"
      : "text-gray-21 rounded-br-sm !min-w-8 rounded-tr-sm bg-gray-14 px-2.5 h-full ";
  if (!options) return;
  return (
    <FormControl className="group flex w-fit flex-col gap-1">
      <Label name={name} required={required} error={error}>
        {label}
      </Label>
      <div className="relative flex flex-row items-center justify-center gap-1.5">
        <Select
          variant="outlined"
          data-placeholder-trigger="keydown"
          label={label}
          id={label}
          className={`group peer h-9 w-[12.5rem] border  border-gray-18  py-1  text-gray-23  transition-all ease-linear first-letter:capitalize  placeholder:text-gray-14  [&_.Mui-selected]:!bg-fabric-700 [&_.MuiOutlinedInput-notchedOutline]:border-none ${open ? "shadow-green rounded-b-none rounded-t-sm " : "rounded-sm shadow-sm hover:shadow-md"} ${className}`}
          name={name}
          open={open}
          defaultValue={defaultValue ? String(defaultValue.value) : "none"}
          displayEmpty
          required={required}
          onOpen={(e) => setOpen(true)}
          onClose={(e) => setOpen(false)}
          onChange={(e) => setValueInParent && setValueInParent(e.target.value)}
          IconComponent={() => (
            <VscTriangleDown
              className={`cursor-pointer transition-all ease-linear ${cursor_type} ${open ? "rotate-180" : ""} `}
              onClick={() => setOpen((old) => !old)}
            />
          )}
          MenuProps={{
            autoFocus: false,
            className: " shadow-green",
            PaperProps: {
              style: {
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                maxHeight: "20rem",
                overflowY: "auto",
                boxShadow: `0px 1px 4px 2px ${color}`,
              },
            },
          }}
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
                      className="group peer !max-h-7 !w-full  !border-y !border-black !px-2 !py-1 !text-center !text-[0.875rem] !text-gray-21 !opacity-100 first-letter:capitalize"
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
                    className={`peer !max-h-10 !px-2 !py-2 text-[0.95rem] capitalize text-gray-23 transition-all ease-linear hover:!bg-fabric-700 hover:text-white ${
                      option?.disabled ? "opacity-50" : "opacity-90"
                    } ${capitalize ? "capitalize" : ""}`}
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
                    className={`peer  text-gray-23 transition-all  ease-linear first-letter:capitalize hover:!bg-fabric-700 hover:text-white ${capitalize ? "capitalize" : ""} `}
                    key={(name ?? inputLabel ?? label) + i}
                  >
                    {option?.label}
                  </MenuItem>
                );
              })}
          {inputLabel && (
            <MenuItem
              value="none"
              className="peer invisible !hidden font-sans text-gray-23 first-letter:capitalize"
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
