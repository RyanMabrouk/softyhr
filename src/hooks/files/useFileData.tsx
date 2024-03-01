"use client";
import getData from "@/api/getData";
import { database_files_type } from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export default function useFileData(fileId: number): {
  file: {
    data: database_files_type | null | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  //--------------------Files--------------------
  const { data: file, isPending: isPending } = useQuery({
    queryKey: ["files", fileId],
    queryFn: () =>
      getData("files", {
        match: { id: fileId },
        org: true,
      }),
  });
  return {
    file: {
      data: file?.data?.[0],
      error: file?.error,
      isPending: isPending,
    },
  };
}
