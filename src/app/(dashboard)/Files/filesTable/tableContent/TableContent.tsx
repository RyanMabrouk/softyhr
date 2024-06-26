"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import FileBox from "./FileBox";
import LoaderFiles from "../../_ui/components/Loader/LoaderFiles";
import { useParams, useSearchParams } from "next/navigation";
import useFolderData from "@/hooks/files/useFolderData";
import FolderEmpty from "../../_ui/components/FolderEmpty";
import { getFiles } from "@/actions/files/apiFIles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Pagination from "@/components/ui/Pagination";
import GetFoldersByIDs from "@/actions/files/getFolders";
import { equalsCheck } from "@/helpers/array.helpers";
import { PAGE_SIZE } from "@/constants/filesConstants";
import useFoldersIds from "@/hooks/files/useFoldersIds";
import useUserRole from "@/hooks/Roles/useUserRole";
import { useAllFiles } from "../../../../../hooks/files/useAllFiles";

export default function TableContent({
  checkAll,
  setCheckAll,
}: {
  checkAll: boolean | undefined;
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  const searchParams = useSearchParams();
  const params = useParams();
  const { data: allFilesAdmin } = useAllFiles();
  const allFilesIdsAdmin = allFilesAdmin?.map((file) => file.id);

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

  //////////////////////
  const [page, setPage] = useState(1);
  function handlePage(num: number) {
    setPage(num);
  }

  const folderId = params.folderId;

  const queryClient = useQueryClient();
  let filesIdArr: number[] | string[] =
    queryClient.getQueryData(["fileIds"]) ?? [];

  const { folder } = useFolderData(Number(folderId));
  const isPending = folder.isPending;
  // active user role
  const {
    role: { data: role },
  } = useUserRole();
  const fileIds = useMemo(
    () =>
      !isPending && folderId
        ? role?.permissions.includes("read:files")
          ? folder?.data?.[0]?.files.map((file) => file.id)
          : folder?.data?.[0]?.files
              .map((file) => file.id)
              .filter((id) => filesIds.includes(id))
        : []
          ? role?.permissions.includes("read:files")
            ? allFilesIdsAdmin
            : allFilesIds
          : [],
    [
      allFilesIds,
      allFilesIdsAdmin,
      filesIds,
      folder?.data,
      isPending,
      role?.permissions,
      folderId,
    ],
  );
  function pushFileId(id: number) {
    // @ts-ignore
    filesIdArr.push(id);
    queryClient.setQueryData(["fileIds"], filesIdArr);
    if (filesIdArr.length === fileIds?.length && setCheckAll) setCheckAll(true);
  }

  function removeFileId(id: number) {
    filesIdArr = filesIdArr
      .map((id) => +id)
      .filter((fileId: number) => fileId !== id);
    queryClient.setQueryData(["fileIds"], filesIdArr);
    if (checkAll && setCheckAll) setCheckAll(false);
  }

  useEffect(
    function () {
      if (equalsCheck(fileIds, allFilesIds)) {
        if (filesIdArr?.length !== allFilesIds?.length && setCheckAll)
          setCheckAll(false);
      } else {
        if (filesIdArr?.length !== fileIds?.length && setCheckAll)
          setCheckAll(false);
      }
    },
    [
      allFilesIds,
      allFilesIds?.length,
      fileIds,
      fileIds?.length,
      filesIdArr?.length,
      setCheckAll,
    ],
  );

  // SORT
  const sort = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sort.split("-");
  const sortBy = { field, direction };
  const ids = fileIds;

  const { isLoading, data: { data: files, count } = {} } = useQuery({
    queryKey: ["files", sortBy, ids, folderId, page],
    queryFn: () => getFiles({ sortBy, ids, page }),
  });

  // PRE-FETCHING
  if (count) {
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["files", sortBy, ids, folderId, page + 1],
        queryFn: () => getFiles({ sortBy, ids, page: page + 1 }),
      });
    }
  }

  const filesArray = files;

  return (
    <div className="relative mb-0 w-full">
      {isLoading ? (
        <LoaderFiles />
      ) : filesArray?.length && fileIds?.length ? (
        filesArray
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((file) => {
            return (
              <FileBox
                key={file.id}
                file={file}
                checkAll={checkAll}
                setCheckAll={setCheckAll}
                pushFileId={pushFileId}
                removeFileId={removeFileId}
              />
            );
          })
      ) : (
        <FolderEmpty />
      )}
      {filesArray?.length && fileIds?.length ? (
        <Pagination count={Number(count)} page={page} handlePage={handlePage} />
      ) : null}
    </div>
  );
}
