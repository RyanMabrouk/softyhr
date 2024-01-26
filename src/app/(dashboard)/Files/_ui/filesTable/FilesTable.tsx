"use client";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TableSideBar from "./tableSideBar/TableSideBar";
import TableContent from "./tableContent/TableContent";
import FilesTableHeader from "./tableHeader/FilesTableHeader";

export default function FilesTable() {
  const [checkAll, setCheckAll] = useState(false);

  return (
    <>
      <FilesTableHeader checkAll={checkAll} setCheckAll={setCheckAll} />
      <div className="mt-6 flex gap-12 border-t-2 border-stone-200">
        <DndProvider backend={HTML5Backend}>
          <TableSideBar setCheckAll={setCheckAll} />
          <TableContent checkAll={checkAll} setCheckAll={setCheckAll} />
        </DndProvider>
      </div>
    </>
  );
}
