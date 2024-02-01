"use client";
import useData from "@/hooks/useData";
import { useQuery } from "@tanstack/react-query";
import GetFilesByIDs from "./getFiles";

function useFoldersIds() {
  const {
    user_profile: { data: cur_user, isPending: isPending_user },
  } = useData();

  const filesIds: any = isPending_user ? [] : cur_user?.files_ids;
  const {
    isLoading,
    data: { data: wantedFiles } = {},
    error,
  } = useQuery({
    queryKey: [filesIds],
    queryFn: async () => await GetFilesByIDs(filesIds),
  });
  const duplicatedFoldersIds: any = isLoading
    ? []
    : wantedFiles?.map((file) => file.folderId);
  const folderIdsSet = new Set(duplicatedFoldersIds);
  const wantedFoldersIds = [...folderIdsSet];
  return { wantedFoldersIds, filesIds };
}

export default useFoldersIds;
