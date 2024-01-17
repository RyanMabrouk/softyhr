import React from "react";

import { IoMdDownload } from "react-icons/io";

export default function FileDownloadButton() {
  return (
    <div>
      <button className="cursor-pointer p-1.5 transition-all duration-300 hover:border-spacing-4 hover:border hover:border-color-primary-8  ">
        <IoMdDownload fontSize="1.2rem" fill="#38312F" />
      </button>
    </div>
  );
}
