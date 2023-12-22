"use client";
import { LayoutRouteType, LayoutRoute } from "@/constants/LayoutRoute";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import companyLogo from "./cropped (2).jpg";
import { usePathname } from "next/navigation";

function Layout() {
  const currentPath = usePathname();
  const firstPath = "personnal";
  const employeId = 1202;
  return (
    <div className="bg-gray-17 flex h-20 items-center justify-start gap-[2rem] px-20">
      <Image className="cursor-pointer" alt="company logo" src={companyLogo} />
      <div className="flex h-full items-center justify-center">
        {LayoutRoute?.map(
          ({ label, pathFn }: LayoutRouteType, index: number) => {
            const isActive =
              currentPath === pathFn(firstPath, employeId) ||
              currentPath.startsWith(label.slice(0,label.indexOf('/')));
            console.log(pathFn(firstPath, employeId), pathFn(firstPath, employeId).startsWith("/employees/"));
            return (
              <Link
                key={index}
                className={
                  "flex h-full items-center justify-center px-6 text-gray-9 transition delay-75 ease-in-out hover:bg-gray-14 " +
                  (isActive ? "text-green bg-gray-14 font-bold" : "")
                }
                href={pathFn(firstPath, employeId) || ""}
              >
                {label}
              </Link>
            );
          },
        )}
      </div>
    </div>
  );
}

export default Layout;
