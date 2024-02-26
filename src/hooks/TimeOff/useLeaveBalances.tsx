"use client";
import getData from "@/api/getData";
import { database_profile_leave_balance_type } from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function useLeaveBalances({
  policy_id,
}: {
  policy_id: number;
}): {
  all_users_leave_balance: {
    data: database_profile_leave_balance_type[] | undefined | null;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  //------------------Leave Balance--------------------------------------
  const { data: all_users_leave_balance, isPending: isPending7 } = useQuery({
    queryKey: ["leave_balance", policy_id],
    queryFn: () =>
      getData("leave_balance", {
        org: true,
        match: { policy_id: policy_id },
      }),
  });
  return {
    all_users_leave_balance: {
      data: all_users_leave_balance?.data,
      error: all_users_leave_balance?.error,
      isPending: isPending7,
    },
  };
}
