import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import getData from "@/api/getData";
import React from "react";
export default async function Hydration({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["user_profile"],
      queryFn: () =>
        getData("profiles", {
          user: true,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["permissions"],
      queryFn: () =>
        getData("permissions", {
          org: true,
          user: true,
        }),
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
