"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import useFolderData from "@/hooks/files/useFolderData";
import GetFoldersByIDs from "@/actions/files/getFolders";
import getData from "@/api/getData";
import useFoldersIds from "@/hooks/files/useFoldersIds";
import useUserRole from "@/hooks/Roles/useUserRole";
export default function AllFilesCheckBox({
  checkAll,
  setCheckAll,
}: {
  checkAll: boolean | undefined;
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  const queryClient = useQueryClient();
  const params = useParams();
  let wantedId = Number(params.folderId);
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
  const { data: allFilesAdmin } = useQuery({
    queryKey: ["files"],
    queryFn: () =>
      getData("files", {
        org: true,
        column: "*",
      }),
  });
  const allFilesIdsAdmin = allFilesAdmin?.data?.map((file) => file.id);
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
          folder?.data[0]?.files.map((file) => file.id)
        : folder?.data?.[0]?.files &&
          folder?.data[0]?.files
            .map((file) => file.id)
            .filter((id) => filesIds.includes(id))
      : []
        ? role?.permissions.includes("read:files")
          ? allFilesIdsAdmin
          : allFilesIds
        : [];

  function handleChange() {
    setCheckAll && setCheckAll(!checkAll);
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
