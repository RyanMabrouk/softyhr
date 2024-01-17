import React from "react";
import AddFolder from "../../components/AddFolder";
import FolderTitleBox from "./FolderTitleBox";
import SortAndDownloadBox from "./SortAndDownloadBox";
import UploadButton from "../../components/UploadButton";

export default function FilesTableHeader() {
  return (
    <div className="flex  justify-between">
      <div className="mt-4 flex items-center gap-3">
        <UploadButton />
        <AddFolder />
      </div>
      <div className="w-percentage78 flex items-center justify-between">
        <FolderTitleBox />
        <SortAndDownloadBox />
      </div>
    </div>
  );
}
