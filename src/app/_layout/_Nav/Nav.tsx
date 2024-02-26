"use client";
import { LayoutRouteType, LayoutRoute } from "@/constants/LayoutRoute";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import companyLogo from "/public/cropped (2).jpg";
import { useParams, usePathname } from "next/navigation";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import SearchBar from "../_SearchBar/SearchBar";
import useData from "@/hooks/useData";
import { database_profile_type } from "@/types/database.tables.types";
import { UserProfile } from "./UserProfile";
import { Inbox } from "./Inbox/Inbox";

export default function Nav() {
  const { employeeId: paramsid } = useParams();
  const currentPath = usePathname();
  const {
    user_profile: { data: user },
  }: {
    user_profile: { data: database_profile_type | undefined };
  } = useData();
  const employeeId = paramsid ? paramsid : user?.user_id;
  return (
    <>
      <nav className="flex h-20 w-screen flex-row items-center justify-between gap-[2rem] bg-gray-17 pl-14 pr-10 max-xl:pl-6 max-xl:pr-6">
        <div className="flex min-h-full flex-row items-center gap-2">
          <Image
            className="cursor-pointer"
            alt="company logo"
            src={companyLogo}
            priority
          />
          <div className="flex h-full items-center justify-center ">
            {LayoutRoute?.map(
              (
                { label, pathFn, defaultPath }: LayoutRouteType,
                index: number,
              ) => {
                const isActive = pathFn(currentPath, String(employeeId));
                return (
                  <Link
                    key={index}
                    className={`flex h-20 items-center justify-center px-6 capitalize max-xl:text-[0.75rem] max-xl:px-3 text-gray-9 transition delay-75 ease-in-out hover:bg-gray-14 ${isActive ? "bg-gray-14 font-bold !text-fabric-700" : ""}`}
                    href={defaultPath ? defaultPath(employeeId as string) : ""}
                  >
                    {label}
                  </Link>
                );
              },
            )}
          </div>
        </div>
        <div className="flex h-full flex-row items-center gap-8">
          <SearchBar />
          <div className="flex flex-row items-center gap-3">
            <Inbox />
            <BsFillQuestionCircleFill className="h-7 w-7 min-w-7 min-h-7 cursor-pointer font-bold text-gray-15  transition-all ease-linear hover:text-fabric-700" />
            <Link href={"/Settings"}>
              <IoMdSettings
                className={`h-8 w-8 cursor-pointer font-bold  text-gray-15 transition-all ease-linear hover:text-fabric-700 ${currentPath.includes("/Settings") ? "text-fabric-700" : ""}`}
              />
            </Link>
            <UserProfile />
          </div>
        </div>
      </nav>
      <hr className="h-[3px] w-screen bg-primary-gradient" />
    </>
  );
}
