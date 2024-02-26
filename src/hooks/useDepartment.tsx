"use client";
import getData from "@/api/getData";
import { Department_type } from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export default function useDepartment({
  match = undefined,
  column = "*",
  QueryKey
}: {
  match?: {
    [key: string]: string | number | boolean | null | string[] | undefined;
  };
  column?: string;
  QueryKey?: string[];
}): {
  Department: {
    data: Department_type[] | null;
    error: PostgrestError | null;
    isPending: boolean;
  };
} {
  const { data: Department, isPending } = useQuery({
    queryKey: QueryKey || ["Department", match && match],
    queryFn: () =>
      getData("Department", {
        org: true,
        match,
        column,
      }),
  });

  return {
    Department: {
      data: Department?.data,
      error: Department?.error,
      isPending: isPending,
    },
  };
}
