"use client";
import { useQuery } from "@tanstack/react-query";
import getData from "@/api/getData";
import { database_files_type } from "@/types/database.tables.types";

export function useAllFiles(): {
  data: database_files_type[] | undefined | null;
} {
  const { data: allFilesAdmin } = useQuery({
    queryKey: ["files"],
    queryFn: () =>
      getData("files", {
        org: true,
      }),
  });
  return {
    data: allFilesAdmin?.data,
  };
}
