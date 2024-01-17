"use client";
import { LayoutRouteType, LayoutRoute } from "@/constants/LayoutRoute";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import companyLogo from "/public/cropped (2).jpg";
import { usePathname } from "next/navigation";
import useEmployeeData from "@/hooks/useEmloyeeData";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import SearchBar from "../_SearchBar/SearchBar";
import defaultAvatar from "/public/default_avatar.jpeg";
import { FaInbox } from "react-icons/fa6";
import useData from "@/hooks/useData";

interface NavPropsType {
  employeeId: string;
}

export default function Nav({ employeeId }: NavPropsType) {
  const currentPath = usePathname();
  const { user_profile:{ data } } = useData(); 
  return (
    <>
      <nav className="flex h-20 flex-row items-center justify-between gap-[2rem] bg-gray-17 pl-14 pr-10">
        <div className="flex h-full flex-row items-center gap-2">
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
                      (isActive ? "bg-gray-14 font-bold !text-fabric-700" : "")
                    }
                    href={defaultPath ? defaultPath(employeeId) : ""}
                  >
                    {label}
                  </Link>
                );
              },
            )}
          </div>
        </div>

        <div className="flex flex-row items-center gap-8">
          <SearchBar />
          <div className="flex flex-row items-center gap-3">
            <div className="relative">
              <FaInbox className="h-7 w-7 cursor-pointer font-bold text-gray-15 transition-all ease-linear hover:text-fabric-700" />
              <div className="absolute right-[-30%] top-[-25%] flex h-6 w-6 cursor-default items-center justify-center rounded-full border-2 border-gray-17 bg-fabric-700 px-1 text-center text-[0.70rem] text-white">
                <span>50</span>
              </div>
            </div>
            <BsFillQuestionCircleFill className="h-7 w-7 cursor-pointer font-bold text-gray-15  transition-all ease-linear hover:text-fabric-700" />
            <Link href={"/Settings"}>
              <IoMdSettings
                className={`h-8 w-8 cursor-pointer font-bold  text-gray-15 transition-all ease-linear hover:text-fabric-700 ${currentPath.includes("/Settings") && "text-fabric-700"}`}
              />
            </Link>
            <Image
              className="h-7 w-7 rounded-full"
              src={defaultAvatar}
              alt=""
            />
          </div>
        </div>
      </nav>
      <hr className="h-[3px] w-full bg-primary-gradient" />
    </>
  );
}
