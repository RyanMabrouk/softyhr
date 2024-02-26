"use client";
import React, { useContext } from "react";
import StepContext, {
  StepContextContextType,
} from "../../../TimeOff/policy/context/StepContext";
import { SwitchView, ViewContent } from "./SwitchView";
import { ViewContextProvider } from "../context/ViewContext";

export function Setp3() {
  const { step } = useContext<StepContextContextType>(StepContext);
  return (
    <div
      className={` flex w-full flex-col gap-4 ${step === 3 ? "flex" : "hidden"} `}
    >
      <ViewContextProvider>
        <header className="flex min-h-[10rem] w-full flex-col gap-4 bg-gray-14 px-16 pt-8">
          <span className="text-lg font-semibold text-gray-27">
            What Can People with this Access Level See?
          </span>
          <SwitchView />
        </header>
        <ViewContent />
      </ViewContextProvider>
    </div>
  );
}
