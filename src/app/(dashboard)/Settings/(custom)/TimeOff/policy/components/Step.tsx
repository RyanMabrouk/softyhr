"use client";
import React from "react";
import { FaCheck } from "react-icons/fa6";

export function Step({
  step,
  active_step,
  label,
  last_step,
}: {
  step: number;
  active_step: number;
  label: string;
  last_step?: boolean;
}) {
  const completed = active_step > step;
  const active = active_step === step;
  return (
    <div
      className={`relative flex flex-row items-center gap-1.5 py-3.5 pl-16 ${active || completed ? (last_step ? "" : "bg-gray-17 pl-16") : ""}`}
    >
      {completed ? (
        <div
          className={`z-10 flex items-center justify-center rounded-full p-1 text-center  transition-[background-color] ease-linear ${active ? "bg-fabric-700" : "bg-gray-26"}`}
        >
          <FaCheck className="h-5 w-5 text-gray-14" />
        </div>
      ) : (
        <div
          className={`z-10 flex items-center justify-center rounded-full px-2.5  py-[2px] text-center transition-[background-color] ease-linear ${active ? "bg-fabric-700" : "bg-gray-26"}`}
        >
          <span className=" font-semibold text-gray-14">{step}</span>{" "}
        </div>
      )}

      <div
        className={`z-10 text-lg font-semibold transition-all ease-linear ${active ? "text-fabric-700" : "text-gray-26"}`}
      >
        {label}
      </div>
      {!last_step && (
        <div
          className={`absolute -right-[2rem] inline-block h-full w-[100px] rotate-90 before:absolute before:left-0 before:top-[-35px] before:h-0 before:w-0 before:border-x-[50px] before:border-b-[35px] before:border-solid before:border-x-transparent before:content-[""] ${active ? "border-gray-17 bg-gray-17 before:border-gray-17" : completed ? "" : "border-gray-14 bg-gray-14 outline-gray-26 before:border-gray-14"}`}
        ></div>
      )}
    </div>
  );
}
