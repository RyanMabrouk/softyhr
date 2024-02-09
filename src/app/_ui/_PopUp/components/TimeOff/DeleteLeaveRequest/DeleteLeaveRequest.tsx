"use client";
import deleteLeaveRequest from "@/actions/leave/deleteLeaveRequest";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import { formatDateToMonDDYYYY } from "@/helpers/date.helpers";
import useData from "@/hooks/useData";
import useEmployeeData from "@/hooks/useEmloyeeData";
import useToast from "@/hooks/useToast";
import {
  database_leave_policies_type,
  database_leave_requests_type,
} from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { CgTrash } from "react-icons/cg";
import PopUpSkeleton from "../../../PopUpSkeleton";
import usePolicy from "@/hooks/TimeOff/usePolicy";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
export default function DeleteLeaveRequest() {
  const { toast } = useToast();
  const Router = useRouter();
  const queryClient = useQueryClient();
  const leave_request_id = useSearchParams().get("leave_request_id");
  const { employeeId } = useParams();
  const {
    leave_requests: { data: leave_requests },
    employee_profile: { data: employee_profile },
  } = useEmployeeData({ employeeId: employeeId });
  // Current User Data
  const full_name: string =
    employee_profile?.["Basic Information"]?.["First name"] +
    " " +
    employee_profile?.["Basic Information"]?.["Last name"];
  // Current Leave Request Data
  const current_leave_request: database_leave_requests_type =
    leave_requests?.find(
      (request: database_leave_requests_type) =>
        request.id == Number(leave_request_id),
    );
  // Current Leave Request Policy Data
  const { policy: current_leave_policy } = usePolicy({
    policy_id: current_leave_request?.policy_id,
  });
  // Delete Leave Request Mutation
  const { mutate: deleteReq, isPending } = useMutation({
    mutationFn: async () => {
      const { error } = await deleteLeaveRequest({
        request_id: Number(leave_request_id),
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Leave Request Deleted Successfully");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leave_requests", employeeId],
      });
      Router.back();
    },
  });
  return (
    <>
      <PopUpSkeleton
        className="flex min-w-[35rem] flex-col items-center gap-2 px-8 py-4"
        title="Just Checking..."
      >
        <CgTrash className="h-16 w-16 text-color9-500 " />
        <div className=" max-w-[30rem] text-center text-[1.25rem] leading-6  text-gray-27">
          <span className="">
            {`Are you sure you want to remove this history item for `}
          </span>
          <span className="capitalize">{full_name}</span>
        </div>
        <div className="mb-2 mt-1 flex flex-col items-center justify-center font-normal leading-6 text-gray-27 opacity-90 ">
          <span>{current_leave_policy?.name}</span>
          <span>{`${formatDateToMonDDYYYY(
            new Date(current_leave_request?.start_at),
          )} - ${formatDateToMonDDYYYY(
            new Date(current_leave_request?.end_at),
          )}`}</span>
        </div>
        <form
          action={() => deleteReq()}
          className="flex w-full flex-col gap-4 px-2 pt-3"
        >
          <hr className="h-[3px] w-full bg-primary-gradient" />
          <div className="flex flex-row gap-4 px-2 pt-3">
            <SubmitBtn disabled={isPending} className="!w-fit">
              Remove
            </SubmitBtn>
            <CancelBtnGeneric />
          </div>
        </form>
      </PopUpSkeleton>
    </>
  );
}
