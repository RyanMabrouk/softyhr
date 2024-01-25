import { MenuLinksGeneric } from "@/app/_ui/MenuLinksGeneric";
import { usePathname } from "next/navigation";
import React from "react";
import { VscTriangleDown } from "react-icons/vsc";

function HireStatus({ Hiring }: any) {
  const pathname = usePathname();
  return (
    <MenuLinksGeneric
      id="Hiring_status"
      options={[
        {
          name: "Not a Fit",
          link: {
            pathname: pathname,
            query: {
              popup: "Not_a_Fit",
            },
          },
        },
        {
          name: "Hire",
          link: {
            pathname: pathname,
            query: {
              popup: "HIRE_CANDIDATE",
            },
          },
        },
        {
          name: "Create Offer Job",
          link: {
            pathname: pathname,
            query: {
              popup: "CREATE_A_JOB",
            },
          },
        },
      ]}
    >
      <div
        id="timeoff_settings"
        className="flex cursor-pointer flex-row items-center justify-center gap-3 rounded-sm border border-gray-25 px-3 py-0.5 shadow-sm transition-all ease-linear hover:shadow-md"
      >
        <h1 className="text-base text-gray-29">{Hiring?.Status}</h1>
        <VscTriangleDown className="h-3 w-3 text-gray-25" />
      </div>
    </MenuLinksGeneric>
  );
}

export default HireStatus;
