"use client";
import getAcceptedDeniedLeavs from "@/api/TimeOff/getAcceptedDeniedLeavs";
import getData from "@/api/getData";
import {
  database_leave_request_status_type,
  database_leave_requests_type,
} from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function useAcceptedDeniedLeaves({ page }: { page: number }): {
  accepted_denied_leaves: {
    data: database_leave_requests_type[] | null | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  const status: database_leave_request_status_type = "approved";
  const status2: database_leave_request_status_type = "rejected";
  const { data: accepted_denied_leaves, isPending } = useQuery({
    queryKey: ["leave_requests", status, status2],
    queryFn: () => getAcceptedDeniedLeavs({ status, status2, page }),
    enabled: page !== undefined && page !== null,
  });
  return {
    accepted_denied_leaves: {
      data: accepted_denied_leaves?.data,
      error: accepted_denied_leaves?.error,
      isPending: isPending,
    },
  };
}
