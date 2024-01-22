import { CreateHiringJob } from "@/constants/Hiring";
import { usePathname } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";

function SubmitFormBtn() {
  const { pending } = useFormStatus();
  const pathname = usePathname();
  const currentStep =
    CreateHiringJob.at(
      CreateHiringJob.indexOf(pathname.slice(pathname.lastIndexOf("/") + 1)),
    ) || "Job-Boards";
    
  return (
    <button
      type="submit"
      className={
        "hover:shadow-green flex w-full items-center justify-center border border-color-primary-8 bg-white p-1 px-2 text-lg  font-semibold text-color-primary-5 duration-200 ease-in-out hover:!border-color-primary-7 hover:!text-color-primary-8 " +
        (currentStep == "Job-Boards" ? "!bg-color-primary-8 !text-white" : "")
      }
    >
      {!(pending && currentStep == "Job-Boards") ? (
        CreateHiringJob.at(
          CreateHiringJob.indexOf(
            pathname.slice(pathname.lastIndexOf("/") + 1),
          ) + 1,
        ) ? (
          "next: " +
          CreateHiringJob.at(
            CreateHiringJob.indexOf(
              pathname.slice(pathname.lastIndexOf("/") + 1),
            ) + 1,
          )
        ) : (
          "Save Draft"
        )
      ) : (
        <div className="flex items-center justify-center gap-[1rem]">
          <span className="box-border inline-block h-5 w-5 animate-[spin_1s_linear_infinite] rounded-[50%] border-[3px] border-solid border-white border-b-transparent"></span>
          <h1 className="text-white">Creating...</h1>
        </div>
      )}
    </button>
  );
}

export default SubmitFormBtn;
