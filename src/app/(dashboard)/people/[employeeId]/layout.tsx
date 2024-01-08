"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import AvatarUser from "./download (7).png";
import Link from "next/link";
import { EmployeRoutesType, EmployeeRoute } from "@/constants/employeeRoute";
import { usePathname } from "next/navigation";
import UserInfo from "../components/UserInfo/UserInfo";
import DropDown from "../components/DropDown/DropDown";
import { Settings, changementRequest } from "@/constants/userInfo";
interface EmployePropsType {
  params: { employeeId: string };
  children: ReactNode;
}
export default function Layout({
  params: { employeeId },
  children,
}: EmployePropsType) {
  const ActiveRoute =
    usePathname().split("/").slice(-1).join("") || EmployeeRoute[0]?.label;
  return (
    <div className="flex h-full w-full flex-col ">
      <div
        className="z-20 flex h-[13rem] justify-center bg-gradient-to-r from-color-primary-7  to-color-primary-9 transition-all duration-300 ">
        <div className={"flex w-9/12 items-end justify-start gap-[4rem] "}>
          <Image
            src={AvatarUser}
            alt="user-name"
            priority
            width={208}
            height={208}
            className={
              " z-10 ml-4 -mb-9 h-[13rem] w-[13rem] cursor-pointer rounded-full border-2 border-white bg-gray-6 object-cover "
            }
          />
          <div className={"flex-column flex w-full flex-col gap-[3rem] "}>
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-white">Ali Ben Romdhan</h1>
              <div className={"flex h-10 gap-[1rem] "}>
                <DropDown
                  text="Request a Change"
                  ListArray={changementRequest}
                />
                <DropDown text="Settings" ListArray={Settings} />
              </div>
            </div>
            <div className="flex">
              {EmployeeRoute?.filter((route) => route?.defaultPath == true)
                ?.sort((a, b) => a.rang - b.rang)
                ?.map(
                  ({ rang, label, path, defaultPath }: EmployeRoutesType) =>
                    defaultPath && (
                      <Link
                        key={rang}
                        href={path(employeeId)}
                        className={
                          "flex items-center justify-center overflow-hidden rounded-t-md p-3 px-6 capitalize text-white transition ease-in-out " +
                          (ActiveRoute == label
                            ? `bg-white font-bold !text-color-primary-9 `
                            : `font-normal hover:bg-gray-24`)
                        }
                      >
                        {label}
                      </Link>
                    ),
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="items-stretc flex h-full w-full grow pl-[12%] pr-[15%]">
        <UserInfo />
        {children}
      </div>
      <Footer />
    </div>
  );
}
function Footer() {
  return (
    <footer className=" flex w-full flex-row items-center justify-evenly  border-t-[2px] border-t-gray-14 px-48 py-7">
      <div className="flex flex-row gap-2 text-sm font-light text-gray-21 no-underline">
        <Link
          href="#"
          className="cursor-pointer hover:text-color-primary hover:underline"
        >
          Privacy Policy
        </Link>
        <strong className="-mt-2 text-center text-lg">.</strong>
        <Link
          href="#"
          className="cursor-pointer hover:text-color-primary hover:underline"
        >
          Terms of Service
        </Link>
      </div>
      <Link
        className="relative font-bold text-gray-21 "
        href={"/"}
        target="_blank"
      >
        <span className="mr-2">SoftyHR</span>
        <span className="absolute right-0 top-0 text-[0.5rem]">®</span>
      </Link>
    </footer>
  );
}
