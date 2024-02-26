"use client";
import getData from "@/api/getData";
import { Department_type } from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export default function useDepartment(): {
  Department: {
    data: Department_type[] | null;
    error: PostgrestError | null;
    isPending: boolean;
  };
} {
  const { data: Department, isPending } = useQuery({
    queryKey: ["Department"],
    queryFn: () =>
       getData("Department", {
            org: true,
          }),
  });
  console.log(Department);
  return {
    Department: {
      data: Department?.data,
      error: Department?.error,
      isPending: isPending,
    },
  };
}
