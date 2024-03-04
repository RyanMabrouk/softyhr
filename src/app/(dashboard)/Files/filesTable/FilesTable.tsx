"use client";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TableSideBar from "../filesTable/tableSideBar/TableSideBar";
import FilesTableHeader from "../filesTable/tableHeader/FilesTableHeader";
import useCheckAllContext from "../context/checkedContext";

export default function FilesTable({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkAll, setCheckAll } = useCheckAllContext();
  return (
    <>
      <FilesTableHeader checkAll={checkAll} setCheckAll={setCheckAll} />
      <div className="mt-6 flex gap-12 border-t-2 border-stone-200">
        <DndProvider backend={HTML5Backend}>
          <TableSideBar setCheckAll={setCheckAll} />
          {children}
        </DndProvider>
      </div>
    </>
  );
}
