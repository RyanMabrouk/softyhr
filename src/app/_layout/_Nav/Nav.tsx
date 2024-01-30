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
import defaultAvatar from "/public/default_avatar.jpeg";
import { FaInbox } from "react-icons/fa6";
import useData from "@/hooks/useData";
import { database_profile_type } from "@/types/database.tables.types";
import signout from "@/actions/auth/signout";

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
      <nav className="flex h-20 flex-row items-center justify-between gap-[2rem] bg-gray-17 pl-14 pr-10">
        <div className="flex min-h-full flex-row items-center gap-2">
          <Image
            className="cursor-pointer"
            alt="company logo"
            src={companyLogo}
            priority
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
                      "flex h-20 items-center justify-center px-6 capitalize text-gray-9 transition delay-75 ease-in-out hover:bg-gray-14 " +
                      (isActive ? "bg-gray-14 font-bold !text-fabric-700" : "")
                    }
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
            <div className="relative mr-1">
              <FaInbox className="h-7 w-7 cursor-pointer font-bold text-gray-15 transition-all ease-linear hover:text-fabric-700" />
              <div className="absolute right-[-30%] top-[-25%] flex h-6 w-6 cursor-default items-center justify-center rounded-full border-2 border-gray-17 bg-fabric-700 px-1 text-center text-[0.70rem] text-white">
                <span>50</span>
              </div>
            </div>
            <BsFillQuestionCircleFill className="h-7 w-7 cursor-pointer font-bold text-gray-15  transition-all ease-linear hover:text-fabric-700" />
            <Link href={"/Settings"}>
              <IoMdSettings
                className={`h-8 w-8 cursor-pointer font-bold  text-gray-15 transition-all ease-linear hover:text-fabric-700 ${currentPath.includes("/Settings") ? "text-fabric-700" : ""}`}
              />
            </Link>
            <UserProfile />
          </div>
        </div>
      </nav>
      <hr className="h-[3px] w-full bg-primary-gradient" />
    </>
  );
}
function UserProfile() {
  const [toggleView, setToggleView] = React.useState(false);
  const {
    user_profile: { data: user },
  }: {
    user_profile: { data: any | undefined };
  } = useData();
  const full_name =
    user?.["Basic Information"]?.["First name"] +
    " " +
    user?.["Basic Information"]?.["Last name"];
  return (
    <div className="relative">
      <Image
        onClick={() => setToggleView((old) => !old)}
        className="h-8 w-8 cursor-pointer rounded-full"
        src={user?.picture ?? defaultAvatar}
        alt=""
        priority
        width={80}
        height={80}
      />
      {toggleView && (
        <div className="shadow-green absolute right-0 top-[135%] z-50 h-fit w-max min-w-[17.5rem] overflow-clip rounded-md bg-white">
          <div className="mx-auto flex w-full flex-row items-start gap-3 rounded-t-md bg-gray-14 px-3 py-4">
            <Image
              src={user?.picture ?? defaultAvatar}
              alt="user-name"
              priority
              width={80}
              height={80}
              className="h-20 w-20 cursor-pointer rounded-full border border-white bg-gray-6 object-cover text-white"
            />
            <div className="flex flex-col gap-1">
              <div className=" text-xl font-bold capitalize text-black">
                {full_name}
              </div>
              <Link
                className=" w-fit rounded-md bg-fabric-700  px-2 py-1 text-sm font-medium text-white"
                onClick={() => setToggleView((old) => !old)}
                href={{
                  pathname: `/people/${user?.user_id}/personnal`,
                }}
              >
                My info
              </Link>
            </div>
          </div>
          <main
            className="flex flex-col justify-center rounded-b-md text-sm text-gray-27"
            role="button"
          >
            <Link
              onClick={() => setToggleView((old) => !old)}
              className="border-t bg-white px-3 py-2 text-base hover:bg-fabric-700 hover:text-white"
              href={"/Settings/Account"}
            >
              Account settings
            </Link>
            <form
              action={() => {
                setToggleView((old) => !old);
                signout();
              }}
            >
              <button
                className="w-full cursor-pointer border-t bg-white px-3 py-2 text-left text-base hover:bg-fabric-700 hover:text-white"
                type="submit"
              >
                Log out
              </button>
            </form>
          </main>
        </div>
      )}
    </div>
  );
}
