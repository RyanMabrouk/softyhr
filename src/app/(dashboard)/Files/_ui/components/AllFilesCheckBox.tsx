"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import useFolderData from "@/hooks/useFolderData";
import GetFoldersByIDs from "@/actions/files/getFolders";
import getData from "@/api/getData";
import useFoldersIds from "@/hooks/useFoldersIds";
import useUserRole from "@/hooks/useUserRole";
export default function AllFilesCheckBox({ checkAll, setCheckAll }: any) {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  let wantedId = searchParams.get("id");
  const { wantedFoldersIds, filesIds } = useFoldersIds();
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
  const { data: allFilesAdmin, isPending: isPending2 } = useQuery({
    queryKey: ["files"],
    queryFn: () =>
      getData("files", {
        org: true,
        column: "*",
      }),
  });
  const allFilesIdsAdmin = allFilesAdmin?.data?.map(
    (file: { id: any }) => file.id,
  );
  const { folder } = useFolderData(wantedId);
  // active user role
  const {
    role: { data: role },
  } = useUserRole();
  const isPending = folder.isPending;
  const fileIds =
    !isPending && wantedId
      ? role?.permissions.includes("read:files")
        ? folder?.data?.[0]?.files &&
          folder?.data[0]?.files.map((file: any) => file.id)
        : folder?.data?.[0]?.files &&
          folder?.data[0]?.files
            .map((file: any) => file.id)
            .filter((id: any) => filesIds.includes(id))
      : []
        ? role?.permissions.includes("read:files")
          ? allFilesIdsAdmin
          : allFilesIds
        : [];

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
        className=" h-4 w-4 cursor-pointer rounded border-gray-300 border-r-color-primary-8 bg-white  text-color-primary-8 accent-color-primary-8 "
      />
    </div>
  );
}
