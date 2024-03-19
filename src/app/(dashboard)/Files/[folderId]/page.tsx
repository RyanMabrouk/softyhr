"use client";
import React from "react";
import TableContent from "../filesTable/tableContent/TableContent";
import useCheckAllContext from "../context/checkedContext";
export default function Page() {
  const { checkAll, setCheckAll } = useCheckAllContext();
  return <TableContent checkAll={checkAll} setCheckAll={setCheckAll} />;
}
