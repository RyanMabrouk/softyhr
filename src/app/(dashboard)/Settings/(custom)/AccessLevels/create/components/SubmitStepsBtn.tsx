"use client";
import React, { useContext } from "react";
import StepContext, {
  StepContextContextType,
} from "../../../TimeOff/policy/context/StepContext";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";

export function SubmitStepsBtn({ isPending }: { isPending: boolean }) {
  const { step } = useContext<StepContextContextType>(StepContext);
  if (step !== 3) return;
  return (
    <SubmitBtn disabled={isPending} className=" !h-10 !w-20 !min-w-[10rem]">
      Save and Finish
    </SubmitBtn>
  );
}
