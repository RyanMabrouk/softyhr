"use client";
import React, { useContext } from "react";
import StepContext, { StepContextContextType } from "../context/StepContext";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import { database_leave_policies_policy_type } from "@/types/database.tables.types";
import { useSearchParams } from "next/navigation";

export function SubmitStepsBtn({ isPending }: { isPending: boolean }) {
  const { step } = useContext<StepContextContextType>(StepContext);
  const type: database_leave_policies_policy_type = useSearchParams().get(
    "type",
  ) as database_leave_policies_policy_type;
  if (step !== 3 && type === "traditional") return;
  return (
    <SubmitBtn disabled={isPending} className=" !h-10 !w-20 !min-w-[10rem]">
      Save and Finish
    </SubmitBtn>
  );
}
