"use client";
import React, { useEffect, useState } from "react";
import FileBox from "./FileBox";
import LoaderFiles from "../../components/Loader/LoaderFiles";
import { useSearchParams } from "next/navigation";
import useFolderData from "@/hooks/useFolderData";
import FolderEmpty from "../../components/FolderEmpty";
import { getFiles } from "@/actions/files/apiFIles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Pagination from "@/components/ui/Pagination";
import useData from "@/hooks/useData";

export default function TableContent({ checkAll, setCheckAll }: any) {
  const searchParams = useSearchParams();

  const {
    files: { data: allFiles, isPending: isPendingAllFiles },
  } = useData();
  const allFilesIds = allFiles?.map((file: { id: any }) => file.id);

  const [page, setPage] = useState(1);
  function handlePage(num: number) {
    setPage(num);
  }

  let wantedId = searchParams.get("id");

  const queryClient = useQueryClient();
  let filesIdArr: any = queryClient.getQueryData(["fileIds"])
    ? queryClient.getQueryData(["fileIds"])
    : [];

  function pushFileId(id: any) {
    filesIdArr.push(id);
    queryClient.setQueryData(["fileIds"], filesIdArr);
    const data = queryClient.getQueryData(["fileIds"]);
    if (wantedId) {
      if (filesIdArr?.length === fileIds?.length) setCheckAll(true);
    } else {
      if (filesIdArr?.length === allFilesIds?.length) setCheckAll(true);
    }
  }
  function removeFileId(id: number) {
    filesIdArr = filesIdArr
      .map((id: any) => +id)
      .filter((fileId: number) => fileId !== id);
    queryClient.setQueryData(["fileIds"], filesIdArr);
    const data = queryClient.getQueryData(["fileIds"]);
    if (checkAll) setCheckAll(false);
  }
  const { folder }: any = useFolderData(wantedId);
  const isPending = folder.isPending;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fileIds =
    !isPending && wantedId
      ? folder?.data[0]?.files
        ? folder?.data[0]?.files.map((file: any) => file.id)
        : []
      : ["all"];

  useEffect(
    function () {
      if (fileIds[0] === "all") {
        if (filesIdArr?.length !== allFilesIds?.length) setCheckAll(false);
      } else {
        if (filesIdArr?.length !== fileIds?.length) setCheckAll(false);
      }
    },
    [
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
  const filesArray = files;

  return (
    <div className="relative w-full pb-6">
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
      <Pagination count={count} page={page} handlePage={handlePage} />
    </div>
  );
}
