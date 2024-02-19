"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { MenuLinksGeneric } from "@/app/_ui/MenuLinksGeneric";
import { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { BsPersonFillLock } from "react-icons/bs";

export function EmployyeSettingsBtn({ employeeId }: { employeeId: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <MenuLinksGeneric
      setOpenValueInParent={setOpen}
      id="access_user_settings"
      options={[
        {
          name: "Reset User's Password",
          link: {
            pathname: pathname,
            query: {
              employeeId: employeeId,
              popup: "RESET_EMPLOYEE_PASSWORD",
            },
          },
        },
        {
          name: "Change User's Access Level",
          link: {
            pathname: pathname,
            query: { employeeId: employeeId, popup: "ADD_EMMPLOYEE_TO_ROLE" },
          },
        },
      ]}
    >
      <div
        id="access_user_settings"
        className={`flex cursor-pointer flex-row items-center justify-center gap-1 rounded-md border border-gray-25 bg-white px-2 py-1.5 shadow-sm transition-all ease-linear hover:shadow-md group-hover:opacity-100 ${open ? "opacity-100" : "opacity-0"}`}
      >
        <BsPersonFillLock className="h-5 w-5 text-gray-25" />
        <VscTriangleDown className="h-3 w-3 text-gray-25" />
      </div>
    </MenuLinksGeneric>
  );
}
