"use client";
import useData from "@/hooks/useData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import acceptLeaveRequest from "@/actions/leave/acceptLeaveRequest";
import { database_profile_type } from "@/types/database.tables.types";
import { request_type } from "../types/types";

export function useAcceptLeaveRequest({
  request,
}: {
  request: request_type;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    user_profile: { data: user_profile },
  }: { [key: string]: { data: database_profile_type; }; } = useData();
  const { mutate: accept, isPending: isAccepting } = useMutation({
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
        queryKey: ["leave_requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave_balance", request.user_id],
      });
    },
  });
  return {
    accept,
    isAccepting
  };
}
