import BasicTable from "@/app/_ui/BasicTable/BasicTable";
import React from "react";
import { IoMdAdd } from "react-icons/io";

interface TableChampsPropsType {
  FieldsArray: string[];
  user: any;
  champ: string;
}

function TableChamps({ FieldsArray, user, champ }: TableChampsPropsType) {
  return (
    <div className=" flex flex-col items-start justify-between gap-[1rem]">
      <div className="flex cursor-pointer items-center justify-center gap-[0.5rem] self-end">
        <IoMdAdd />
        <h1>Add Entry</h1>
      </div>
      <BasicTable TableRows={FieldsArray} data={user[champ]} />
    </div>
  );
}

export default TableChamps;
