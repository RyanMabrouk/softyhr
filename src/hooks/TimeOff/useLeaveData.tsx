"use client";
import getData from "@/api/getData";
import {
  database_leave_policies_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function useLeaveData(): {
  leave_policies: {
    data: database_leave_policies_type[] | null | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
  leave_categories: {
    data: databese_leave_categories_type[] | null | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  //----------------- Leave Policies--------------------
  const { data: leave_policies, isPending: isPending3 } = useQuery({
    queryKey: ["leave_policies"],
    queryFn: () =>
      getData("leave_policies", {
        org: true,
      }),
  });
  //-------------------- Leave Categories--------------------
  const { data: leave_categories, isPending: isPending5 } = useQuery({
    queryKey: ["leave_categories"],
    queryFn: () =>
      getData("leave_categories", {
        org: true,
      }),
  });
  return {
    leave_policies: {
      data: leave_policies?.data,
      error: leave_policies?.error,
      isPending: isPending3,
    },
    leave_categories: {
      data: leave_categories?.data,
      error: leave_categories?.error,
      isPending: isPending5,
    },
  };
}
