"use client";
import useData from "@/hooks/useData";
import useFolderData from "@/hooks/useFolderData";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function FolderTitle() {
  const searchParams = useSearchParams();

  const {
    files: { data: allFiles, isPending: isPendingAllFiles },
  } = useData();

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
    ? !isPendingAllFiles && `(${allFiles?.length})`
    : !isPending && `(${wantedFolder?.data[0]?.files?.length})`;

  return (
    <p className="text-xl  text-color-primary-8">
      {folderName}
      <span className="ml-1 text-xs font-normal text-stone-500">
        {numFiles}
      </span>
    </p>
  );
}
