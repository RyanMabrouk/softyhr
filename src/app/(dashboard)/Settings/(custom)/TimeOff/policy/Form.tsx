"use client";
import Link from "next/link";
import React from "react";
import { Stepper } from "./components/Stepper";
import { PreviousStepBtn } from "./components/PreviousStepBtn";
import { SubmitStepsBtn } from "./components/SubmitStepsBtn";
import { Setp1 } from "./_Step1/Setp1";
import insertNewPolicy from "@/actions/settings/leave/insertNewPolicy";
import { NextStepBtn } from "./components/NextStepBtn";
import { useSearchParams, useRouter } from "next/navigation";
import { database_leave_policies_policy_type } from "@/types/database.tables.types";
import { Setp2 } from "./_Step2/Setp2";
import { Setp3 } from "./_Step3/Setp3";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import { useCategorieTimeUnit } from "./hooks/useCategorieTimeUnit";
export function Form() {
  const { toast } = useToast();
  const Router = useRouter();
  const type: database_leave_policies_policy_type = useSearchParams().get(
    "type",
  ) as database_leave_policies_policy_type;
  const categories_id = useSearchParams().get("categories_id");
  const track_time_unit = useCategorieTimeUnit({
    categories_id: Number(categories_id),
  });
  const queryClient = useQueryClient();
  const { mutate: insert, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await insertNewPolicy({
        formData,
        type,
        track_time_unit,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Policy created successfully", "Success");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave_policies"] });
      Router.push("/Settings/TimeOff");
    },
  });
  return (
    <div className="flex flex-col pb-20">
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
      {type === "traditional" && (
        <>
          <Stepper
            labels={{
              step1: "Basic Info",
              step2: "Accural Step",
              step3: "Summary",
            }}
          />
          <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
        </>
      )}
      <form className="flex h-full min-h-[79dvh] flex-col" action={insert}>
        <main className="flex flex-col px-6">
          <Setp1 />
          {type === "traditional" && (
            <>
              <Setp2 />
              <Setp3 />
            </>
          )}
        </main>
        <div className="fixed bottom-0 left-0 flex w-full flex-row items-center justify-center gap-[23vw] border-t border-opacity-15 bg-gray-14 px-4 py-6 ">
          <main className="flex w-full max-w-[85rem] flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-4">
              <SubmitStepsBtn isPending={isPending} />
              <NextStepBtn />
              <PreviousStepBtn />
              <Link
                className="flex flex-row items-center justify-center"
                href={"/Settings/TimeOff"}
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
