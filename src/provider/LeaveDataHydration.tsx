import React from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import getData from "@/api/getData";

export async function LeaveDataHydration({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["leave_policies"],
      queryFn: () =>
        getData("leave_policies", {
          org: true,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["leave_categories"],
      queryFn: () =>
        getData("leave_categories", {
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
