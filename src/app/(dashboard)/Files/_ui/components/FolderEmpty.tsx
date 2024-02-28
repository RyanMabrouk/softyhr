import React from "react";
import { FaRegFolderOpen } from "react-icons/fa";

export default function FolderEmpty() {
  return (
    <div className="mt-12 flex flex-col items-center gap-2">
      <FaRegFolderOpen fontSize="8rem" fill="#CCCCCC" />
      <h3 className="text-2xl text-gray-8">This is looking kind of empty</h3>
      <p className=" tracking-wide text-gray-6">
        Drag files to this folder or upload new files
      </p>
    </div>
  );
}
