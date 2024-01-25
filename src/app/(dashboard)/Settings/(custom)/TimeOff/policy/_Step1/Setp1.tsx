"use client";
import React, { useContext } from "react";
import StepContext, { StepContextContextType } from "../context/StepContext";
import { InputGeneric, Label } from "@/app/_ui/InputGeneric";
import { IoIosInformationCircle } from "react-icons/io";
import ErrorContext, { ErrorContextContextType } from "../context/errorContext";
import { CategoriesCheckBox } from "./CategoriesCheckBox";
import { database_leave_policies_policy_type } from "@/types/database.tables.types";
import { useSearchParams } from "next/navigation";
import InsightGeneric from "@/app/_ui/InsightGeneric";

export function Setp1() {
  const { step } = useContext<StepContextContextType>(StepContext);
  const { error } = useContext<ErrorContextContextType>(ErrorContext);
  const type: database_leave_policies_policy_type = useSearchParams().get(
    "type",
  ) as database_leave_policies_policy_type;
  return (
    <div
      className={`mt-10 flex w-full flex-col gap-6 ${step === 1 ? "flex" : "hidden"} `}
    >
      {type === "traditional" && (
        <p className="text-2xl">Let’s start with some of the basic info.</p>
      )}
      <InputGeneric
        className=" !w-[16rem] max-w-[16rem]"
        label="Policy name"
        name="policy_name"
        error={error?.policy_name?.[0]}
        required
      />
      <div className="gap- flex flex-col gap-2">
        <div className="flex flex-row items-center gap-3">
          <Label
            error={error?.categories_id?.[0] ? true : false}
            required
            name="categories_id"
          >
            What category does this policy belong to?
          </Label>

          <InsightGeneric tip="Categories help keep your leave policies organized" />
        </div>
        <CategoriesCheckBox />
      </div>
    </div>
  );
}
