"use client";
import getAcceptedDeniedLeavs from "@/api/TimeOff/getAcceptedDeniedLeavs";
import {
  database_leave_request_status_type,
  database_leave_requests_type,
} from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function useAcceptedDeniedLeaves({
  page,
  filter,
  sort,
}: {
  page: number;
  filter: "all" | "approved" | "rejected";
  sort: "user_id" | "reviewed_at";
}): {
  accepted_denied_leaves: {
    data: database_leave_requests_type[] | null | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  const status: database_leave_request_status_type[] =
    filter === "all" ? ["approved", "rejected"] : [filter];
  const { data: accepted_denied_leaves, isPending } = useQuery({
    queryKey: ["leave_requests", status, page, sort, filter],
    queryFn: () =>
      getAcceptedDeniedLeavs({
        status,
        page,
        sort,
      }),
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
