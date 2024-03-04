"use client";
import getData from "@/api/getData";
import {
  database_files_type,
  database_folder_type,
} from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export default function useFolderData(folderId: number): {
  folder: {
    data:
      | (database_folder_type & { files: database_files_type[] })[]
      | null
      | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  //--------------------Folders--------------------
  const { data: folder, isPending } = useQuery({
    queryKey: ["folders", folderId],
    queryFn: () =>
      getData("folders", {
        match: { id: folderId },
        org: true,
        column: "*,files(*)",
      }),
    enabled: folderId !== null && folderId !== undefined,
  });
  return {
    folder: {
      data: folder?.data,
      error: folder?.error,
      isPending: isPending,
    },
  };
}
