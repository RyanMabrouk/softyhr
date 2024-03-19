import React from "react";
import AddFolder from "../../_ui/components/AddFolder";
import FolderTitleBox from "./FolderTitleBox";
import SortAndDownloadBox from "./SortAndDownloadBox";
import UploadButton from "../../_ui/components/UploadButton";

export default function FilesTableHeader({
  checkAll,
  setCheckAll,
}: {
  checkAll: boolean | undefined;
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  return (
    <div className="flex  justify-between">
      <div className="mt-4 flex items-center gap-3">
        <UploadButton />
        <AddFolder />
      </div>
      <div className="flex w-[78%] items-center justify-between">
        <FolderTitleBox checkAll={checkAll} setCheckAll={setCheckAll} />
        <SortAndDownloadBox />
      </div>
    </div>
  );
}
