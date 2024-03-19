import Link from "next/link";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { LiaHourglassEndSolid } from "react-icons/lia";
import { StepContextProvider } from "./context/StepContext";
import { ErrorContextProvider } from "./context/errorContext";
import { FormDataContextProvider } from "./context/formDataContext";
import { Form } from "./Form";
import RoleGuard from "@/app/_ui/RoleGuard";
export default function Page() {
  return (
    <RoleGuard
      strict={false}
      permissions={[
        "read:Employees policies",
        "read:Employees upcoming time off",
        "read:Employees history",
      ]}
    >
      <div className="relative mx-[auto] flex h-full min-h-screen w-full max-w-[85rem] flex-col gap-4 pt-5">
        <Link
          href={"/Settings/TimeOff"}
          className="flex flex-row items-center gap-1 text-sm text-gray-21 hover:text-fabric-700 hover:underline"
        >
          <GoArrowLeft />
          <span>Time Off</span>
        </Link>
        <header className="mb-3 flex flex-row items-center justify-start gap-1">
          <LiaHourglassEndSolid
            className={`h-10 w-10 cursor-pointer font-bold  text-fabric-700 transition-all ease-linear`}
          />
          <span className="text-3xl font-semibold text-fabric-700">
            New Policy
          </span>
        </header>

        <ErrorContextProvider>
          <StepContextProvider>
            <FormDataContextProvider>
              <Form />
            </FormDataContextProvider>
          </StepContextProvider>
        </ErrorContextProvider>
      </div>
    </RoleGuard>
  );
}
