"use client";
import getData from "@/api/getData";
import { Department_type } from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export default function useAllDepartments(): {
  Departments: {
    data: Department_type[] | null | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  const { data: Departments, isPending } = useQuery({
    queryKey: ["Department", "all"],
    queryFn: () =>
      getData("Department", {
        org: true,
        column: "name, id",
      }),
  });

  return {
    Departments: {
      data: Departments?.data,
      error: Departments?.error,
      isPending: isPending,
    },
  };
}
