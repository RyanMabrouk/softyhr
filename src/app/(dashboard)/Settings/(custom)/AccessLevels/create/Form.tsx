"use client";
import Link from "next/link";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useToast from "@/hooks/useToast";
import { Stepper } from "../../TimeOff/policy/components/Stepper";
import { Setp1 } from "./_step1/Setp1";
import { SubmitStepsBtn } from "./components/SubmitStepsBtn";
import { PreviousStepBtn } from "./components/PreviousStepBtn";
import { Setp2 } from "./_step2/Setp2";
import { Setp3 } from "./_step3/Setp3";
import { NextStepBtn } from "./components/NextStepBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import insertRole from "@/actions/settings/AccessLevels/insertRole";
import updateRole from "@/actions/settings/AccessLevels/updateRole";

export function Form() {
  const { toast } = useToast();
  const Router = useRouter();
  const queryClient = useQueryClient();
  // Duplicate and edit cases
  const searchParams = useSearchParams();
  const role_id = searchParams.get("role_id");
  const edit = searchParams.get("edit");
  // handle role insert
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
  // handle role update
  const { mutate: update, isPending: isPending2 } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await updateRole({
        formData,
        role_id: String(role_id),
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
      <form
        className="flex h-full min-h-[79dvh] flex-col"
        action={(formData) => (edit ? update(formData) : insert(formData))}
      >
        <main className="flex flex-col">
          <Setp1 />
          <Setp2 />
          <Setp3 />
        </main>
        <div className="fixed bottom-0 left-0 flex w-full flex-row items-center justify-center gap-[23vw] border-t border-opacity-15 bg-gray-14 px-4 py-6 ">
          <main className="flex w-full max-w-[85rem] flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-4">
              <SubmitStepsBtn isPending={isPending || isPending2} />
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
