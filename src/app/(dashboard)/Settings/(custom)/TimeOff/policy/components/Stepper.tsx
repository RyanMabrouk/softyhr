"use client";
import React, { useContext } from "react";
import { Step } from "./Step";
import StepContext, { StepContextContextType } from "../context/StepContext";
export function Stepper({
  labels: { step1, step2, step3 },
}: {
  labels: {
    step1: string;
    step2: string;
    step3: string;
  };
}) {
  const { step } = useContext<StepContextContextType>(StepContext);
  return (
    <section className="flex w-full flex-row items-center overflow-hidden bg-gray-14 ">
      <Step
        active_step={step ?? 1}
        last_step={step === 3}
        step={1}
        label={step1}
      />
      <Step
        active_step={step ?? 1}
        last_step={step === 3}
        step={2}
        label={step2}
      />
      <Step
        active_step={step ?? 1}
        last_step={step === 3}
        step={3}
        label={step3}
      />
    </section>
  );
}
