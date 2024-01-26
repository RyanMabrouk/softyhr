"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiSolidContact } from "react-icons/bi";
import { RiOrganizationChart } from "react-icons/ri";
import { TbMenu2 } from "react-icons/tb";

export default function PeopleRouteLink({ href }: any) {
  const pathname = usePathname();
  const fill = pathname === href ? "#527A01" : "#676260";
  const titleIconObj: any = {
    "/people/list": {
      label: "List",
      icon: <TbMenu2 fontSize="1.4rem" stroke={fill} />,
    },
    "/people/directory": {
      label: "Directory",
      icon: <BiSolidContact fontSize="1.4rem" fill={fill} />,
    },
    "/people/orgchart": {
      label: "Org Chart",
      icon: <RiOrganizationChart fontSize="1.4rem" fill={fill} />,
    },
  };

  return (
    <Link
      className={` flex gap-1 pb-4 ${pathname === href ? " border-b-2 border-color-primary-8" : ""}`}
      href={href}
    >
      {titleIconObj[href].icon}
      <p
        className={`${pathname === href ? "font-semibold text-color-primary-8" : "text-gray-10"}`}
      >
        {titleIconObj[href].label}
      </p>
    </Link>
  );
}
