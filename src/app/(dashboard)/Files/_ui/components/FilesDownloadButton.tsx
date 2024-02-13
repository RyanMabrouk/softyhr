"use client";
import React, { useEffect, useState } from "react";
import GetFilesByIDs from "@/actions/files/getFiles";
import { downloadFile } from "@/helpers/downloadFile";
import { useQueryClient } from "@tanstack/react-query";

import { IoMdDownload } from "react-icons/io";
export default function FilesDownloadButton() {
  const queryClient = useQueryClient();

  const [isDisabled, setIsDisabled] = useState(true);

  function handleMouseEnter() {
    const data: any = queryClient.getQueryData(["fileIds"]);
    setIsDisabled(data === undefined || data?.length === 0);
  }

  async function handleDownload() {
    if (!isDisabled) {
      const fileIds: any = queryClient.getQueryData(["fileIds"]);
      if (fileIds?.length) {
        const files = await GetFilesByIDs(fileIds);
        const fileNameUrlArr: { name: any; url: any }[] = [];
        files.data.map((file) =>
          fileNameUrlArr.push({ name: file.name, url: file.file_url }),
        );
        fileNameUrlArr.forEach((file) => downloadFile(file.url, file.name));
      }
    }
  }
  return (
    <form action={handleDownload}>
      <button
        data-tip="Download All"
        type="submit"
        onMouseEnter={handleMouseEnter}
        className={`tooltip border-spacing-4 cursor-pointer rounded-md border border-gray-25 p-[0.4rem] px-[0.6rem] text-gray-25 transition-all ease-linear  hover:border-gray-25 hover:bg-gray-25  hover:text-white  ${isDisabled ? "cursor-not-allowed" : ""}`}
      >
        <IoMdDownload fontSize="1.1rem" />
      </button>
    </form>
  );
}
