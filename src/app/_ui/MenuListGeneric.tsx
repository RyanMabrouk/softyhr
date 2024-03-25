import {
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { ReactNode } from "react";
import { IconType } from "react-icons/lib";

interface Option {
  label: string | ReactNode;
  action: any;
  disabled?: boolean;
  Icon?: IconType;
}

function MenuListGeneric({
  className,
  label,
  name = "select",
  options,
  required,
  cursor = "black",
}: {
  className?: string;
  label?: string;
  name?: string;
  options: Option[];
  required?: boolean;
  cursor?: "white" | "black" | string;
}) {
  return (
    <FormControl className="group flex w-fit flex-col gap-1">
      <div className="relative flex w-fit flex-row items-center justify-center gap-1.5">
        <Select
          variant="outlined"
          data-placeholder-trigger="keydown"
          id={label}
          className={` group flex items-center justify-center peer h-9 w-[12.5rem] rounded-sm  border  border-gray-18  py-1 text-gray-23 shadow-sm transition-all ease-linear first-letter:capitalize placeholder:text-gray-14 hover:shadow-md [&_.Mui-selected]:!bg-fabric-700 [&_.MuiOutlinedInput-notchedOutline]:border-none ${className}`}
          displayEmpty
          required={required}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: cursor,
            },
            "& .MuiSvgIcon-root": {
              color: cursor,
            },
          }}
          renderValue={(props)=>{console.log(props);
            return"test"}}
        >
          {options?.map(
            ({ label, Icon, action }: Option, index: number): JSX.Element => {
              return (
                <MenuItem
                  key={index}
                  onClick={action}
                  className="group flex !w-full cursor-pointer items-center justify-center !border-y !border-black !text-center !text-[0.8rem] !capitalize !text-gray-21 !opacity-100"
                  value={String(index)}
                >
                  <ListItemIcon className="h-[2rem] w-[2rem]">
                    {Icon && <Icon className="!text-lg !text-gray-15" />}
                  </ListItemIcon>
                  <ListItemText> {label}</ListItemText>
                </MenuItem>
              );
            },
          )}
        </Select>
      </div>
    </FormControl>
  );
}

export default MenuListGeneric;
