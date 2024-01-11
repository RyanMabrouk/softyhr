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
    <div className=" -mt-10 flex flex-col items-start justify-between gap-[1rem]">
      <div className="flex cursor-pointer items-center justify-center gap-[0.3rem] self-end text-gray-15 hover:underline">
        <IoMdAdd />
        <h1 className="">Add Entry</h1>
      </div>
      <BasicTable TableRows={FieldsArray} champ={champ} data={user?.[champ]} />
    </div>
  );
}

export default TableChamps;
