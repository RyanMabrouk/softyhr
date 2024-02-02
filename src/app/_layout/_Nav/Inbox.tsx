"use client";
import Link from "next/link";
import React from "react";
import { FaInbox } from "react-icons/fa6";
import RoleGuard from "@/app/_ui/RoleGuard";

export function Inbox() {
  const [toggleView, setToggleView] = React.useState(false);
  const links = [
    {
      label: "Time Off requests",
      path: "/inbox/TimeOffRequests",
      permissions: ["accept:leave_requests", "deny:leave_requests"],
    },
  ];
  return (
    <div className="relative">
      <div
        className="relative mr-1"
        role="button"
        onClick={() => setToggleView((old) => !old)}
      >
        <FaInbox className="h-7 w-7 cursor-pointer font-bold text-gray-15 transition-all ease-linear hover:text-fabric-700" />
        <div className="absolute right-[-30%] top-[-25%] flex h-6 w-6 cursor-default items-center justify-center rounded-full border-2 border-gray-17 bg-fabric-700 px-1 text-center text-[0.70rem] text-white">
          <span>0</span>
        </div>
      </div>
      {toggleView && (
        <div className="shadow-green absolute right-0 top-[135%] z-50 h-fit w-max min-w-[12.5rem] overflow-clip rounded-md bg-white">
          <Link
            href={"/inbox"}
            className="group flex cursor-pointer flex-row items-center gap-1 px-3 py-2 font-bold text-gray-27 transition-all ease-linear hover:bg-fabric-700 hover:text-white"
            onClick={() => setToggleView((old) => !old)}
          >
            <FaInbox className="h-5 w-5 text-fabric-700 group-hover:text-white" />
            <span>Inbox</span>
          </Link>
          <main
            className="flex flex-col justify-center rounded-b-md text-sm text-gray-27 transition-all ease-linear"
            role="button"
          >
            {links.map((link, index) => (
              <RoleGuard
                permissions={link.permissions}
                key={"inbox_link" + index}
              >
                <Link
                  onClick={() => setToggleView((old) => !old)}
                  className="border-t bg-white px-3 py-2 text-base text-gray-27 transition-all ease-linear hover:bg-fabric-700 hover:text-white"
                  href={link.path}
                >
                  {link.label}
                </Link>
              </RoleGuard>
            ))}
          </main>
        </div>
      )}
    </div>
  );
}
