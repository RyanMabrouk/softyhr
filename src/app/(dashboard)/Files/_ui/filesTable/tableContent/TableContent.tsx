"use client";
import React, { useEffect, useMemo, useState } from "react";
import FileBox from "./FileBox";
import LoaderFiles from "../../components/Loader/LoaderFiles";
import { useSearchParams } from "next/navigation";
import useFolderData from "@/hooks/useFolderData";
import FolderEmpty from "../../components/FolderEmpty";
import { getFiles } from "@/actions/files/apiFIles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Pagination from "@/components/ui/Pagination";
import GetFoldersByIDs from "@/actions/files/getFolders";
import { equalsCheck } from "@/helpers/array.helpers";
import { PAGE_SIZE } from "@/constants/filesConstants";
import getData from "@/api/getData";
import useFoldersIds from "@/hooks/useFoldersIds";
import useUserRole from "@/hooks/useUserRole";

export default function TableContent({ checkAll, setCheckAll }: any) {
  const searchParams = useSearchParams();

  const { data: allFilesAdmin, isPending: isPending10 } = useQuery({
    queryKey: ["files"],
    queryFn: () =>
      getData("files", {
        org: true,
      }),
  });
  const allFilesIdsAdmin = allFilesAdmin?.data?.map((file: any) => file.id);

  const { wantedFoldersIds, filesIds } = useFoldersIds();

  const { data: { data: wantedFolders } = {} } = useQuery({
    queryKey: ["folders", wantedFoldersIds],
    queryFn: async () => await GetFoldersByIDs(wantedFoldersIds),
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

  let wantedId = searchParams.get("id");

  const queryClient = useQueryClient();
  let filesIdArr: any = queryClient.getQueryData(["fileIds"])
    ? queryClient.getQueryData(["fileIds"])
    : [];

  const { folder }: any = useFolderData(wantedId);
  const isPending = folder.isPending;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // active user role
  const {
    role: { data: role },
  } = useUserRole();
  const fileIds = useMemo(
    () =>
      !isPending && wantedId
        ? role?.permissions.includes("read:files")
          ? folder?.data[0]?.files &&
            folder?.data[0]?.files.map((file: any) => file.id)
          : folder?.data[0]?.files &&
            folder?.data[0]?.files
              .map((file: any) => file.id)
              .filter((id: any) => filesIds.includes(id))
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
      wantedId,
    ],
  );

  function pushFileId(id: any) {
    filesIdArr.push(id);
    queryClient.setQueryData(["fileIds"], filesIdArr);
    if (filesIdArr?.length === fileIds?.length) setCheckAll(true);
  }

  function removeFileId(id: number) {
    filesIdArr = filesIdArr
      .map((id: any) => +id)
      .filter((fileId: number) => fileId !== id);
    queryClient.setQueryData(["fileIds"], filesIdArr);
    if (checkAll) setCheckAll(false);
  }

  useEffect(
    function () {
      if (equalsCheck(fileIds, allFilesIds)) {
        if (filesIdArr?.length !== allFilesIds?.length) setCheckAll(false);
      } else {
        if (filesIdArr?.length !== fileIds?.length) setCheckAll(false);
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

  const {
    isLoading,
    data: { data: files, count } = {},
    error,
  } = useQuery({
    queryKey: ["files", sortBy, ids, wantedId, page],
    queryFn: () => getFiles({ sortBy, ids, page }),
  });

  // PRE-FETCHING
  if (count) {
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["files", sortBy, ids, wantedId, page + 1],
        queryFn: () => getFiles({ sortBy, ids, page: page + 1 }),
      });
    }
  }

  const filesArray = files;

  return (
    <div className="relative mb-28 w-full">
      {isLoading ? (
        <LoaderFiles />
      ) : filesArray?.length && fileIds.length ? (
        filesArray.map((file: any) => {
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
      {filesArray?.length && fileIds.length ? (
        <Pagination count={count} page={page} handlePage={handlePage} />
      ) : null}
    </div>
  );
}
