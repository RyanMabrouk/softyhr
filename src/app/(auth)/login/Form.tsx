import React from "react";
import { SubmitBtn } from "../signup/SubmitBtn";
import { DomainInput } from "./DomainInput";
import verifyCompanyDomain from "@/actions/auth/verifyCompanyDomain";

export function Form({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={verifyCompanyDomain}
      className="flex h-full w-full flex-col items-start justify-between gap-4"
    >
      <div className="flex h-full w-full flex-row items-center gap-2">
        <DomainInput />
        <span className=" text-gray-21 space-x-8 font-light leading-[22px]">
          .softyhr.com
        </span>
      </div>
      <div className="flex w-full flex-row items-center gap-3">
        <SubmitBtn className=" !h-11 !max-w-[8rem] !rounded-md !bg-fabric-700 !px-[auto] hover:!bg-fabric-600 ">
          continue
        </SubmitBtn>
        {children}
      </div>
    </form>
  );
}
