"use client";
import React from "react";
import { useViewContext } from "../../context/ViewContext";
import { FaUnlockAlt } from "react-icons/fa";
import { Content } from "./Content";

export function SeeAbouOtherEmployees() {
  const { View } = useViewContext();
  return (
    <main
      className={`flex flex-col  gap-3 px-16 ${View === "See About other Employees" ? "" : "hidden"}`}
    >
      <div className="flex flex-row items-center gap-2">
        <FaUnlockAlt
          className={`h-8 w-8 cursor-pointer rounded-full bg-[#bd5800] p-1 py-2 font-bold  text-white transition-all ease-linear`}
        />
        <span>
          This Access Level can access the information below for{" "}
          <span className="cursor-pointer text-color5-500 transition-all ease-linear hover:text-fabric-700 hover:underline">
            All Employees
          </span>
        </span>
      </div>
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
      <Content />
    </main>
  );
}
