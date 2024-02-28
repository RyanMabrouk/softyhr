"use client";
import React, { useContext } from "react";
import toggleFormDisplay, {
  toggleFormDisplayType,
} from "./_context/toggleFormDisplay";
export default function ToggleBackBtn() {
  const { setToggleDisplay } =
    useContext<toggleFormDisplayType>(toggleFormDisplay);
  return (
    <button
      type="button"
      className="cursor-pointer hover:text-color-primary hover:underline"
      onClick={() =>
        setToggleDisplay && setToggleDisplay((old: boolean) => !old)
      }
    >
      Never mind, I remember now.
    </button>
  );
}
