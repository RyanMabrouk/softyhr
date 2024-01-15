"use client";
import { LayoutRouteType, LayoutRoute } from "@/constants/LayoutRoute";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import companyLogo from "/public/cropped (2).jpg";
import { usePathname } from "next/navigation";
import useData from "@/hooks/useData";
import useEmployeeData from "@/hooks/useEmloyeeData";

interface NavPropsType {
  employeeId:string;
}

export default function Nav({employeeId}:NavPropsType) {
  const currentPath = usePathname();
  return (
    <>
      <nav className="flex h-20 items-center justify-start gap-[2rem] bg-gray-17 px-20">
        <Image
          className="cursor-pointer"
          alt="company logo"
          src={companyLogo}
        />
        <div className="flex h-full items-center justify-center">
          {LayoutRoute?.map(
            (
              { label, pathFn, defaultPath }: LayoutRouteType,
              index: number,
            ) => {
              const isActive = pathFn(currentPath, String(employeeId));
              return (
                <Link
                  key={index}
                  className={
                    "flex h-full items-center justify-center px-6 capitalize text-gray-9 transition delay-75 ease-in-out hover:bg-gray-14 " +
                    (isActive
                      ? "bg-gray-14 font-bold !text-color-primary-4"
                      : "")
                  }
                  href={defaultPath ? defaultPath(employeeId) : ""}
                >
                  {label}
                </Link>
              );
            },
          )}
        </div>
      </nav>
      <div className="h-[0.2rem] w-full bg-color-primary-11" />
    </>
  );
}
