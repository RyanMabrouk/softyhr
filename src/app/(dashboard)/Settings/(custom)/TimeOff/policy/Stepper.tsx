"use client";
import React, { useContext } from "react";
import { Step } from "./_ui/Step";
import StepContext, { StepContextContextType } from "./context/StepContext";

export function Stepper() {
  const { step } = useContext<StepContextContextType>(StepContext);
  return (
    <section className="flex w-full flex-row items-center overflow-hidden bg-gray-14 ">
      <Step
        active_step={step ?? 1}
        last_step={step === 3}
        step={1}
        label={"Basic Info"}
      />
      <Step
        active_step={step ?? 1}
        last_step={step === 3}
        step={2}
        label={"Accural Step"}
      />
      <Step
        active_step={step ?? 1}
        last_step={step === 3}
        step={3}
        label={"Summary"}
      />
    </section>
  );
}
