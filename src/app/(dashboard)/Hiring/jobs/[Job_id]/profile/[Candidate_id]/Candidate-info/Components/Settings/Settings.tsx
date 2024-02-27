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
              //  popup: "",
            },
          },
        },
        {
          name: "Move Candidate...",
          link: {
            pathname: pathname,
            query: {
              //  popup: "",
            },
          },
        },
        {
          name: "Delete Candidate...",
          link: {
            pathname: pathname,
            query: {
              //  popup: "",
            },
          },
        },
      ]}
    >
      <div
        id="settings"
        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-15 p-2 px-3 shadow-md duration-200 ease-linear hover:!shadow-xl"
      >
        <IoMdSettings className="h-6 w-6 text-gray-25" />
        <VscTriangleDown className="h-3 w-3 text-gray-25" />
      </div>
    </MenuLinksGeneric>
  );
}

export default Settings;
