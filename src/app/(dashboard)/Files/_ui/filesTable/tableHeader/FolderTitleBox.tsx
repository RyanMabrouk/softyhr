import React from "react";
import { IoFolderOpenSharp } from "react-icons/io5";
import FolderTitle from "./FolderTitle";
import AllFilesCheckBox from "../../components/AllFilesCheckBox";

export default function FolderTitleBox({ checkAll, setCheckAll }: any) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <div className="  mt-1 border-r-2 border-stone-200 px-1  ">
        <AllFilesCheckBox checkAll={checkAll} setCheckAll={setCheckAll} />
      </div>
      <IoFolderOpenSharp fontSize="1.6rem" fill="#527A01" />
      <FolderTitle />
    </div>
  );
}
