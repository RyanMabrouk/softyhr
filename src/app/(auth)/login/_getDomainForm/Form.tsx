"use client";
import React from "react";
import { DomainInput } from "./DomainInput";
import verifyCompanyDomain from "@/actions/auth/verifyCompanyDomain";
import useToast from "@/hooks/useToast";
import { SubmitBtn } from "../../../_ui/SubmitBtn";

export function Form({ children }: { children: React.ReactNode }) {
  const { toast, toastContainer } = useToast();
  return (
    <>
      {toastContainer}
      <form
        action={async (formData: FormData) => {
          const { error } = await verifyCompanyDomain(formData);
          if (error) toast.error(error.message, error.type);
        }}
        className="flex h-full w-full flex-col items-start justify-between gap-4"
      >
        <div className="flex h-full w-full flex-row items-center gap-2">
          <DomainInput />
          <span className=" space-x-8 font-light leading-[22px] text-gray-21">
            .softyhr.com
          </span>
        </div>
        <div className="flex w-full flex-row items-center gap-3">
          <SubmitBtn className="!max-w-[8rem]">continue</SubmitBtn>
          {children}
        </div>
      </form>
    </>
  );
}
