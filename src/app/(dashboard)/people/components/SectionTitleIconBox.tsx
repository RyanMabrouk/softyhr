"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { BiSolidContact } from "react-icons/bi";
import { RiOrganizationChart } from "react-icons/ri";
import { TbMenu2 } from "react-icons/tb";

export default function SectionTitleIconBox() {
  const pathname = usePathname();

  const titleIconObj: any = {
    "/people/list": {
      label: "People",
      icon: <TbMenu2 fontSize="2.4rem" stroke="#527A01" />,
    },
    "/people/directory": {
      label: "Directory",
      icon: <BiSolidContact fontSize="2.4rem" fill="#527A01" />,
    },
    "/people/orgchart": {
      label: "Org Chart",
      icon: <RiOrganizationChart fontSize="2.4rem" fill="#527A01" />,
    },
  };

  return (
    <div className="-ml-2 flex items-center gap-2 ">
      {titleIconObj[pathname].icon}
      <p className="text-3xl font-semibold text-color-primary-8">
        {titleIconObj[pathname].label}
      </p>
    </div>
  );
}
