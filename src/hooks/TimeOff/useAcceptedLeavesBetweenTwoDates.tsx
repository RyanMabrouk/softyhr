"use client";
import getAcceptedLeaveRequests from "@/api/TimeOff/getAcceptedLeaveRequests";
import {
  database_leave_request_status_type,
  database_leave_requests_type,
} from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function useAcceptedLeavesBetweenTwoDates({
  end_at,
  start_at,
}: {
  end_at: Date | undefined;
  start_at: Date | undefined;
}): {
  accepted_leave_requests: {
    data: database_leave_requests_type[] | null | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  const status: database_leave_request_status_type = "approved";
  const { data: accepted_leave_requests, isPending } = useQuery({
    queryKey: [
      "leave_requests",
      status,
      end_at?.getDate() +
        "/" +
        end_at?.getMonth() +
        "/" +
        end_at?.getFullYear(),
      start_at?.getDate() +
        "/" +
        start_at?.getMonth() +
        "/" +
        start_at?.getFullYear(),
    ],
    queryFn: () =>
      getAcceptedLeaveRequests({
        end_at: end_at as Date,
        start_at: start_at as Date,
      }),
    enabled: end_at !== undefined && start_at !== undefined,
  });
  return {
    accepted_leave_requests: {
      data: accepted_leave_requests?.data,
      error: accepted_leave_requests?.error,
      isPending: isPending,
    },
  };
}
