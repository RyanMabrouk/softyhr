"use client";
import React, { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

export function PasswordInput({ error }: { error: string[] | undefined }) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState("");
  useEffect(() => {
    setInputError(error ? error[0] : "");
  }, [error]);
  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
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
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((show) => !show)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
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
