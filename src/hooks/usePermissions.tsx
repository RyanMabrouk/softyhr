"use client";
import getData from "@/api/getData";
import { database_permissions_type } from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function usePermissions(): {
  permission: {
    data: database_permissions_type | null;
    error: PostgrestError | null;
    isPending: boolean;
  };
} {
  const { data: permissions, isPending } = useQuery({
    queryKey: ["permissions","user"],
    queryFn: () =>
      getData("permissions", {
        org: true,
        user: true,
      }),
  });
  return {
    permission: {
      data: permissions?.data?.[0],
      error: permissions?.error,
      isPending: isPending,
    },
  };
}
