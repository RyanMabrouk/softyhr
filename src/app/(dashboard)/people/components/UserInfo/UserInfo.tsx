"use client";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { BsSignpostFill } from "react-icons/bs";
import { MdOutlineHomeWork, MdPhoneAndroid } from "react-icons/md";
import {
  FaFacebookSquare,
  FaHashtag,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { FaMapLocation } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import useData from "@/hooks/useData";
import { formatCustomDate } from "@/helpers/Formatdate";
import { updateTime } from "@/helpers/date.helpers";
import useEmployeeData from "@/hooks/useEmloyeeData";

interface UserInfoPropsType {
  employeeId: string;
}
function UserInfo({ employeeId }: UserInfoPropsType) {
  const { employee_profile: data } = useEmployeeData({ employeeId });
  const user = data?.data;
  if(!data?.data) return;
  return (
    <div className="mb-0 flex max-w-[14rem] grow flex-col items-start justify-center gap-[0.5rem] bg-gray-14 pt-4 ">
      <div className="mt-10 flex flex-col gap-[1rem] px-6">
        <div className=" flex flex-col items-start  justify-center gap-[0.5rem]">
          <div className="flex items-center justify-start gap-[1rem] whitespace-nowrap text-sm text-gray-15">
            <MdOutlineHomeWork fill="gray" />
            <span className="text-sm">{user?.Contact?.["Work Phone"]}</span>
          </div>
          <div className="flex items-center justify-start gap-[1rem] whitespace-nowrap text-gray-15">
            <MdPhoneAndroid fill="gray" />
            <span className="text-sm">{user?.Contact?.["Mobile Phone"]}</span>
          </div>
          <div className="flex items-center justify-start gap-[1rem] whitespace-nowrap text-gray-15">
            <CiMail fill="gray" />
            <span className="text-sm">{user?.Contact?.["Work Email"]}</span>
          </div>
        </div>
        <div className="flex items-center justify-start gap-[1rem] whitespace-nowrap text-gray-15">
          <FaLinkedin fill="gray" />
          <FaTwitter fill="gray" />
          <FaFacebookSquare fill="gray" />
          <FaPinterest fill="gray" />
          <FaTwitter fill="gray" />
        </div>
        <div className="h-px w-full  self-center bg-gray-16" />
        <div className=" flex flex-col gap-[0.3rem]">
          <h1 className="text-sm text-color-primary-7">Hiring Date</h1>
          <h1 className="text-500 text-sm font-bold text-gray-15">
            {formatCustomDate(user?.Hiring?.["Hire Date"]) || ""}
          </h1>
          <h1 className="text-sm font-medium text-gray-13">3y - 19d</h1>
        </div>
        <div className="h-px w-full  self-center bg-gray-16" />
        <div className="flex flex-col items-start justify-center gap-[0.5rem]">
          <div className="flex items-center justify-start gap-[1REM] text-gray-15">
            <FaHashtag fill="gray" />
            <span>{user?.["Basic Information"]?.Employee}</span>
          </div>
          <div className="flex items-center justify-start gap-[1REM] text-sm font-normal text-gray-15">
            <BsSignpostFill fill="gray" />
            <span>
              {
                user?.["Employment Status"]?.sort(
                  (a: any, b: any) =>
                    new Date(a?.Date || a?.["Effective Date"]).getTime() -
                    new Date(b?.Date || b?.["Effective Date"]).getTime(),
                )[user?.["Employment Status"].length - 1]?.["Employment Status"]
              }
            </span>
          </div>
          <div className="flex items-center justify-start gap-[1REM] text-sm  font-normal text-gray-15">
            <IoIosPeople fill="gray" />
            <span>Operations</span>
          </div>
          <div className="flex items-center justify-start gap-[1REM] text-sm font-normal text-gray-15">
            <FaMapLocation fill="gray" />
            <span>{user?.Address?.Country || ""}</span>
          </div>
          <div className="flex items-center justify-start gap-[1REM] text-sm  font-normal text-gray-15">
            <IoLocationSharp fill="gray" />
            <span>
              {user?.Address?.State || "" + ", " + user?.Address?.City || ""}
            </span>
          </div>
          <div className="flex items-center justify-start gap-[1REM] text-sm  font-normal text-gray-15">
            <CiClock2 fill="gray" />
            <span>{updateTime()} Local Time</span>
          </div>
        </div>
        <div className="h-px w-full  self-center bg-gray-16" />
        <div className="flex flex-col items-start justify-center gap-[0.5rem]">
          <h1 className="text-sm text-color-primary-7">Rapports directs</h1>
          <div className="flex items-center justify-start gap-[1rem]">
            <CgProfile fill="gray" />
            <h1 className="cursor-pointer text-sm font-normal text-gray-15 underline-offset-1 hover:underline">
              maja andev
            </h1>
          </div>
          <div className="flex items-center justify-start gap-[1rem]">
            <CgProfile fill="gray" />
            <h1 className="cursor-pointer text-sm font-normal text-gray-15 underline-offset-1 hover:underline">
              maja andev
            </h1>
          </div>
          <div className="flex items-center justify-start gap-[1rem]">
            <CgProfile fill="gray" />
            <h1 className="cursor-pointer text-sm font-normal text-gray-15 underline-offset-1 hover:underline">
              maja andev
            </h1>
          </div>
          <div className="flex items-center justify-start gap-[1rem]">
            <CgProfile fill="gray" />
            <h1 className="cursor-pointer text-sm font-normal text-gray-15 underline-offset-1 hover:underline">
              maja andev
            </h1>
          </div>
          <div className="flex items-center justify-start gap-[1rem]">
            <CgProfile fill="gray" />
            <h1 className="cursor-pointer text-sm font-normal text-gray-15 underline-offset-1 hover:underline">
              maja andev
            </h1>
          </div>
        </div>
      </div>
      <div className="h-full"></div>
    </div>
  );
}

export default UserInfo;
