import React from "react";
import TableSideBar from "./tableSideBar/TableSideBar";
import TableContent from "./tableContent/TableContent";
import FilesTableHeader from "./tableHeader/FilesTableHeader";

export default function FilesTable() {
  return (
    <>
      <FilesTableHeader />
      <div className="mt-6 flex gap-12 border-t-2 border-stone-200">
        <TableSideBar />
        <TableContent />
      </div>
    </>
  );
}
