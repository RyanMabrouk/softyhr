"use client";
import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";
//--------------------------------------------
export default function useEmployeeData({
  employeeId,
}: {
  employeeId: string | null | undefined;
}) {
  //--------------------Leave Requests--------------------
  const { data: leave_requests, isPending: isPending2 } = useQuery({
    queryKey: ["leave_requests", employeeId],
    queryFn: () =>
      getData("leave_requests", {
        match: { user_id: employeeId },
        org: true,
      }),
    enabled: employeeId !== undefined && employeeId !== null,
  });
  //------------------- Users Basic Information--------------------
  const { data: employee_profile, isPending: isPending7 } = useQuery({
    queryKey: ["profiles", employeeId],
    queryFn: () =>
      getData("profiles", {
        org: true,
        match: { user_id: employeeId },
      }),
    enabled: employeeId !== undefined && employeeId !== null,
  });
  //----------------- Leave Accrued--------------------
  const { data: leave_accrued, isPending: isPending4 } = useQuery({
    queryKey: ["leave_accrued", employeeId],
    queryFn: () =>
      getData("leave_accrued", {
        org: true,
        match: { user_id: employeeId },
      }),
    enabled: employeeId !== undefined && employeeId !== null,
  });
  const { data: leave_balance, isPending: isPending5 } = useQuery({
    queryKey: ["leave_balance", employeeId],
    queryFn: () =>
      getData("leave_balance", {
        org: true,
        match: { user_id: employeeId },
      }),
    enabled: employeeId !== undefined && employeeId !== null,
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
    leave_balance: {
      data: leave_balance?.data,
      error: leave_balance?.error,
      isPending: isPending5,
    },
  };
}
