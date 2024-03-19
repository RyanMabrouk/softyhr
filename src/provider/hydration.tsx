import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import getData from "@/api/getData";
import React from "react";
import getSession from "@/api/getSession";
import getTranslation from "@/translation/getTranslation";
export default async function Hydration({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
    },
  });
  const session = await getSession();
  const user_id = session?.user?.id;
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["profiles", "user"],
      queryFn: () =>
        getData("profiles", {
          user: true,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["users_permissions", "user"],
      queryFn: () =>
        getData("users_permissions", {
          org: true,
          user: true,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["roles", user_id],
      queryFn: async () => {
        const { data, error } = await getData("roles", {
          column: `*,users_permissions(user_id,role_id)`,
          match: { "users_permissions.user_id": String(user_id) },
          org: true,
        });
        return {
          data: data?.filter((d) => d.users_permissions.length > 0),
          error,
        };
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["profiles", "preffered_lang"],
      queryFn: () => getTranslation(),
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
