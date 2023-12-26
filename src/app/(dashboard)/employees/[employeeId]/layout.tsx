"use client";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import AvatarUser from "./download (7).jpeg";
import Link from "next/link";
import { EmployeRoutesType, EmployeeRoute } from "@/constants/employeeRoute";
import { usePathname } from "next/navigation";
import UserInfo from "../components/UserInfo/UserInfo";
import DropDown from "../components/DropDown/DropDown";
import { Settings, changementRequest } from "@/constants/userInfo";
import useScrollPosition from "@/hooks/useScrollPosition";

interface EmployePropsType {
  params: { employeeId: string };
  children: ReactNode;
}

function Layout({ params: { employeeId }, children }: EmployePropsType) {
  const ActiveRoute =
    usePathname().split("/").slice(-1).join("") || EmployeeRoute[0]?.label;
  const [ScrollPosition] = useScrollPosition();
  return (
    <div className="h-full w-full">
      <div
        className={
          "border-10 duration-400 z-50 flex h-[13rem] justify-center bg-gradient-to-r  from-color-green-7 to-color-green-9 transition-all "
        }
      >
        <div
          className={
            "flex w-9/12 items-end justify-start gap-[4.7rem] " 
          }
        >
          <Image
            src={AvatarUser}
            alt="user-name"
            className={
              "border-10 z-10 -mb-9 h-[13rem] w-[13rem] cursor-pointer rounded-full border-2 border-white bg-gray-6 object-cover "
            }
          />
          <div
            className={
              "flex-column flex w-full flex-col gap-[4rem] " 
            }
          >
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-white">Ali Ben Romdhan</h1>
              <div
                className={
                  "flex h-10 gap-[3rem] "
                }
              >
                <DropDown
                  text="Demander un Changement"
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
                          "flex items-center justify-center overflow-hidden rounded-t-lg p-3 px-6 text-white transition ease-in-out " +
                          (ActiveRoute == label
                            ? `bg-white font-bold !text-color-green-9 `
                            : `font-normal hover:bg-fabric-100 hover:opacity-25`) 
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
      <div className="flex w-full items-center justify-center ">
        <div className="gap flex h-full w-9/12 items-start justify-start gap-[2rem]">
          <UserInfo />
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
