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
      icon: <TbMenu2 className="#527A01 text-[2.4rem]" />,
    },
    {
      path: "/people/directory",
      label: "Directory",
      icon: <BiSolidContact className="#527A01 text-[2.4rem]" />,
    },
    {
      path: "/people/orgchart",
      label: "Org Chart",
      icon: <RiOrganizationChart className="#527A01 text-[2.4rem]" />,
    },
  ];

  return (
    <div className="-ml-2 flex items-center gap-2 ">
      {titleIconObj.find((item) => pathname?.includes(item.path))?.icon ?? (
        <></>
      )}
      <p className="text-3xl font-semibold text-color-primary-8">
        {titleIconObj.find((item) => pathname?.includes(item.path))?.label ?? (
          <></>
        )}
      </p>
    </div>
  );
}
