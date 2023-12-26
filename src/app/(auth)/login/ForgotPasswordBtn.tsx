"use client";
import React, { useContext } from "react";
import toggleFormDisplay from "./_context/toggleFormDisplay";
export default function ForgotPasswordBtn() {
  const { setToggleDisplay }: any = useContext(toggleFormDisplay);
  return (
    <button
      type="button"
      className="cursor-pointer hover:text-color-green hover:underline"
      onClick={() => setToggleDisplay((old: boolean) => !old)}
    >
      Forgot Password?
    </button>
  );
}
