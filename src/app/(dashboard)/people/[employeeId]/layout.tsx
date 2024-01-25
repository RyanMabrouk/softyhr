"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import Link from "next/link";
import { EmployeRoutesType, EmployeeRoute } from "@/constants/employeeRoute";
import { usePathname } from "next/navigation";
import UserInfo from "../components/UserInfo/UserInfo";
import { Settings, changementRequest } from "@/constants/userInfo";
import useEmployeeData from "@/hooks/useEmloyeeData";
import { MdEdit } from "react-icons/md";
import avatar from "./avatar.png";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import { IoMdSettings } from "react-icons/io";
import { Footer } from "@/app/_ui/Footer";
import Initialize from "@/provider/Initilize";
interface EmployePropsType {
  params: { employeeId: string };
  children: ReactNode;
}
export default function Layout({
  params: { employeeId },
  children,
}: EmployePropsType) {
  const { employee_profile: data } = useEmployeeData({ employeeId });
  const ActiveRoute =
    usePathname().split("/").slice(-1).join("") || EmployeeRoute[0]?.label;
  return (
    <Initialize>
      <div className="flex h-full w-full flex-col ">
        <div className="z-20 flex h-[13rem] justify-center bg-gradient-to-r from-color-primary-7  to-color-primary-9 transition-all duration-300 ">
          <div className={"flex w-9/12 items-end justify-start gap-[4rem] "}>
            <Link href="?popup=EDIT_PROFILE_IMAGE" className="group  relative">
              <div className="z-10 -mb-9 h-[13rem] w-[13rem] rounded-full border-color-primary-2  active:border-2">
                <Image
                  src={data?.data?.picture || avatar}
                  alt="user-name"
                  priority
                  width={208}
                  height={208}
                  className={
                    "h-full  w-full cursor-pointer rounded-full border-4 border-white bg-gray-6 object-cover"
                  }
                />
              </div>
              <div className="absolute -bottom-4 right-0 z-40  flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border-2 border-white bg-color-primary-8 opacity-0 duration-150 ease-in-out group-hover:!opacity-100">
                <MdEdit className="text-2xl !text-white" />
              </div>
            </Link>
            <div className={"flex-column flex w-full flex-col gap-[3rem] "}>
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold text-white">
                  {data?.data?.["Basic Information"]?.["First name"] +
                    " " +
                    data?.data?.["Basic Information"]?.["Last name"] ||
                    "your name"}
                </h1>
                <div className={"flex h-10 gap-[1rem] "}>
                  <SelectGeneric
                    name="changementRequest"
                    inputLabel="Request a Change"
                    options={changementRequest}
                    className=" !border-[1px] !border-white !text-white"
                    cursor="white"
                  />
                  <SelectGeneric
                    name="settings"
                    inputLabel={<IoMdSettings className="h-6 w-6 text-white" />}
                    options={Settings}
                    className="!w-[4.5rem] !border-[1px] !border-white !text-white"
                    cursor="white"
                  />
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
          <UserInfo employeeId={employeeId} />
          {children}
        </div>
        <Footer />
      </div>
    </Initialize>
  );
}
