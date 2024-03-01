"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { EmployeRoutesType, EmployeeRoute } from "@/constants/employeeRoute";
import { useParams, usePathname } from "next/navigation";
import { Settings } from "@/constants/userInfo";
import useEmployeeData from "@/hooks/useEmloyeeData";
import { MdEdit } from "react-icons/md";
import avatar from "/public/default_avatar.png";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import { IoMdSettings } from "react-icons/io";
import RoleGuard from "@/app/_ui/RoleGuard";
import DropDownGeneric from "@/app/_ui/DropDownGeneric";

export function Content() {
  const { employeeId } = useParams();
  const {
    employee_profile: { data: user },
  } = useEmployeeData({ employeeId: String(employeeId) });
  const pathname = usePathname();
  
  return (
    <div className="z-20 flex min-h-[13rem] justify-center bg-gradient-to-r from-color-primary-7  to-color-primary-9 transition-all duration-300 ">
      <div className={"flex w-9/12 items-end justify-start gap-[4rem] "}>
        <Link href="?popup=EDIT_PROFILE_IMAGE" className="group  relative">
          <div className="z-10 -mb-9 h-[13rem] w-[13rem] rounded-full border-color-primary-2  active:border-2">
            <Image
              src={user?.picture ?? avatar}
              alt="user-name"
              layout="responsive"
              priority
              width={208}
              height={208}
              className="h-full  w-full cursor-pointer rounded-full border-4 border-white bg-gray-6 object-cover"
            />
          </div>
          <div className="absolute -bottom-4 right-0 z-40  flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border-2 border-white bg-color-primary-8 opacity-0 duration-150 ease-in-out group-hover:!opacity-100">
            <MdEdit className="text-2xl !text-white" />
          </div>
        </Link>
        <div className={"flex-column flex w-full flex-col gap-[3rem] "}>
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold text-white">
              {user?.["Basic Information"]?.["First name"] +
                " " +
                user?.["Basic Information"]?.["Last name"]}
            </h1>
            <div className={"flex h-10 gap-[1rem] "}>
              <DropDownGeneric
                options={[]}
                DropDownButton={()=>{
                  
                }}
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
                ({
                  rang,
                  label,
                  path,
                  defaultPath,
                  RoleGuard: { strict, permissions },
                }: EmployeRoutesType) =>
                  defaultPath && (
                    <RoleGuard
                      key={rang}
                      permissions={permissions}
                      strict={strict}
                    >
                      <Link
                        href={path(employeeId as string)}
                        className={
                          "flex items-center justify-center overflow-hidden rounded-t-md p-3 px-6 font-bold text-white transition ease-in-out first-letter:capitalize " +
                          (pathname.includes(path(employeeId as string))
                            ? `bg-white !text-color-primary-9 `
                            : ` hover:bg-gray-24`)
                        }
                      >
                        {label}
                      </Link>
                    </RoleGuard>
                  ),
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
