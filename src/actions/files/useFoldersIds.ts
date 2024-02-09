"use client";
import useData from "@/hooks/useData";
import { useQuery } from "@tanstack/react-query";
import GetFilesByIDs from "./getFiles";
import usePermissions from "@/hooks/usePermissions";

function useFoldersIds() {
  const {
    permission: { data: permission, isPending: isPending_user },
  } = usePermissions();
  const filesIds: any = isPending_user
    ? []
    : permission?.files_ids?.map((e) => Number(e));
  const { isLoading, data: { data: wantedFiles } = {} } = useQuery({
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
