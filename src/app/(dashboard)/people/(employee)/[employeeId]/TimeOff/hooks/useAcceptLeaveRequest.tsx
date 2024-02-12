"use client";
import useData from "@/hooks/useData";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import acceptLeaveRequest from "@/actions/leave/acceptLeaveRequest";
import {
  database_leave_request_status_type,
  database_profile_type,
} from "@/types/database.tables.types";
import { request_type } from "../types/types";

interface UseAcceptLeaveRequestProps {
  request: request_type;
  onSuccess?: () => void;
}
export function useAcceptLeaveRequest({
  request,
  onSuccess,
}: UseAcceptLeaveRequestProps): {
  accept: UseMutateFunction<
    void,
    Error,
    void,
    {
      previous_pending: unknown;
      previous_request: unknown;
    }
  >;
  isAccepting: boolean;
} {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    user_profile: { data: user_profile },
  }: { [key: string]: { data: database_profile_type } } = useData();
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
    onMutate: async (params) => {
      await queryClient.cancelQueries({ queryKey: ["leave_requests"] });
      // Snapshot the previous value
      const previous_pending = queryClient.getQueryData([
        "leave_requests",
        "pending",
      ]);
      const previous_request = queryClient.getQueryData([
        "leave_requests",
        request.user_id,
      ]);
      // Optimistically update the cache with the new status
      const approved: database_leave_request_status_type = "approved";
      queryClient.setQueryData(
        ["leave_requests", request.user_id],
        (old: any) =>
          old
            ? {
                data: [
                  ...old.data.filter((e: any) => e.id != request.id),
                  {
                    ...old.data.find((e: any) => e.id == request.id),
                    status: approved,
                  },
                ],
                error: null,
              }
            : old,
      );
      queryClient.setQueryData(["leave_requests", "pending"], (old: any) =>
        old
          ? {
              data: old.data.filter((e: any) => e.id != request.id),
              error: null,
            }
          : old,
      );
      return {
        previous_pending: previous_pending,
        previous_request: previous_request,
      };
    },
    onError: (err, params, context) => {
      queryClient.setQueryData(
        ["leave_requests", "pending"],
        context?.previous_pending,
      );
      queryClient.setQueryData(
        ["leave_requests", request.user_id],
        context?.previous_request,
      );
    },
    onSettled: () => {
      console.log("invalidated");
      queryClient.invalidateQueries({
        queryKey: ["leave_requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave_requests", "pending"],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave_balance", request.user_id],
      });

      onSuccess && onSuccess();
    },
  });
  return {
    accept,
    isAccepting,
  };
}
