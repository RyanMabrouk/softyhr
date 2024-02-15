"use client";
import getData from "@/api/getData";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function useAllPermissions(): {
  permissions: {
    data: { role_id: number; user_id: string }[] | undefined | null;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  const { data: permissions, isPending } = useQuery({
    queryKey: ["permissions"],
    queryFn: () =>
      getData("permissions", {
        org: true,
        column: "role_id,user_id",
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
