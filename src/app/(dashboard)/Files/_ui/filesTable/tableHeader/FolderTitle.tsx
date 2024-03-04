"use client";
import GetFoldersByIDs from "@/actions/files/getFolders";
import useFoldersIds from "@/hooks/files/useFoldersIds";
import getData from "@/api/getData";
import useFolderData from "@/hooks/files/useFolderData";
import useUserRole from "@/hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function FolderTitle() {
  const searchParams = useSearchParams();
  const { filesIds } = useFoldersIds();

  const { wantedFoldersIds } = useFoldersIds();

  const { data: { data: wantedFolders } = {} } = useQuery({
    queryKey: ["folders", wantedFoldersIds],
    queryFn: async () => await GetFoldersByIDs(wantedFoldersIds),
    enabled: wantedFoldersIds.length > 0,
  });
  const allFilesIds = wantedFolders
    ?.map((fold) => fold.files)
    .flat(2)
    .map((file) => file.id)
    .filter((id) => filesIds.includes(id));

  const { data: allFiles, isPending: isPendingAllFiles } = useQuery({
    queryKey: ["files"],
    queryFn: () =>
      getData("files", {
        org: true,
      }),
  });

  let isInAllFilesFolder = !searchParams.has("id");

  let wantedId = searchParams.get("id");
  const { folder: wantedFolder } = useFolderData(wantedId);
  const isPending = wantedFolder.isPending;

  const folderName = isInAllFilesFolder
    ? "All Files"
    : !isPending
      ? wantedFolder?.data?.[0]?.name
      : null;
  // active user role
  const {
    role: { data: role },
  } = useUserRole();
  const numFiles = isInAllFilesFolder
    ? role?.permissions.includes("read:files")
      ? `(${allFiles?.data?.length})`
      : `(${allFilesIds?.length})`
    : role?.permissions.includes("read:files")
      ? !isPending &&
        `(${wantedFolder?.data?.[0]?.files?.map((file) => file.id)?.length})`
      : !isPending &&
        `(${wantedFolder?.data?.[0]?.files?.map((file) => file.id).filter((id) => filesIds.includes(id))?.length})`;

  return (
    <p className="text-xl  text-color-primary-8">
      {folderName}
      <span className="ml-1 text-xs font-normal text-stone-500">
        {numFiles !== "(undefined)" ? numFiles : ""}
      </span>
    </p>
  );
}
