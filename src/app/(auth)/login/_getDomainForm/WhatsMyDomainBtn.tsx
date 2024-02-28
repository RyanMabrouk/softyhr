"use client";
import React, { useContext } from "react";
import toggleFormDisplay, {
  toggleFormDisplayType,
} from "../_context/toggleFormDisplay";

export function WhatsMyDomainBtn() {
  const { setToggleDisplay } =
    useContext<toggleFormDisplayType>(toggleFormDisplay);
  return (
    <button
      onClick={() =>
        setToggleDisplay && setToggleDisplay((old: boolean) => !old)
      }
      type="button"
      className="font-normal text-gray-21 hover:text-color-primary hover:underline"
    >
      What's my domain?
    </button>
  );
}
