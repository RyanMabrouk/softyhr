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
  employeeId: string;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
    },
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["settings"],
      queryFn: () =>
      getData("settings", {
        org: true,
      }),
    }),
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
