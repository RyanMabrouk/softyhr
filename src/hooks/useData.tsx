"use client";
import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";
// you can use this hook to get the current url
import { useUrl } from "nextjs-current-url";
//--------------------------------------------
export default function useData() {
  //--------------------Settings--------------------
  const { data: settings, isPending } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      getData("settings", {
        org: true,
      }),
  });
  //--------------------Leave Requests--------------------
  const { data: leave_requests, isPending: isPending2 } = useQuery({
    queryKey: ["leave_requests"],
    queryFn: () =>
      getData("leave_requests", {
        user: true,
        org: true,
      }),
  });
  //----------------- Leave Policies--------------------
  const { data: leave_policies, isPending: isPending3 } = useQuery({
    queryKey: ["leave_policies"],
    queryFn: () =>
      getData("leave_policies", {
        org: true,
      }),
  });
  //----------------- Leave Accrued--------------------
  const { data: leave_accrued, isPending: isPending4 } = useQuery({
    queryKey: ["leave_accrued"],
    queryFn: () =>
      getData("leave_accrued", {
        user: true,
        org: true,
      }),
  });
  return {
    leave_requests: {
      data: leave_requests?.data,
      error: leave_requests?.error,
      isPending: isPending2,
    },
    leave_policies: {
      data: leave_policies?.data,
      error: leave_policies?.error,
      isPending: isPending3,
    },
    leave_accrued: {
      data: leave_accrued?.data,
      error: leave_accrued?.error,
      isPending: isPending4,
    },
    settings: {
      data: settings?.data,
      error: settings?.error,
      isPending: isPending,
    },
  };
}
