"use client";
import React, { useContext } from "react";
import showPasswordToggle, {
  ShowPasswordToggleType,
} from "./_context/showPasswordToggle";
export default function ShowPasswordBtn() {
  const { setShowPassword } =
    useContext<ShowPasswordToggleType>(showPasswordToggle);
  return (
    <button
      type="button"
      className="cursor-pointer hover:text-color-primary hover:underline"
      onClick={() => setShowPassword && setShowPassword((old: boolean) => !old)}
    >
      Show Password
    </button>
  );
}
