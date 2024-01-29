"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { BiSolidContact } from "react-icons/bi";
import { RiOrganizationChart } from "react-icons/ri";
import { TbMenu2 } from "react-icons/tb";

export default function SectionTitleIconBox() {
  const pathname = usePathname();
  const titleIconObj = [
    {
      path: "/people/list",
      label: "People",
      icon: <TbMenu2 className="text-[2.4rem] text-fabric-700" />,
    },
    {
      path: "/people/directory",
      label: "Directory",
      icon: <BiSolidContact className="text-[2.4rem] text-fabric-700" />,
    },
    {
      path: "/people/orgchart",
      label: "Org Chart",
      icon: <RiOrganizationChart className="text-[2.4rem] text-fabric-700" />,
    },
  ];

  return (
    <div className="-ml-2 flex items-center gap-2 ">
      {titleIconObj[pathname].icon}
      <p className="text-3xl font-semibold text-color-primary-8">
        {titleIconObj[pathname].label}
      </p>
    </div>
  );
}
