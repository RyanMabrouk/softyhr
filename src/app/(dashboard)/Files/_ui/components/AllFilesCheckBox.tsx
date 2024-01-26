"use client";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import useData from "@/hooks/useData";
import useFolderData from "@/hooks/useFolderData";

export default function AllFilesCheckBox({ checkAll, setCheckAll }: any) {
  const searchParams = useSearchParams();
  let wantedId = searchParams.get("id");

  const {
    files: { data: allFiles, isPending: isPendingAllFiles },
  } = useData();
  const allFilesIds = allFiles?.map((file: { id: any }) => file.id);
  const { folder } = useFolderData(wantedId);

  const isPending = folder.isPending;
  const fileIds = wantedId
    ? !isPending
      ? folder?.data[0]?.files.map((file: any) => file.id)
      : null
    : allFilesIds;

  const queryClient = useQueryClient();

  function handleChange() {
    setCheckAll(!checkAll);
    if (!checkAll) {
      queryClient.setQueryData(["fileIds"], fileIds);
    } else {
      queryClient.setQueryData(["fileIds"], []);
    }
  }

  return (
    <div>
      <input
        id="checked-checkbox"
        type="checkbox"
        onChange={handleChange}
        checked={checkAll}
        className="h-4 w-4 cursor-pointer rounded border-gray-300 border-r-color-primary-8 bg-gray-100  text-color-primary-8 accent-color-primary-8 "
      />
    </div>
  );
}
