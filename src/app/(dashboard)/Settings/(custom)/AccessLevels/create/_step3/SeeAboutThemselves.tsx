"use client";
import React from "react";
import { useViewContext } from "../context/ViewContext";
import { RadioGroupBtns } from "../../../TimeOff/policy/_Step2/RadioGroupBtns";

export function SeeAboutThemselves() {
  const { View } = useViewContext();
  return (
    <div
      className={`flex flex-col px-16  ${View === "See About Themselves" ? "" : "hidden"}`}
    >
      <span className="mb-2 mt-2 font-semibold">
        Should Employees be able to see their own information?
      </span>
      <RadioGroupBtns
        options={[
          { label: "Yes, Allow Access", value: "read:My Info" },
          { label: "No, Hide the My Info Section", value: "" },
        ]}
        name="permessions"
        defaultValue={{ label: "Yes, Allow Access", value: "read:My Info" }}
      />
    </div>
  );
}
