"use client";
import React from "react";
import useData from "@/hooks/useData";
import { FaCheck } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import acceptLeaveRequest from "@/actions/leave/acceptLeaveRequest";
import {
  database_leave_request_duration_used_type,
  database_profile_type,
} from "@/types/database.tables.types";
import { useParams } from "next/navigation";
export type request_type = {
  id: number;
  policy_id: number;
  user_id: string;
  duration_used: database_leave_request_duration_used_type[];
};
export function AcceptRequestBtn({ request }: { request: request_type }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { employeeId } = useParams();
  const {
    user_profile: { data: user_profile },
  }: { [key: string]: { data: database_profile_type } } = useData();
  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await acceptLeaveRequest({
        request: request,
        reviewed_by: user_profile?.user_id,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Leave request approved", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leave_requests", employeeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave_balance", employeeId],
      });
    },
  });
  return (
    <>
      <div
        className="tooltip"
        data-tip="Accept"
        role="button"
        onClick={() => mutation.mutate()}
      >
        <FaCheck className="peer hidden h-7 w-7 cursor-pointer rounded-md border border-transparent p-0.5 text-gray-21 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block" />
      </div>
    </>
  );
}
//test tooltip <div className=" absolute inset-x-0 left-[-50%] top-[-100%] hidden w-fit rounded-md bg-gray-25 p-1 text-white peer-hover:block">
