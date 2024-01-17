import React from "react";
import TableSideBarFolderBox from "./TableSideBarFolderBox";
import AllFilesFolderBox from "./AllFilesFolderBox";

export default function TableSideBar() {
  return (
    <div className="h-96 w-80 bg-stone-100 pl-4 pt-4">
      <AllFilesFolderBox />
      <hr className="m-2" />
      <TableSideBarFolderBox />
    </div>
  );
}
