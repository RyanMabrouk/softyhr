"use client";
import getData from "@/api/getData";
import { Department_type } from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export default function useDepartmentData({ id }: { id: number }): {
  Department: {
    data: Department_type[] | null | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  const { data: Department, isPending } = useQuery({
    queryKey: ["Department", id],
    queryFn: () =>
      getData("Department", {
        org: true,
        match: { id: id },
      }),
    enabled: id !== undefined && id !== null && id !== 0,
  });

  return {
    Department: {
      data: Department?.data?.[0],
      error: Department?.error,
      isPending: isPending,
    },
  };
}
