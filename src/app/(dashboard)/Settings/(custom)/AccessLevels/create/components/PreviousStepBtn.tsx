"use client";
import React, { useContext } from "react";
import StepContext, {
  StepContextContextType,
} from "../../../TimeOff/policy/context/StepContext";

export function PreviousStepBtn() {
  const { step, setStep } = useContext<StepContextContextType>(StepContext);
  if (step === 1) return;
  return (
    <button
      className="h-10 w-[9rem] space-x-8 rounded-md border border-gray-27 bg-white text-gray-27 shadow-sm transition-all ease-linear hover:shadow-md"
      type="button"
      onClick={() => setStep && setStep((old) => old - 1)}
    >
      Previous Step
    </button>
  );
}
