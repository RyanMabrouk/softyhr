import RoleGuard from "@/app/_ui/RoleGuard";
import Link from "next/link";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { StepContextProvider } from "../../TimeOff/policy/context/StepContext";
import { ErrorContextProvider } from "../../TimeOff/policy/context/errorContext";
import { FaLock } from "react-icons/fa";
import { Form } from "./Form";
export default function Page() {
  return (
    <RoleGuard permissions={["access:/Settings/TimeOff"]}>
      <div className="relative mx-[auto] flex h-full min-h-screen w-full max-w-[85rem] flex-col gap-4 pt-5">
        <Link
          href={"/Settings/TimeOff"}
          className="flex flex-row items-center gap-1 text-sm text-gray-21 hover:text-fabric-700 hover:underline"
        >
          <GoArrowLeft />
          <span>Access Levels</span>
        </Link>
        <header className="mb-3 flex flex-row items-center justify-start gap-2">
          <FaLock
            className={`h-9 w-9 cursor-pointer font-bold  text-fabric-700 transition-all ease-linear`}
          />
          <span className="text-3xl font-semibold text-fabric-700">
            New Custom Access Level
          </span>
        </header>
        <StepContextProvider>
          <ErrorContextProvider>
            <Form />
          </ErrorContextProvider>
        </StepContextProvider>
      </div>
    </RoleGuard>
  );
}
