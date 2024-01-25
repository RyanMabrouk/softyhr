import React, { ReactNode, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import useProfiles from "@/hooks/useProfiles";
import Image from "next/image";
import avatar from "@/app/(dashboard)/people/[employeeId]/avatar.png";

function SelectGeneric({
  label,
  defaultValue,
  options,
  required,
}: {
  label?: string;
  name?: string;
  defaultValue?: {
    value: string;
    label: string;
  };
  options: {
    value: string;
    label: string;
  }[];
  required?: boolean;
  inputLabel?: string | ReactNode;
}) {
  const [value, setValue] = useState();
  const HandleChange = (e: any) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <div className="relative flex flex-col items-start justify-center">
        {label && (
          <label
            className={
              "relative w-fit text-sm text-gray-21 " +
              (required ? " after:text-red-500 after:content-['*']" : "")
            }
          >
            {label}
          </label>
        )}
        <Select
          label={label}
          id={label}
          sx={{
            border: "1px solid #D9D9D9",
            color: "black",
            ".MuiSvgIcon-root ": {
              fill: "#D9D9D9 !important",
            },
            height: "2rem",
            minWidth: "12rem",
            borderRadius: "0.1rem !important",
            fontWeight: "300",
            fontSize: "1rem",
          }}
          className={`relative z-10 !font-medium !text-gray-29 [&_.MuiOutlinedInput-notchedOutline]:border-none`}
          name={label}
          inputProps={{ "aria-label": "Without label" }}
          defaultValue={defaultValue ? defaultValue.value : "none"}
          displayEmpty
          onChange={HandleChange}
        >
          <div className="scrollBar-green max-h-[20rem] overflow-auto">
            {options?.map((option: any, index: number) => {
              return (
                <MenuItem
                  value={option?.value}
                  className="p-1 px-4"
                  sx={{ color: "300", fontSize: "14px" }}
                  key={option?.label + index}
                >
                  <div className="flex items-center justify-center gap-[1rem]">
                    <Image
                      height={100}
                      width={100}
                      className="h-[2rem] w-[2rem] rounded-full object-cover"
                      alt=""
                      src={option?.picture || avatar}
                    />
                    <h1 className="text-gray-29">{option?.label}</h1>
                  </div>
                </MenuItem>
              );
            })}
          </div>
        </Select>
        <input
          required={required}
          type="text"
          className="absolute bottom-0 left-10 h-[1px] w-[1px] opacity-0"
          value={value || ""}
        />
      </div>
    </>
  );
}

function SelectUsers({ RowField }: any) {
  const {
    profiles: { data, isPending },
  } = useProfiles();
  return (
    <SelectGeneric
      label={RowField?.name}
      options={data?.map((user: any) => {
        return {
          picture: user?.picture,
          label: `${user?.["Basic Information"]?.["First name"]}     ${user?.["Basic Information"]?.["Last name"]} `,
          value: user?.user_id,
        };
      })}
    />
  );
}

export default SelectUsers;
/*
    <SelectGeneric
      inputLabel={RowField?.name}
      setValueInParent={setValue}
      options={data?.map((user: any) => {
        return {
          icon: user?.picture,
          label: `${user?.["Basic Information"]?.["First name"]}     ${user?.["Basic Information"]?.["Last name"]} `,
          value: user?.user_id,
        };
      })}
    />*/
