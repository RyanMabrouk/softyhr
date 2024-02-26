"use client";
import getData from "@/api/getData";
import { database_leave_requests_type } from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function useLeaveRequest({ id }: { id: number }): {
  leave_request: {
    data: database_leave_requests_type;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  const { data: leave_request, isPending } = useQuery({
    queryKey: ["leave_requests", id],
    queryFn: () =>
      getData("leave_requests", {
        match: { id: id },
        org: true,
      }),
  });
  return {
    leave_request: {
      data: leave_request?.data?.[0],
      error: leave_request?.error,
      isPending: isPending,
    },
  };
}
