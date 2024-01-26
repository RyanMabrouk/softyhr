"use client";
import React, { useContext } from "react";
import toggleFormDisplay, {
  toggleFormDisplayType,
} from "../_context/toggleFormDisplay";
import { ToggleFormDisplayProvider } from "../_context/toggleFormDisplay";

export function FlipEffectContainer({
  page1,
  page2,
}: {
  page1: React.ReactNode;
  page2: React.ReactNode;
}) {
  return (
    <ToggleFormDisplayProvider>
      <ToggleDisplay page1={page1} page2={page2} />
    </ToggleFormDisplayProvider>
  );
}

function ToggleDisplay({
  page1,
  page2,
}: {
  page1: React.ReactNode;
  page2: React.ReactNode;
}) {
  const { toggleDisplay } =
    useContext<toggleFormDisplayType>(toggleFormDisplay);
  return (
    <div className="group relative flex h-full w-full items-center justify-center perspective">
      <div
        className={`duration-650 relative flex h-full w-full  items-center justify-center transition-all preserve-3d ${
          toggleDisplay ? "my-rotate-y-180" : ""
        }`}
      >
        <div className="absolute inset-0 flex h-full w-full items-center justify-center backface-hidden">
          {page1}
        </div>
        <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden my-rotate-y-180 backface-hidden">
          {page2}
        </div>
      </div>
    </div>
  );
}
