import { downloadFile } from "@/helpers/downloadFile";
import React from "react";

import { IoMdDownload } from "react-icons/io";

export default function FileDownloadButton({ fileUrl, fileName }: any) {
  return (
    <button
      onClick={() => downloadFile(fileUrl, fileName)}
      className="tooltip flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-transparent px-1 py-0.5 text-gray-25 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block"
      data-tip="Download"
    >
      <IoMdDownload fontSize="1.2rem" />
    </button>
  );
}
