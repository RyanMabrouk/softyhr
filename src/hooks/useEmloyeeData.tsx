"use client";
import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";
// you can use this hook to get the current url
import { useUrl } from "nextjs-current-url";
//--------------------------------------------
export default function useEmployeeData({
  employeeId,
}: {
  employeeId: string | string[];
}) {
  //--------------------Leave Requests--------------------
  const { data: leave_requests, isPending: isPending2 } = useQuery({
    queryKey: ["leave_requests", employeeId],
    queryFn: () =>
      getData("leave_requests", {
        match: { user_id: employeeId },
        org: true,
      }),
  });
  //------------------- Users Basic Information--------------------
  const { data: employee_profile, isPending: isPending7 } = useQuery({
    queryKey: ["profiles", employeeId],
    queryFn: () =>
      getData("profiles", {
        org: true,
        match: { user_id: employeeId },
      }),
  });
  //----------------- Leave Accrued--------------------
  const { data: leave_accrued, isPending: isPending4 } = useQuery({
    queryKey: ["leave_accrued", employeeId],
    queryFn: () =>
      getData("leave_accrued", {
        org: true,
        match: { user_id: employeeId },
      }),
  });
  //------------------------------------------------------------
  return {
    leave_requests: {
      data: leave_requests?.data,
      error: leave_requests?.error,
      isPending: isPending2,
    },
    employee_profile: {
      data: employee_profile?.data?.[0],
      error: employee_profile?.error,
      isPending: isPending7,
    },
    leave_accrued: {
      data: leave_accrued?.data,
      error: leave_accrued?.error,
      isPending: isPending4,
    },
  };
}
