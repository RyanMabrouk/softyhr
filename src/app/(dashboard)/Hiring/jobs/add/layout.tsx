"use client";
import { CreateHiringJob, HirinSections } from "@/constants/Hiring";
import { Checkbox, FormGroup } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TiClipboard } from "react-icons/ti";
import StepsProvider from "./provider/StepsProvider";

interface LayoutJobsProps {
  children: ReactNode;
}

function Layout({ children }: LayoutJobsProps) {
    const pathname = usePathname();
  return (
    <div className="flex w-full items-center justify-center">
      <div className="mt-12 flex w-3/4 flex-col items-start justify-center gap-[1rem]">
        <Link
          href={HirinSections[0]?.path}
          className="flex items-center justify-center gap-[0.5rem] text-sm text-gray-15"
        >
          <FaArrowLeftLong fontSize="0.7rem" />
          <h1 className="hover:underline">Job Opening</h1>
        </Link>
        <div className="flex w-full items-center justify-between border-b border-gray-18 pb-2">
          <div className="flex items-center justify-center gap-[0.5rem] self-start">
            <TiClipboard fontSize="3rem" fill="#527A01" />
            <h1 className="text-3xl font-semibold tracking-wider	 text-color-primary-8">
              Create Job Opening
            </h1>
          </div>
          <Link
            href={HirinSections[0]?.path}
            className="text-color5-500 hover:underline"
          >
            cancel
          </Link>
        </div>
        <div className="flex w-full items-start justify-start gap-[1rem]">
          <div className="flex w-3/12 flex-col items-center gap-[1rem] rounded-xl bg-gray-14 p-4 px-8 pb-8">
            <div className="flex w-full flex-col items-start justify-center gap-[0.5rem] border-b border-gray-15">
              {CreateHiringJob?.map((path: string, index: number) => {
                return (
                  <Link
                    href={path}
                    className={
                      pathname.includes(path)
                        ? "text-lg font-medium text-color-primary-8"
                        : "text-lg font-medium text-gray-15"
                    }
                    key={index}
                  >
                    <Checkbox
                      checked={pathname.includes(path)}
                      color="success"
                    />
                    {path}
                  </Link>
                );
              })}
            </div>
            <Link
              className="hover:shadow-green flex w-full items-center justify-center border border-color-primary-8 p-1 px-2 text-lg font-medium text-color-primary-5 duration-200  ease-in-out hover:!border-color-primary-7 hover:!text-color-primary-8 "
              href={
                CreateHiringJob.at(
                  CreateHiringJob.indexOf(
                    pathname.slice(pathname.lastIndexOf("/") + 1),
                  ) + 1,
                ) || ""
              }
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
            </Link>
          </div>
          <StepsProvider>
            {children}
          </StepsProvider>
        </div>
      </div>
    </div>
  );
}

export default Layout;
