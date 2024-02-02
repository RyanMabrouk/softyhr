import { downloadFile } from "@/helpers/downloadFile";
import React from "react";

import { IoMdDownload } from "react-icons/io";

export default function FileDownloadButton({ fileUrl, fileName }: any) {
  return (
    <div>
      <button
        onClick={() => downloadFile(fileUrl, fileName)}
        className="border-spacing-4 cursor-pointer border border-transparent p-1.5 transition-all ease-linear hover:border-color-primary-8  "
      >
        <IoMdDownload fontSize="1.2rem" fill="#38312F" />
      </button>
    </div>
  );
}
