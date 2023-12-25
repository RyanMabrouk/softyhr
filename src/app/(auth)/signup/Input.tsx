"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { FormControl, InputLabel } from "@mui/material";

type Option = {
  value: string;
  name: string;
};
export function Input({
  label,
  className,
  type,
  name,
  options,
  error,
  toggleDisplay,
  placeholder = "",
  setValueInParent,
}: {
  label?: string;
  type: string;
  name: string;
  error: string[] | undefined;
  className?: string;
  placeholder?: string;
  options?: Option[];
  toggleDisplay?: boolean;
  setValueInParent?: (company: string) => void;
}) {
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState(error ? error[0] : "");
  useEffect(() => {
    setInputError(error ? error[0] : "");
  }, [error]);
  const HelperText = (
    <em className="absolute -bottom-[24%] left-1 h-fit max-h-4 w-full text-red-600">
      {inputError}
    </em>
  );
  return (
    <div
      className={`relative flex h-fit w-full ${className}   ${
        toggleDisplay ? "hidden" : ""
      }`}
    >
      {type === "select" ? (
        <div className="relative flex h-fit w-full flex-col items-center justify-center">
          <FormControl className="w-full">
            <InputLabel>{label}</InputLabel>
            <Select
              variant="outlined"
              data-placeholder-trigger="keydown"
              label={label}
              error={inputError ? true : false}
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-error"
              name={name}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setInputError("");
              }}
              className={`group w-full`}
            >
              {options?.map((option, i) => (
                <MenuItem
                  defaultChecked={i === 0}
                  key={"option" + name + i}
                  value={option.value}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormHelperText>{inputError && HelperText}</FormHelperText>
        </div>
      ) : (
        <TextField
          data-placeholder-trigger="keydown"
          variant="outlined"
          error={inputError ? true : false}
          helperText={inputError && HelperText}
          fullWidth
          placeholder={placeholder}
          className={`group w-full [&_*]:!outline-color-green-4 [&_*]:focus:!outline-color-green-4 [&_label]:!border-color-green-4 [&_label]:focus:!text-color-green-4`}
          label={label}
          type={type}
          name={name}
          id={name}
          onChange={(e) => {
            if (setValueInParent) {
              setValueInParent(e.target.value);
            }
            setValue(e.target.value);
            setInputError("");
          }}
        />
      )}
    </div>
  );
}
