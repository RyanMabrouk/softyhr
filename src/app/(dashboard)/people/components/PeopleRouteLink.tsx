"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiSolidContact } from "react-icons/bi";
import { RiOrganizationChart } from "react-icons/ri";
import { TbMenu2 } from "react-icons/tb";

export default function PeopleRouteLink({ href }: any) {
  const pathname = usePathname();
  const titleIconObj: any = {
    "/people/list": {
      label: "List",
      icon: <TbMenu2 fontSize="1.4rem" />,
    },
    "/people/directory": {
      label: "Directory",
      icon: <BiSolidContact fontSize="1.4rem" />,
    },
    "/people/orgchart": {
      label: "Org Chart",
      icon: <RiOrganizationChart fontSize="1.4rem" />,
    },
  };
  return (
    <Link
      className={`group -mb-4 flex gap-1 border-b-[3px] border-b-transparent pb-4 transition-all ease-linear hover:border-fabric-700  hover:text-fabric-700 ${pathname === href ? " border-b-[3px] !border-fabric-700 text-fabric-700" : "text-gray-10"}`}
      href={href}
    >
      {titleIconObj?.[href]?.icon}
      <p
        className={`transition-all ease-linear group-hover:text-fabric-700 font-semibold ${pathname === href ? " text-fabric-700" : "text-gray-10"}`}
      >
        {titleIconObj?.[href]?.label}
      </p>
    </Link>
  );
}
