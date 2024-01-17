import React from "react";

import { AiOutlineFileText } from "react-icons/ai";
import FilesTable from "./_ui/filesTable/FilesTable";

export default function FilesLayout() {
  return (
    <div className="w-files_screen mx-auto mt-12">
      <div className="-ml-2 flex items-center gap-2 ">
        <AiOutlineFileText fontSize="2.4rem" fill="#527A01" />
        <p className="text-3xl font-semibold text-color-primary-8">Files</p>
      </div>

      <FilesTable />
    </div>
  );
}
