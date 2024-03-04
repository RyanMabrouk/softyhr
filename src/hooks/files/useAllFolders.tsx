"use client";
import { useQuery } from "@tanstack/react-query";
import getData from "@/api/getData";
import {
  database_files_type,
  database_folder_type,
} from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";

export function useAllFolders(): {
  data:
    | {
        data:
          | (database_folder_type & { files: database_files_type[] })[]
          | null
          | undefined;
        error: PostgrestError | null | undefined;
      }
    | undefined;
  isPending: boolean;
} {
  const { data, isPending: isPending } = useQuery({
    queryKey: ["folders"],
    queryFn: () =>
      getData("folders", {
        org: true,
        column: "*,files(*)",
      }),
  });
  return {
    data,
    isPending,
  };
}
