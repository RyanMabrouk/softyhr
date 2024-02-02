import { MenuLinksGeneric } from "@/app/_ui/MenuLinksGeneric";
import React from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { usePathname } from "next/navigation";
import { SiGoogleanalytics } from "react-icons/si";
function CandidateReports() {
  const pathname = usePathname();
  return (
    <MenuLinksGeneric
      id="candidate_reports"
      options={[
        {
          name: "Candidate Funnel Report",
          link: {
            pathname: pathname,
            query: {
              popup: "CHANGE_DEFAULT_HOURS_PER_DAY",
            },
          },
        },
        {
          name: "Candidate Source Report",
          link: {
            pathname: pathname,
            query: {
              popup: "CHANGE_DEFAULT_HOURS_PER_DAY",
            },
          },
        },
        {
          name: "Export Job Data",
          disabled: true,
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
        id="candidate_reports"
        className="flex cursor-pointer flex-row items-center justify-center gap-1 border border-gray-25 px-2  py-[0.45rem] shadow-sm transition-all ease-linear hover:shadow-md"
      >
        <SiGoogleanalytics className="h-5 w-5 text-gray-25" />
        <VscTriangleDown className="h-3 w-3 text-gray-25" />
      </div>
    </MenuLinksGeneric>
  );
}

export default CandidateReports;
