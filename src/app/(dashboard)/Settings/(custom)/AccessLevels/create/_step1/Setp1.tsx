"use client";
import React, { useContext } from "react";
import StepContext, {
  StepContextContextType,
} from "../../../TimeOff/policy/context/StepContext";
import ErrorContext, {
  ErrorContextContextType,
} from "../../../TimeOff/policy/context/errorContext";
import { InputGeneric } from "@/app/_ui/InputGeneric";
import { TextFeildGeneric } from "@/app/_ui/TextFeildGeneric";
import { useSearchParams } from "next/navigation";
import useRole from "@/hooks/Roles/useRole";

export function Setp1() {
  const { step } = useContext<StepContextContextType>(StepContext);
  const { error } = useContext<ErrorContextContextType>(ErrorContext);
  // Duplicate and edit cases
  const searchParams = useSearchParams();
  const role_id = searchParams.get("role_id");
  const duplicate = searchParams.get("duplicate");
  const {
    role: { data: roleData },
  } = useRole({ id: Number(String(role_id)) });
  return (
    <div
      className={`mt-6 flex w-full flex-col gap-6 ${step === 1 ? "flex" : "hidden"} `}
    >
      <span className="-mb-2 px-6 text-sm leading-6 text-gray-25 ">
        Custom Access Levels can be configured to allow Employees to see and/or
        edit information for some or all employees in your company.
      </span>
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
      <div className="space-y-6 px-6">
        <InputGeneric
          error={error?.role_name?.[0]}
          className=" !w-[16rem] max-w-[16rem]"
          name="role_name"
          label="Access Level Name"
          defaultValue={
            duplicate ? roleData?.name + "-duplicate" : roleData?.name ?? ""
          }
          required
        />
        <TextFeildGeneric
          name="role_description"
          label="Description"
          className="max-h-[10rem] max-w-[30rem]"
          defaultValue={roleData?.description ?? ""}
          error={error?.role_description?.[0]}
        />
      </div>
    </div>
  );
}
