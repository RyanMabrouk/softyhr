"use client";
import React from "react";
import useData from "@/hooks/useData";
import { FaCheck } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import acceptLeaveRequest from "@/actions/leave/acceptLeaveRequest";
import {
  database_profile_leave_balance_type,
  database_profile_type,
} from "@/types/database.tables.types";
export type request_type = {
  id: number;
  policy_id: number;
  user_id: string;
  duration_used: database_profile_leave_balance_type;
};
export function AcceptRequestBtn({ request }: { request: request_type }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    user_profile: { data: user_profile },
  }: { [key: string]: { data: database_profile_type } } = useData();
  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await acceptLeaveRequest({
        request: request,
        reviewed_by: user_profile?.user_id,
        old_user_leave_balance: user_profile?.leave_balance,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Leave request approved", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_requests"] });
      queryClient.invalidateQueries({ queryKey: ["all_profiles"] });
    },
  });
  return (
    <>
      <div role="button" onClick={() => mutation.mutate()}>
        <FaCheck className="hidden h-7 w-7 cursor-pointer rounded-md border border-transparent p-0.5 text-gray-21 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block" />
      </div>
    </>
  );
}
