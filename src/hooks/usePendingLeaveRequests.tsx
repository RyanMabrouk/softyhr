"use client";
import getData from "@/api/getData";
import {
  database_leave_request_status_type,
  database_leave_requests_type,
} from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function useRole({ id }: { id: number | undefined }): {
  pending_leave_requests: {
    data: database_leave_requests_type[] | null;
    error: PostgrestError | null;
    isPending: boolean;
  } | null;
} {
  const status: database_leave_request_status_type = "pending";
  const { data: pending_leave_requests, isPending } = useQuery({
    queryKey: ["leave_requests", "pending"],
    queryFn: () =>
      getData("leave_requests", {
        match: { status: status },
        org: true,
      }),
  });
  return {
    pending_leave_requests: {
      data: pending_leave_requests?.data?.[0],
      error: pending_leave_requests?.error,
      isPending: isPending,
    },
  };
}
