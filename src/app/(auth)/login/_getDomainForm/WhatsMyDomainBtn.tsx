"use client";
import React, { useContext } from "react";
import toggleFormDisplay from "../_context/toggleFormDisplay";

export function WhatsMyDomainBtn() {
  const { setToggleDisplay }: any = useContext(toggleFormDisplay);
  return (
    <button
      onClick={() => setToggleDisplay((old: boolean) => !old)}
      type="button"
      className="font-normal text-gray-21 hover:text-color-green hover:underline"
    >
      What's my domain?
    </button>
  );
}
