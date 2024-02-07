"use client";
import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";
export default function useLeaveData() {
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
    all_users_leave_balance: {
      data: all_users_leave_balance?.data,
      error: all_users_leave_balance?.error,
      isPending: isPending7,
    },
  };
}
