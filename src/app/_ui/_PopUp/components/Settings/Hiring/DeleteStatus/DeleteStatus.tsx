"use client";
import { deleteEducation } from "@/actions/personal-job/education/deleteEducation";
import useEmployeeData from "@/hooks/useEmloyeeData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useParams } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import PopUpSkeleton from "../../../../PopUpSkeleton";
import useToast from "@/hooks/useToast";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import { Hr } from "@/app/(dashboard)/people/(employee)/[employeeId]/TimeOff/components/Hr";
import useCandidateStatus from "@/hooks/Hiring/useCandidateStatus";
import Loader from "@/app/_ui/Loader/Loader";
import { GrNotes } from "react-icons/gr";
import { deleteCandidateStatus } from "@/actions/settings/Hiring/deleteCandidateStatus";

export default function DeleteCandidateStatus() {
  const Router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { employeeId } = useParams();
  const params = useSearchParams();
  const id = params?.get("id");
  const { data, isPending: status_pending } = useCandidateStatus({ id });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ id }: {id: string}) => {
      return await deleteCandidateStatus(id || "");
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["candidate_statuses"] });
      toast.success("candidate deleted successfully", "Deleted");
      Router.push(pathname);
      queryClient.invalidateQueries({ queryKey: ["candidate_statuses"] });
    },
    onError: () => {
      toast.error("something went wrong");
      Router.push(pathname);
    },
  });
  return (
    <>
      <PopUpSkeleton
        className=" flex flex-col items-center gap-[2rem] px-4 py-6"
        title="Just Checking..."
      >
        {!status_pending ? (
          <div className="flex w-10/12 flex-col gap-[1rem]">
            <div className="flex flex-col items-center justify-center gap-[1rem]">
              <FaRegTrashAlt className="text-6xl text-color9-500" />
              <div className="flex flex-col items-center justify-center gap-[0.3rem]">
                <h1 className="whitespace-nowrap text-lg text-gray-27">
                  <strong className="text-black first-letter:capitalize">
                    Are you sure you want to remove this status?
                  </strong>
                </h1>
              </div>
            </div>
            <div className="w-full bg-gray-14 px-12 py-8">
              <div className="flex flex-col items-center justify-center gap-[1rem]">
                <GrNotes className="text-3xl text-gray-13" />
                <p className="text-xl font-bold text-gray-13">
                  {data?.[0]?.name}
                </p>
              </div>
            </div>
            <form
              action={() => {
                mutateAsync({id: id || ""});
              }}
              className="flex flex-col items-center justify-start gap-[1rem] self-start "
            >
              <p className="font-base w-10/12 self-start text-sm text-gray-13 ">
                Candidates currently in this status will remain so until they
                are moved into a different status.
              </p>
              <hr className="h-[3px] w-full bg-primary-gradient" />
              <div className="flex items-center justify-start gap-[0.6rem] self-start">
                <SubmitBtn className="px-3" disabled={isPending}>
                  Remove, Status
                </SubmitBtn>
                <CancelBtnGeneric />
              </div>
            </form>
          </div>
        ) : (
          <Loader />
        )}
      </PopUpSkeleton>
    </>
  );
}
