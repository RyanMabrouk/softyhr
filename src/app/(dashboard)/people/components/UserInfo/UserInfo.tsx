"use client";
import React from "react";
import { CiMail } from "react-icons/ci";
import { BsSignpostFill, BsTwitterX } from "react-icons/bs";
import { MdOutlineHomeWork, MdPhoneAndroid } from "react-icons/md";
import {
  FaFacebookSquare,
  FaHashtag,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { FaMapLocation } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import {
  YearsAndDaysSinceDate,
  formatCustomDate,
  formatDateToDayMonDD,
  updateTime,
} from "@/helpers/date.helpers";
import useEmployeeData from "@/hooks/useEmloyeeData";
import {
  database_leave_policies_type,
  database_leave_requests_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { generateLeaveCategorieIcon } from "@/helpers/TimeOff/leave.helpers";
import { UnderlinedLink } from "@/app/_ui/UnderlinedLink";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";
import ManagerSection from "./components/managerSection";

interface UserInfoPropsType {
  employeeId: string;
}
export default function UserInfo({ employeeId }: UserInfoPropsType) {
  const {
    leave_categories: { data: leave_categories },
    leave_policies: { data: leave_policies },
  } = useLeaveData();
  const {
    employee_profile: { data: user },
    leave_requests: { data: leave_requests },
  } = useEmployeeData({ employeeId: employeeId });
  // chekck if the user is on vacation
  const current_vacation = leave_requests?.find(
    (request: database_leave_requests_type) =>
      new Date(request.start_at) < new Date() &&
      new Date(request.end_at) > new Date() &&
      request.status === "approved",
  );
  // get the policy of the current vacation
  const policy: database_leave_policies_type = current_vacation
    ? leave_policies?.find(
        (p: database_leave_policies_type) =>
          p.id === current_vacation?.policy_id,
      )
    : null;
  // get the category of the current vacation
  const category = current_vacation
    ? leave_categories?.find(
        (c: databese_leave_categories_type) => c.id == policy?.categories_id,
      )
    : null;
  // generate the icon of the current vacation
  const icon = generateLeaveCategorieIcon({
    categorie: category,
    className: "w-14 h-14 -mt-1",
  });

  return (
    <div className="mb-0 flex w-[14.5rem] grow flex-col items-start justify-center gap-[0.5rem] bg-gray-14 pt-4 ">
      {current_vacation && (
        <header className="-mb-5 flex w-full flex-row items-center justify-center gap-1 border-b-[10px] border-white px-6 pb-3 pt-7 leading-4">
          <div>{icon}</div>
          <div className="flex flex-col justify-center text-lg leading-5">
            <div>{`Out Until ${formatDateToDayMonDD(new Date(current_vacation?.start_at))}`}</div>
            <div className="text-[0.8rem] opacity-65">{category?.name}</div>
          </div>
        </header>
      )}
      <div className="mt-10 flex flex-col gap-[1rem] px-5">
        <div className=" flex flex-col items-start  justify-center gap-3">
          <div className="flex items-center justify-start gap-2 whitespace-nowrap text-sm text-gray-15">
            <MdOutlineHomeWork className="text-gray cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
            <span className="text-sm">
              {user?.Contact?.["Work Phone"] || "No Work Phone"}
            </span>
          </div>
          <div className="flex items-center justify-start gap-2 whitespace-nowrap text-gray-15">
            <MdPhoneAndroid className="text-gray cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
            <span className="text-sm">
              {user?.Contact?.["Mobile Phone"] || "No Mobile Phone"}
            </span>
          </div>
          <div className="flex items-center justify-start gap-2 whitespace-nowrap text-gray-15">
            <CiMail className="text-gray cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
            <span className="text-sm">{user?.Contact?.["Work Email"]}</span>
          </div>
        </div>
        <div className="-ml-4 flex flex-row items-center justify-evenly whitespace-nowrap text-gray-15">
          <a
            href={
              user?.["Social Links"]?.LinkedIn || "https://www.linkedin.com/"
            }
          >
            <FaLinkedin className="text-gray cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
          </a>
          <a
            href={
              user?.["Social Links"]?.Facebook || "https://www.Facebook.com/"
            }
          >
            <FaFacebookSquare className="text-gray cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
          </a>
          <a
            href={
              user?.["Social Links"]?.Pinterest || "https://www.Pinterest.com"
            }
          >
            <FaPinterest className="text-gray cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
          </a>
          <a
            href={user?.["Social Links"]?.Twitter || "https://www.linkedin.com"}
          >
            <BsTwitterX className="text-gray cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
          </a>
          <a
            href={
              user?.["Social Links"]?.Instagram || "https://www.instagram.com"
            }
          >
            <FaInstagram className="text-gray cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
          </a>
        </div>
        <div className="h-px w-full  self-center bg-gray-16" />
        <div className=" flex flex-col gap-[0.3rem]">
          <h1 className="text-sm text-color-primary-7">Hiring Date</h1>
          <h1 className="text-500 text-sm font-bold text-gray-15">
            {formatCustomDate(user?.Job?.["Hire Date"]) || "0000-00-00"}
          </h1>
          <h1 className="text-sm font-medium text-gray-13">
            {YearsAndDaysSinceDate(new Date(user?.Job?.["Hire Date"])) ||
              "0000-00-00"}
          </h1>
        </div>
        <div className="h-px w-full  self-center bg-gray-16" />
        <div className="flex flex-col items-start justify-center gap-[0.5rem]">
          {user?.["Basic Information"] && (
            <div className="flex items-center justify-start gap-[1REM] text-gray-15">
              <FaHashtag className="cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
              <span>{user?.["Basic Information"]?.Employee}</span>
            </div>
          )}
          {user?.["Employment Status"] && (
            <div className="flex items-center justify-start gap-[1REM] text-sm font-normal text-gray-15">
              <BsSignpostFill className="cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
              <span>
                {
                  user?.["Employment Status"]?.sort(
                    (a: any, b: any) =>
                      new Date(a?.Date || a?.["Effective Date"]).getTime() -
                      new Date(b?.Date || b?.["Effective Date"]).getTime(),
                  )[user?.["Employment Status"].length - 1]?.[
                    "Employment Status"
                  ]
                }
              </span>
            </div>
          )}
          <div className="flex items-center justify-start gap-[1REM] text-sm  font-normal text-gray-15">
            <IoIosPeople className="cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
            <span>Operations</span>
          </div>
          {user?.Address?.Country && (
            <div className="flex items-center justify-start gap-[1REM] text-sm font-normal text-gray-15">
              <FaMapLocation className="cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
              <span>{user?.Address?.Country || ""}</span>
            </div>
          )}
          {user?.Address?.State && user?.Address?.City && (
            <div className="flex items-center justify-start gap-[1REM] text-sm  font-normal text-gray-15">
              <IoLocationSharp className="cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
              <span>
                {user?.Address?.State || "" + ", " + user?.Address?.City || ""}
              </span>
            </div>
          )}
          <div className="flex items-center justify-start gap-[1REM] text-sm  font-normal text-gray-15">
            <CiClock2 className="cursor-pointer duration-200 ease-in-out hover:!text-color-primary-8" />
            <time suppressHydrationWarning>{updateTime()} Local Time</time>
          </div>
        </div>
        <div className="h-px w-full  self-center bg-gray-16" />
        <ManagerSection user={user} />
        <div className="flex flex-col items-start justify-center gap-[0.5rem]">
          <h1 className="text-sm text-color-primary-7">Rapports directs</h1>
          <UnderlinedLink>
            <CgProfile className="text-gray-15" />
            <h1 className="cursor-pointer text-sm font-normal text-gray-15 underline-offset-1 hover:underline">
              Employee Name
            </h1>
          </UnderlinedLink>
        </div>
      </div>
      <div className="h-full"></div>
    </div>
  );
}
