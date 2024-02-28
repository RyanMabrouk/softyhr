"use client";
import React, { useContext } from "react";
import StepContext, { StepContextContextType } from "../context/StepContext";
import { IoCalendar, IoSettings } from "react-icons/io5";
import { AccuralFrequencyInputs } from "./AccuralFrequencyInputs";
import { AccuralOptions } from "./AccuralOptions";
import { MdOutlineAddCircle } from "react-icons/md";
import { HiRefresh } from "react-icons/hi";
import { CarryoverValidity } from "./CarryoverValidity";
import { FineTuninigInputs } from "./FineTuninigInputs";
import { CarryoverDateSelect } from "./CarryoverDateSelect";
import { ToggleVisivilityContextProvider } from "../context/ToggleVisivilityContext";

export function Setp2() {
  const { step } = useContext<StepContextContextType>(StepContext);
  return (
    <div
      className={`mt-10 flex flex-col gap-6 pb-40 ${step === 2 ? "flex" : "hidden"}`}
    >
      <p className="text-2xl">Great! Now, let’s get into the nitty gritty.</p>
      <ToggleVisivilityContextProvider>
        <section className="flex flex-col justify-center gap-2 px-6">
          <header className="flex flex-row items-center gap-1.5">
            <IoCalendar className="h-6 w-6 text-fabric-700" />
            <p className="text-lg">Accrual Schedule</p>
          </header>
          <main className="ml-2.5 flex w-full shrink-0 flex-col justify-center gap-6 border-l-[2px] border-solid border-gray-16 px-6 py-6">
            <AccuralFrequencyInputs />
            <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />

            <section className="flex flex-col justify-center gap-2">
              <header className="m-0 text-lg leading-8 text-gray-27 opacity-85">
                Accrual Options
              </header>
              <AccuralOptions />
            </section>
          </main>
          {/*<button
            type="button"
            className="-ml-0.5 flex w-fit flex-row items-center justify-center gap-0.5 bg-white font-semibold text-color5-500  transition-all ease-linear hover:text-fabric-700 hover:underline"
          >
            <MdOutlineAddCircle className="h-7 w-7" />
            <span>Add Milestone</span>
          </button>*/}
        </section>
        <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
        <section className="flex flex-col justify-center gap-4">
          <header className="flex flex-row items-center gap-1.5">
            <HiRefresh className="h-6 w-6 text-fabric-700" />
            <p className="text-lg">Carryover Rules</p>
          </header>
          <main className="flex flex-col justify-center gap-6 px-6">
            <CarryoverDateSelect />
            <CarryoverValidity />
          </main>
        </section>
      </ToggleVisivilityContextProvider>
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
      <section className="flex flex-col justify-center gap-4">
        <header className="flex flex-row items-center gap-1.5">
          <IoSettings className="h-6 w-6 text-fabric-700" />
          <p className="text-lg">Some Fine-tuning</p>
        </header>
        <main className="flex flex-col justify-center gap-6 px-6">
          <FineTuninigInputs />
        </main>
      </section>
    </div>
  );
}
