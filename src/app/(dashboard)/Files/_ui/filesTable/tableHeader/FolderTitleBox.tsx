import React from "react";
import FilesCheckBox from "../../components/FilesCheckBox";
import { IoFolderOpenSharp } from "react-icons/io5";
import FolderTitle from "./FolderTitle";

export default function FolderTitleBox() {
  return (
    <div className="mt-4 flex items-center gap-2">
      <div className="  mt-1 border-r-2 border-stone-200 px-1  ">
        <FilesCheckBox />
      </div>
      <IoFolderOpenSharp fontSize="1.6rem" fill="#527A01" />
      <FolderTitle />
    </div>
  );
}
