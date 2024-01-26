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
        type="submit"
        onMouseEnter={handleMouseEnter}
        className={`border-spacing-4 cursor-pointer border border-color-primary-8 p-[0.4rem] px-[0.6rem] opacity-80 transition-all duration-300 hover:opacity-60  ${isDisabled ? "cursor-not-allowed" : ""}`}
      >
        <IoMdDownload fontSize="1.1rem" fill="#38312F" />
      </button>
    </form>
  );
}
