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
