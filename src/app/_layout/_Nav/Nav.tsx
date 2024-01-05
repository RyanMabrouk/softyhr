"use client";
import { LayoutRouteType, LayoutRoute } from "@/constants/LayoutRoute";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import companyLogo from "/public/cropped (2).jpg";
import { usePathname } from "next/navigation";

export default function Nav() {
  const currentPath = usePathname();
  const firstPath = "personnal";
  const employeId = 1202;
  return (
    <nav className="flex h-20 items-center justify-start gap-[2rem] bg-gray-17 px-20">
      <Image className="cursor-pointer" alt="company logo" src={companyLogo} />
      <div className="flex h-full items-center justify-center">
        {LayoutRoute?.map(
          ({ label, pathFn }: LayoutRouteType, index: number) => {
            const isActive =
              currentPath === pathFn(firstPath, employeId) ||
              currentPath.startsWith(label.slice(0, label.indexOf("/")));
            return (
              <Link
                key={index}
                className={
                  "flex h-full items-center justify-center px-6 capitalize text-gray-9 transition delay-75 ease-in-out hover:bg-gray-14 " +
                  (isActive ? "bg-gray-14 font-bold !text-color-primary-4" : "")
                }
                href={pathFn(firstPath, employeId) || ""}
              >
                {label}
              </Link>
            );
          },
        )}
      </div>
    </nav>
  );
}
