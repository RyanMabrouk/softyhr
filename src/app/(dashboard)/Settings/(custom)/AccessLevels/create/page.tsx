"use client";
import RoleGuard from "@/app/_ui/RoleGuard";
import Link from "next/link";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { StepContextProvider } from "../../TimeOff/policy/context/StepContext";
import { ErrorContextProvider } from "../../TimeOff/policy/context/errorContext";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { Stepper } from "../../TimeOff/policy/components/Stepper";
import { Setp1 } from "./_step1/Setp1";
import { SubmitStepsBtn } from "./components/SubmitStepsBtn";
import { PreviousStepBtn } from "./components/PreviousStepBtn";
import { Setp2 } from "./_step2/Setp2";
import { FaLock } from "react-icons/fa";
import { Setp3 } from "./_step3/Setp3";
import { NextStepBtn } from "./components/NextStepBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import insertRole from "@/actions/settings/AccessLevels/insertRole";
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
function Form() {
  const { toast } = useToast();
  const Router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: insert, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await insertRole({
        formData,
      });
      if (error) {
        toast.error(error.message, error.type);
        throw new Error(error.message);
      } else {
        toast.success("Role created successfully", "Success");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      Router.push("/Settings/AccessLevels");
    },
  });
  return (
    <div className="flex flex-col pb-20">
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
      <Stepper
        labels={{
          step1: "Basic Info",
          step2: "What this Access Level Can Do",
          step3: "What this Access Level Can See",
        }}
      />
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
      <form className="flex h-full min-h-[79dvh] flex-col" action={insert}>
        <main className="flex flex-col">
          <Setp1 />
          <Setp2 />
          <Setp3 />
        </main>
        <div className="fixed bottom-0 left-0 flex w-full flex-row items-center justify-center gap-[23vw] border-t border-opacity-15 bg-gray-14 px-4 py-6 ">
          <main className="flex w-full max-w-[85rem] flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-4">
              <SubmitStepsBtn isPending={isPending} />
              <NextStepBtn />
              <PreviousStepBtn />
              <Link
                className="flex flex-row items-center justify-center"
                href={"/Settings/AccessLevels"}
              >
                <span className="cursor-pointer leading-6 text-color5-500 transition-all duration-300 ease-linear hover:underline">
                  Cancel
                </span>
              </Link>
            </div>
            <Link
              className="relative flex flex-row items-center gap-0.5 font-bold text-gray-21"
              href={"/"}
              target="_blank"
            >
              <span className="mr-2">SoftyHR</span>
              <span className="absolute right-0 top-0 text-[0.5rem]">®</span>
            </Link>
          </main>
        </div>
      </form>
    </div>
  );
}
