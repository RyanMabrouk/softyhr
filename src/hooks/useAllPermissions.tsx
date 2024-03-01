"use client";
import getData from "@/api/getData";
import { database_permissions_type } from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function useAllPermissions(): {
  permissions: {
    data: database_permissions_type[] | undefined | null;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  const { data: permissions, isPending } = useQuery({
    queryKey: ["users_permissions", "all"],
    queryFn: () =>
      getData("users_permissions", {
        org: true,
        column: "role_id,user_id,files_ids",
      }),
  });
  return {
    permissions: {
      data: permissions?.data,
      error: permissions?.error,
      isPending: isPending,
    },
  };
}
