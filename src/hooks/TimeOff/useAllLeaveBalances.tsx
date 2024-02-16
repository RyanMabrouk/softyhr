"use client";
import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";
export default function useAllLeaveBalances() {
  //------------------Leave Balance--------------------------------------
  const { data: all_users_leave_balance, isPending: isPending7 } = useQuery({
    queryKey: ["leave_balance"],
    queryFn: () =>
      getData("leave_balance", {
        org: true,
        column: "user_id,policy_id",
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
