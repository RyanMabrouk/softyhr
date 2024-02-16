"use client";
import { MenuLinksGeneric } from "@/app/_ui/MenuLinksGeneric";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { VscTriangleDown } from "react-icons/vsc";

export function SettingsBtn() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <MenuLinksGeneric
      id="timeoff_settings"
      setOpenValueInParent={setOpen}
      options={[
        {
          name: "Default hours per day",
          link: {
            pathname: pathname,
            query: {
              popup: "CHANGE_DEFAULT_HOURS_PER_DAY",
            },
          },
        },
        /*{ name: "Time off import", link: { pathname: "#" } },*/
      ]}
    >
      <div
        id="timeoff_settings"
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
