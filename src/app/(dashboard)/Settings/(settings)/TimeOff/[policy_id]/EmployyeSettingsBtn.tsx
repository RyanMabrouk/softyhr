"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { VscTriangleDown } from "react-icons/vsc";
import { MenuLinksGeneric } from "@/app/_ui/MenuLinksGeneric";

export function EmployyeSettingsBtn({ employeeId }: { employeeId: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <MenuLinksGeneric
      setOpenValueInParent={setOpen}
      id="timeoff_settings"
      options={[
        {
          name: "Move to another policy",
          link: {
            pathname: pathname,
            query: { employeeId: employeeId, popup: "CHANGE_LEAVE_POLICY" },
          },
        },
        {
          name: "Remove from this policy",
          link: {
            pathname: pathname,
            query: { employeeId: employeeId, popup: "DELETE_LEAVE_POLICY" },
          },
        },
      ]}
    >
      <div
        id="timeoff_settings"
        className={`flex cursor-pointer flex-row items-center justify-center gap-1 rounded-md border border-gray-25 px-2 py-1.5 shadow-sm transition-all ease-linear hover:shadow-md group-hover:opacity-100 ${open ? "opacity-100" : "opacity-0"}`}
      >
        <IoMdSettings className="h-5 w-5 text-gray-25" />
        <VscTriangleDown className="h-3 w-3 text-gray-25" />
      </div>
    </MenuLinksGeneric>
  );
}
