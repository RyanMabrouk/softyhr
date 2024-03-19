import React, { ReactNode, SyntheticEvent, useState } from "react";
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import useProfiles from "@/hooks/useProfiles";
import Image from "next/image";
import avatar from "/public/avatar.png";
import { Profile_Type, RowFieldType } from "@/types/database.tables.types";

interface SelectValueType {
  label: string;
  value: string;
}
function SelectGeneric({
  label,
  defaultValue,
  isPending,
  options,
  required,
}: {
  label?: string;
  name?: string;
  isPending: boolean;
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
  const [value, setValue] = useState<SelectValueType | null>(
    defaultValue || { value: "", label: "" },
  );
  const [ValueInput, setValueInput] = useState<string | null>();
  return (
    <>
      <div className="relative flex flex-col items-start justify-center">
        {label && (
          <label
            className={
              "relative w-fit text-sm text-gray-21 " +
              (required
                ? " after:text-color-primary-8 after:content-['*']"
                : "")
            }
          >
            {label}
          </label>
        )}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          className={`relative z-10 !p-0 !font-medium !text-gray-29 [&_.MuiOutlinedInput-notchedOutline]:border-none`}
          autoHighlight
          sx={{
            border: "1px solid #D9D9D9",
            color: "black",
            ".MuiSvgIcon-root ": {
              fill: "#686868 !important",
              backgroundColor: "#F4F4F4",
              width: "1.5rem",
              height: "100%",
              position: "absolute",
              right: 0,
              top: 0,
            },
            height: "2rem",
            minWidth: "16rem",
            borderRadius: "0.2rem !important",
            fontWeight: "300",
            fontSize: "1rem",
          }}
          loadingText="Loading..."
          loading={isPending}
          inputValue={ValueInput || ""}
          onInputChange={(event, newInputValue: string | null) => {
            setValueInput(newInputValue);
          }}
          onChange={(
            event: SyntheticEvent<Element, Event>,
            value: SelectValueType | null,
          ) => {
            setValue(value);
          }}
          value={value}
          options={options}
          renderOption={(props, option: any) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
              key={option.key}
            >
              <Image
                height={100}
                width={100}
                className="h-[1.5rem] w-[1.5rem] rounded-full object-cover"
                alt=""
                src={option?.picture || avatar}
              />
              {option?.label?.replace(/  +/g, " ")}
            </Box>
          )}
          renderInput={(params) => {
            isPending || options?.length == 0
              ? (params.inputProps.value = "")
              : null;
            return <TextField className="!p-0" {...params} />;
          }}
        />
        <input
          required={required}
          type="text"
          name={label}
          className="absolute bottom-0 left-10 h-[1px] w-[1px] opacity-0"
          value={value?.value || ""}
        />
        <input
          required={required}
          type="text"
          name={"name"}
          className="absolute bottom-0 left-10 h-[1px] w-[1px] opacity-0"
          value={value?.label || ""}
        />
      </div>
    </>
  );
}

interface SelectUsers {
  RowField: RowFieldType;
  defaultValue: string | null;
}

function SelectUsers({ RowField, defaultValue }: SelectUsers) {
  const {
    profiles: { data, isPending },
  } = useProfiles();
  return (
    <SelectGeneric
      isPending={isPending}
      label={RowField?.name}
      required={RowField?.required}
      defaultValue={
        defaultValue
          ? {
              value: defaultValue,
              label: `${data?.find((user: Profile_Type) => user?.user_id == defaultValue)?.["Basic Information"]?.["First name"]} ${data?.find((user: Profile_Type) => user?.user_id == defaultValue)?.["Basic Information"]?.["Last name"]} `,
            }
          : { value: "", label: "" }
      }
      options={
        data?.map((user: Profile_Type) => {
          return {
            picture: user?.picture,
            label: `${user?.["Basic Information"]?.["First name"]} ${user?.["Basic Information"]?.["Last name"]} `,
            value: user?.user_id,
          };
        }) ?? [
          {
            label: "",
            value: "",
          },
        ]
      }
    />
  );
}

export default SelectUsers;
