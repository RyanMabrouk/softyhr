"use client";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { IoEyeOffSharp } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";

export function PasswordInput({ error }: { error: string[] | undefined }) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState("");
  useEffect(() => {
    setInputError(error ? error[0] : "");
  }, [error]);
  return (
    <FormControl
      sx={{ width: "100%" }}
      variant="outlined"
      className={`[&_label]:focus-within:!text-color-primary-3  ${
        inputError ? "" : "[&_label]:!text-black [&_label]:!text-opacity-[0.6]"
      }`}
    >
      <InputLabel
        error={inputError ? true : false}
        htmlFor="outlined-adornment-password"
      >
        Password
      </InputLabel>
      <OutlinedInput
        fullWidth
        label="Password"
        id="outlined-adornment-password"
        name="password"
        error={inputError ? true : false}
        type={showPassword ? "text" : "password"}
        onChange={() => setInputError("")}
        className={` [&_.MuiOutlinedInput-notchedOutline]:focus-within:!border-color-primary-4   ${
          inputError
            ? ""
            : "[&_.MuiOutlinedInput-notchedOutline]:!border-color-primary-4"
        }`}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((show) => !show)}
              edge="end"
              className="!-ml-12"
            >
              {showPassword ? <IoEyeOffSharp /> : <MdRemoveRedEye />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>
        {inputError && (
          <em className="absolute -bottom-[24%] left-1 h-fit max-h-4 w-full text-red-600">
            {inputError}
          </em>
        )}
      </FormHelperText>
    </FormControl>
  );
}
