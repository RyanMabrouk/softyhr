import BasicTable from "@/app/_ui/BasicTable/BasicTable";
import { RowFieldType } from "@/types/database.tables.types";
import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";

interface TableChampsPropsType {
  FieldsArray: RowFieldType[];
  user: any;
  champ: string;
}

function TableChamps({ FieldsArray, user, champ }: TableChampsPropsType) {
  return (
    <div className=" -mt-10 flex flex-col items-start justify-between gap-[1rem]">
      <div className="flex cursor-pointer items-center justify-center gap-[0.3rem] self-end text-gray-15 hover:underline">
        <IoMdAdd />
        <Link href={`?popup=add_entry&section=${champ}`} className="" >Add Entry</Link>
      </div>
      <BasicTable TableRows={FieldsArray} champ={champ} data={user?.[champ]} />
    </div>
  );
}

export default TableChamps;
