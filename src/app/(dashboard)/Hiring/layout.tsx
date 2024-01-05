"use client";
import { TiClipboard } from "react-icons/ti";
import React, { ReactNode } from "react";
import {
  HirinIcons,
  HirinSections,
  HirinSectionsType,
} from "@/constants/Hiring";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreateHiringJob } from "@/constants/Hiring";
import { v4 as uuidv4 } from "uuid";


interface LayoutHiringProps {
  children: ReactNode;
}
export default function HiringLayout({ children }: LayoutHiringProps) {
  const ActiveRoute = usePathname();
  console.log(ActiveRoute);
  console.log(ActiveRoute.slice(ActiveRoute.lastIndexOf("/") + 1));
  if (
    CreateHiringJob.includes(
      ActiveRoute.slice(ActiveRoute.lastIndexOf("/") + 1),
    )
  )
    return children;
  else
    return (
      <div className="flex w-full flex-col items-center justify-center bg-gray-14">
        <div className="mt-12 flex w-3/4 flex-col items-start justify-center gap-[2rem] text-black">
          <div className="flex items-center justify-center gap-[0.5rem] self-start">
            <TiClipboard fontSize="3rem" fill="#527A01" />
            <h1 className="text-2xl text-color-primary-8">Hiring</h1>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-center">
              {HirinSections?.map(
                ({ label, path, Icon }: HirinSectionsType) => {
                  const IconComponent = HirinIcons[Icon.toUpperCase()];
                  return (
                    <Link
                      key={uuidv4()}
                      href={path}
                      className={
                        "hover:!bg-gray-28 flex items-center justify-center gap-[0.5rem] whitespace-nowrap rounded-t p-4 duration-150 ease-in-out " +
                        (ActiveRoute.includes(path) ? "bg-white" : "gray")
                      }
                    >
                      <IconComponent
                        fontSize="1.7rem"
                        fill={
                          ActiveRoute.includes(path) ? "#527A01" : "#686868"
                        }
                      />
                      <h1
                        className={
                          ActiveRoute.includes(path)
                            ? "text-color-primary-3"
                            : "text-gray-21"
                        }
                      >
                        {label}
                      </h1>
                    </Link>
                  );
                },
              )}
            </div>
            <div className="flex items-center justify-center gap-[0.5rem]">
              <Link href="" className="text-sm text-gray-15 hover:underline ">
                View Careers Website
              </Link>
              <span className="text-sm text-gray-15 "> . </span>
              <Link href="" className="text-sm text-gray-15 hover:underline">
                Get Embed Code
              </Link>
            </div>
          </div>
        </div>
        {children}
      </div>
    );
}
