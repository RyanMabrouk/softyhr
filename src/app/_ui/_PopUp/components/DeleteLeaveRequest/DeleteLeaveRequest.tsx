"use client";
import deleteLeaveRequest from "@/actions/leave/deleteLeaveRequest";
import { SubmitBtn } from "@/app/(auth)/login/_ui/SubmitBtn";
import { formatDateToMonDDYYYY } from "@/helpers/date.helpers";
import useData from "@/hooks/useData";
import useToast from "@/hooks/useToast";
import {
  database_leave_policies_type,
  database_leave_requests_type,
  database_profile_type,
} from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { CgClose, CgTrash } from "react-icons/cg";
export default function DeleteLeaveRequest() {
  const { toast } = useToast();
  const Router = useRouter();
  const queryClient = useQueryClient();
  const leave_request_id = useSearchParams().get("leave_request_id");
  const { employeeId } = useParams();
  const {
    all_profiles: { data: all_profiles },
    leave_requests: { data: leave_requests },
    leave_policies: { data: leave_policies },
  } = useData();
  // User Profile Data
  const current_user_profile = all_profiles?.find(
    (profile: database_profile_type) => profile.user_id == employeeId,
  );
  // Current User Data
  const full_name: string =
    current_user_profile?.["Basic Information"]?.["First name"] +
    " " +
    current_user_profile?.["Basic Information"]?.["Last name"];
  // Current Leave Request Data
  const current_leave_request: database_leave_requests_type =
    leave_requests?.find(
      (request: database_leave_requests_type) =>
        request.id == Number(leave_request_id),
    );
  // Current Leave Request Policy Data
  const current_leave_policy = leave_policies?.find(
    (policy: database_leave_policies_type) =>
      policy.id == current_leave_request?.policy_id,
  );
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
      queryClient.invalidateQueries({ queryKey: ["leave_requests"] });
      Router.back();
    },
  });
  return (
    <>
      <div className="z-50 flex flex-col gap-2">
        <div className="z-50 flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
              Request Comments
            </h1>
            <div onClick={() => Router.back()}>
              <CgClose className="cursor-pointer text-3xl text-gray-15" />
            </div>
          </div>
        </div>
        <div className="shadow-popup px-auto flex min-w-[35rem] flex-col items-center gap-2 rounded-sm bg-white px-8 py-4">
          <CgTrash className="h-20 w-20 text-color9-500 " />
          <div className=" max-w-[30rem] text-center text-[1.35rem] leading-6  text-gray-27">
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
              <button
                className="cursor-pointer text-color5-500 hover:underline "
                type="button"
                onClick={() => Router.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
