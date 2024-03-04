"use client";
import { Footer } from "@/app/_ui/Footer";
import RoleGuard from "@/app/_ui/RoleGuard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { BsFillStopwatchFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { FaLock, FaWrench } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoFileTrayFull } from "react-icons/io5";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const pathname = usePathname();
  const settings = [
    {
      label: "Account",
      path: "/Settings/Account",
      icon: <FaWrench className="h-4 w-4" />,
      permissions: [],
    },
    {
      label: "Time Off",
      path: "/Settings/TimeOff",
      icon: <BsFillStopwatchFill className="h-5 w-5" />,
      permissions: ["access:/Settings/TimeOff"],
    },
    {
      label: "Access Levels",
      path: "/Settings/AccessLevels",
      icon: <FaLock className="h-4 w-4" />,
      permissions: ["access:/Settings/AccessLevels"],
    },
    {
      label: "Hiring",
      path: "/Settings/Jobs",
      icon: <CgNotes  className="h-4 w-4" />,
      permissions: ["access:/Settings/Jobs"],
    },
    /*{
      label: "Approvals",
      path: "/Settings/Approvals",
      icon: <AiFillLike className="h-5 w-5" />,
      permissions: [],
    },*/
  ];
  return (
    <>
      <div className="mx-[auto] flex h-full w-full max-w-[80rem] flex-col justify-center pt-5">
        <header className="mb-3 flex flex-row items-center justify-start gap-2">
          <IoMdSettings
            className={`h-9 w-9 cursor-pointer font-bold  text-fabric-700 transition-all ease-linear`}
          />
          <span className="text-3xl font-semibold text-fabric-700">
            Settings
          </span>
        </header>
        <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
        <main className=" flex flex-row ">
          <nav className="mb-0 flex min-h-screen min-w-[16rem] max-w-[16rem] grow flex-col bg-gray-14  px-5 py-4 ">
            {settings.map(({ label, path, icon, permissions }, index) => (
              <RoleGuard permissions={permissions} key={"settings" + index}>
                <Link
                  className={`flex flex-row items-center justify-start rounded-sm px-3 py-2 capitalize text-gray-21 no-underline transition-all  ease-linear hover:bg-white hover:text-fabric-700 ${pathname.includes(path) ? "font-bold !text-fabric-700" : ""}`}
                  href={path}
                >
                  {icon}
                  <span className="ml-2">{label}</span>
                </Link>
                {index === 0 && (
                  <hr className="my-2 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
                )}
              </RoleGuard>
            ))}
          </nav>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
