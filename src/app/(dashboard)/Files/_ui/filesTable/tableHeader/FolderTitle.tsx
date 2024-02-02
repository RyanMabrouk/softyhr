"use client";
import GetFoldersByIDs from "@/actions/files/getFolders";
import useFoldersIds from "@/actions/files/useFoldersIds";
import getData from "@/api/getData";
import useData from "@/hooks/useData";
import useFolderData from "@/hooks/useFolderData";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function FolderTitle() {
  const searchParams = useSearchParams();

  const {
    user_profile: { data: cur_user, isPending: isPending_user },
  } = useData();
  const { filesIds } = useFoldersIds();

  const { wantedFoldersIds } = useFoldersIds();

  const { data: { data: wantedFolders } = {} } = useQuery({
    queryKey: ["folders", wantedFoldersIds],
    queryFn: async () => await GetFoldersByIDs(wantedFoldersIds),
  });
  const role = cur_user?.role;
  const allFilesIds = wantedFolders
    ?.map((fold: any) => fold.files)
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
  const { folder: wantedFolder }: any = useFolderData(wantedId);
  const isPending = wantedFolder.isPending;

  const folderName = isInAllFilesFolder
    ? "All Files"
    : !isPending
      ? wantedFolder?.data[0]?.name
      : null;

  const numFiles = isInAllFilesFolder
    ? role === "admin"
      ? `(${allFiles?.data?.length})`
      : `(${allFilesIds?.length})`
    : role === "admin"
      ? !isPending &&
        `(${wantedFolder?.data[0]?.files?.map((file: any) => file.id)?.length})`
      : !isPending &&
        `(${wantedFolder?.data[0]?.files?.map((file: any) => file.id).filter((id: any) => filesIds.includes(id))?.length})`;

  return (
    <p className="text-xl  text-color-primary-8">
      {folderName}
      <span className="ml-1 text-xs font-normal text-stone-500">
        {numFiles !== "(undefined)" ? numFiles : ""}
      </span>
    </p>
  );
}
