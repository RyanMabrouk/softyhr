"use client";
import React, { useContext } from "react";
import showPasswordToggle from "./_context/showPasswordToggle";
export default function ShowPasswordBtn() {
  const { setShowPassword }: any = useContext(showPasswordToggle);
  return (
    <button
      type="button"
      className="cursor-pointer hover:text-color-primary hover:underline"
      onClick={() => setShowPassword((old: boolean) => !old)}
    >
      Show Password
    </button>
  );
}
