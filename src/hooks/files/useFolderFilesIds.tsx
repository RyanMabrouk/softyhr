"use client";
import getData from "@/api/getData";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export default function useFolderFilesIds(folderId: number): {
  folder_files_ids: {
    data: number[] | null | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  //--------------------Folders--------------------
  const { data: res, isPending } = useQuery({
    queryKey: ["files", "ids", folderId],
    queryFn: () =>
      getData("files", {
        match: { folderId: folderId },
        org: true,
        column: "id",
      }),
    enabled: folderId !== undefined && folderId !== null && folderId !== 0,
  });
  return {
    folder_files_ids: {
      data: res?.data?.map((file) => file.id),
      error: res?.error,
      isPending: isPending,
    },
  };
}
