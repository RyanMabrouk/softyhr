import { MenuLinksGeneric } from "@/app/_ui/MenuLinksGeneric";
import React from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";

function Settings() {
  const pathname = usePathname();
  return (
    <MenuLinksGeneric
      id="Hiring_mail"
      options={[
        {
          name: "Update Status...",
          link: {
            pathname: pathname,
            query: {
              popup: "CHANGE_DEFAULT_HOURS_PER_DAY",
            },
          },
        },
        {
          name: "Move Candidate...",
          link: {
            pathname: pathname,
            query: {
              popup: "CHANGE_DEFAULT_HOURS_PER_DAY",
            },
          },
        },
        {
          name: "Delete Candidate...",
          link: {
            pathname: pathname,
            query: {
              popup: "CHANGE_DEFAULT_HOURS_PER_DAY",
            },
          },
        },
      ]}
    >
      <div
        id="timeoff_settings"
        className="flex cursor-pointer flex-row items-center justify-center gap-1 border border-gray-25 px-2 py-1.5 shadow-sm transition-all ease-linear hover:shadow-md"
      >
        <IoMdSettings className="h-5 w-5 text-gray-25" />
        <VscTriangleDown className="h-3 w-3 text-gray-25" />
      </div>
    </MenuLinksGeneric>
  );
}

export default Settings;
