import DropDownGeneric from "@/app/_ui/DropDownGeneric";
import { MenuLinksGeneric } from "@/app/_ui/MenuLinksGeneric";
import { usePathname } from "next/navigation";
import React from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { candidateStatusGeneric } from "./config";
import { EditCandidateStatus } from "@/actions/hiring/EditCandidate";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";

function HireStatus({ Hiring, candidate }: any) {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const AdditinnalStatus = candidateStatusGeneric?.map((label: string) => {
    return {
      Component: () => (
        <div className="flex items-center justify-start gap-4">
          <h1 className="group-hover:text-white">{label}</h1>
        </div>
      ),
      action: async() =>{ 
        const response = await EditCandidateStatus(candidate?.id, label)
        if(response?.error) toast.error(response?.error?.Message)
        else toast.success(response?.Message);
        queryClient.invalidateQueries({queryKey:["Candidates"]})
      },
    };
  });
  return (
    <DropDownGeneric
      DropDownButton={() => (
        <div className="flex cursor-pointer flex-row items-center justify-center gap-3 rounded-sm border border-gray-25 px-[1.7rem] py-0.5 shadow-sm transition-all ease-linear hover:shadow-md">
          <h1 className="text-base text-gray-29">{candidate?.Status}</h1>
          <VscTriangleDown className="h-3 w-3 text-gray-25" />
        </div>
      )}
      options={[
        {
          Component: () => (
            <div className="flex items-center justify-start">
              <h1 className="group-hover:text-white">Hire</h1>
            </div>
          ),
          link: {
            pathname: pathname,
            query: {
              popup: "HIRE_CANDIDATE",
              ApplicationId: Hiring?.id,
              Candidate: candidate?.id,
            },
          },
        },
        {
          Component: () => (
            <div className="flex items-center justify-start gap-4">
              <h1 className="group-hover:text-white">Create an Offer</h1>
            </div>
          ),
          link: {
            pathname: pathname,
            query: {
              popup: "EDIT_JOB_BOARDS",
            },
          },
        },
        ...AdditinnalStatus,
      ]}
    />
  );
}

export default HireStatus;
