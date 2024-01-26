import React from "react";
import AddFolder from "../../components/AddFolder";
import FolderTitleBox from "./FolderTitleBox";
import SortAndDownloadBox from "./SortAndDownloadBox";
import UploadButton from "../../components/UploadButton";

export default function FilesTableHeader({ checkAll, setCheckAll }: any) {
  return (
    <div className="flex  justify-between">
      <div className="mt-4 flex items-center gap-3">
        <UploadButton />
        <AddFolder />
      </div>
      <div className="flex w-percentage78 items-center justify-between">
        <FolderTitleBox checkAll={checkAll} setCheckAll={setCheckAll} />
        <SortAndDownloadBox />
      </div>
    </div>
  );
}
