"use client";
import { CreateHiringJob, HirinSections } from "@/constants/Hiring";
import { Checkbox, FormGroup } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, {
  ReactNode,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TiClipboard } from "react-icons/ti";
import StepsProvider, { StepsContext } from "./provider/StepsProvider";
import { test } from "@/actions/test";
import { FormdataToObject } from "@/helpers/object.helpers";
import { RiCheckboxCircleFill, RiCheckboxCircleLine } from "react-icons/ri";

interface LayoutJobsProps {
  children: ReactNode;
}

const LayoutComponent = memo(function LayoutComponent({
  children,
}: LayoutJobsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    Update_ApplicationDetails,
    InformationJob,
    ApplicationDetails,
    JobBoards,
    Update_InformationJob,
    Update_JobBoards,
  } = useContext(StepsContext);
  const Actions: any = {
    "Information-Job": Update_InformationJob,
    "Application-Details": Update_ApplicationDetails,
    "Job-Boards": Update_JobBoards,
  };
  const stepValidation: any = {
    "Information-Job": InformationJob,
    "Application-Details": ApplicationDetails,
    "Job-Boards": JobBoards,
  };
  function submitForm(formdata: FormData) {
    test(formdata);
    const step =
      CreateHiringJob.at(
        CreateHiringJob.indexOf(pathname.slice(pathname.lastIndexOf("/") + 1)),
      ) || "Job-Boards";
    const action = Actions?.[step];
    action({ values: FormdataToObject(formdata), done: true });
    router.push(
      CreateHiringJob.at(
        CreateHiringJob.indexOf(pathname.slice(pathname.lastIndexOf("/") + 1)) +
          1,
      ) || "",
    );
  }
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-10/12 items-center justify-center">
        <div className="mt-12 flex w-11/12 flex-col items-start justify-center gap-[1rem]">
          <Link
            href={HirinSections[0]?.path}
            className="flex items-center justify-center gap-[0.5rem] text-sm text-gray-11"
          >
            <FaArrowLeftLong fontSize="0.7rem" />
            <h1 className="hover:underline">Job Opening</h1>
          </Link>
          <div className="flex w-full items-center justify-between border-b border-gray-18 pb-2">
            <div className="flex items-center justify-center gap-[0.5rem] self-start">
              <TiClipboard fontSize="3rem" fill="#527A01" />
              <h1 className="text-3xl font-semibold text-color-primary-8">
                Create Job Opening
              </h1>
              {InformationJob?.values?.["Posting Title"] != "" && (
                <h1 className="pt-2 text-lg text-gray-29">
                  {InformationJob?.values?.["Posting Title"]}
                </h1>
              )}
            </div>
            <Link
              href={HirinSections[0]?.path}
              className="text-color5-500 hover:underline"
            >
              cancel
            </Link>
          </div>
          <form
            action={submitForm}
            className="flex w-full items-start justify-start gap-[1rem]"
          >
            <div className="flex w-3/12 flex-col items-center gap-[1rem] rounded-xl bg-gray-14 p-4 px-8 pb-8">
              <div className="flex w-full flex-col items-start justify-center  border-b border-gray-15 pb-4">
                {CreateHiringJob?.map((path: string, index: number) => {
                  return (
                    <Link
                      href={path}
                      className={
                        "flex items-center justify-center gap-[1rem] py-2 "
                      }
                      key={index}
                    >
                      {(pathname.includes(path) &&
                        path == CreateHiringJob[0]) ||
                      stepValidation?.[path]?.done ? (
                        <RiCheckboxCircleFill className="text-3xl !text-color-primary-8" />
                      ) : (
                        <RiCheckboxCircleLine className="text-3xl !text-color-primary-8" />
                      )}
                      <h1
                        className={
                          "flex gap-[1rem] text-lg font-semibold " +
                          (pathname.includes(path)
                            ? "text-color-primary-8"
                            : "text-gray-15")
                        }
                      >
                        {path}
                      </h1>
                    </Link>
                  );
                })}
              </div>
              <button
                type="submit"
                className="hover:shadow-green flex w-full items-center justify-center border border-color-primary-8 bg-white p-1 px-2 text-lg  font-semibold text-color-primary-5 duration-200 ease-in-out hover:!border-color-primary-7 hover:!text-color-primary-8 "
              >
                {CreateHiringJob.at(
                  CreateHiringJob.indexOf(
                    pathname.slice(pathname.lastIndexOf("/") + 1),
                  ) + 1,
                )
                  ? "next: " +
                    CreateHiringJob.at(
                      CreateHiringJob.indexOf(
                        pathname.slice(pathname.lastIndexOf("/") + 1),
                      ) + 1,
                    )
                  : "Save Draft"}
              </button>
            </div>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
});
export default function Layout({ children }: LayoutJobsProps) {
  return (
    <StepsProvider>
      <LayoutComponent>{children}</LayoutComponent>
    </StepsProvider>
  );
}
