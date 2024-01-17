import React from "react";

import { IoMdDownload } from "react-icons/io";

export default function FilesDownloadButton() {
  return (
    <div>
      <button
        disabled
        className="border-spacing-4 cursor-pointer border border-color-primary-8 p-[0.4rem] px-[0.6rem] transition-all duration-300  hover:opacity-80 disabled:cursor-not-allowed"
      >
        <IoMdDownload fontSize="1.1rem" fill="#38312F" />
      </button>
    </div>
  );
}
