"use client";
import getData from "@/api/getData";
import { database_roles_type } from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function useRoles(): {
  roles: {
    data: database_roles_type[] | null | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  const { data: roles, isPending } = useQuery({
    queryKey: ["roles"],
    queryFn: () =>
      getData("roles", {
        org: true,
      }),
  });
  return {
    roles: {
      data: roles?.data,
      error: roles?.error,
      isPending: isPending,
    },
  };
}
