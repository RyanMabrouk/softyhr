"use client";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { MenuLinksGeneric } from "@/app/_ui/MenuLinksGeneric";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { VscTriangleDown } from "react-icons/vsc";

export function SettingsBtn() {
  const [open, setOpen] = useState(false);
  const { role_id } = useParams();
  const pathname = usePathname();
  return (
    <MenuLinksGeneric
      id="access_settings"
      setOpenValueInParent={setOpen}
      options={[
        {
          name: "Duplicate Access Level",
          link: {
            pathname: "/Settings/AccessLevels/create",
            query: {
              role_id: String(role_id),
              duplicate: "true",
            },
          },
        },
        {
          name: "Delete Access Level",
          link: {
            pathname: pathname,
            query: {
              popup: "DELETE_ROLE",
            },
          },
        },
      ]}
    >
      <div
        id="access_settings"
        className="flex cursor-pointer flex-row items-center justify-center gap-1 rounded-md border border-gray-25 px-2 py-1.5 shadow-sm transition-all ease-linear hover:shadow-md"
      >
        <IoMdSettings className="h-5 w-5 text-gray-25" />
        <VscTriangleDown
          className={`h-3 w-3 text-gray-25 transition-all ease-linear ${open ? "rotate-180" : ""} `}
        />
      </div>
    </MenuLinksGeneric>
  );
}
