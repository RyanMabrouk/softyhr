import React from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import getData from "@/api/getData";

export async function EmplyoeeDataHydration({
  children,
  employeeId,
}: {
  children: React.ReactNode;
  employeeId: string | string[];
}) {
  const queryClient = new QueryClient();
  console.log("🚀 ~ employeeId:", employeeId);
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["leave_requests", employeeId],
      queryFn: () =>
        getData("leave_requests", {
          match: { user_id: employeeId },
          org: true,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["leave_accrued", employeeId],
      queryFn: () =>
        getData("leave_accrued", {
          match: { user_id: employeeId },
          org: true,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["leave_balance", employeeId],
      queryFn: () =>
        getData("leave_balance", {
          match: { user_id: employeeId },
          org: true,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["profiles", employeeId],
      queryFn: () =>
        getData("profiles", {
          match: { user_id: employeeId },
          org: true,
        }),
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
