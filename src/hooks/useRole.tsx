"use client";
import getData from "@/api/getData";
import { database_roles_type } from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function useRole({ id }: { id: number | undefined }): {
  role: {
    data: database_roles_type | null | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  const { data: roles, isPending } = useQuery({
    queryKey: ["roles", id],
    queryFn: () =>
      getData("roles", {
        org: true,
        match: { id: id },
      }),
    enabled: id !== undefined && id !== null,
  });
  return {
    role: {
      data: roles?.data?.[0],
      error: roles?.error,
      isPending: isPending,
    },
  };
}
