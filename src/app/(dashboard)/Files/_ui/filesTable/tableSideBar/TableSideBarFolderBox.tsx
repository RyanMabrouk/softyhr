"use client";
import React from "react";
import FolderBox from "./FolderBox";
import useData from "@/hooks/useData";
import MiniLoader from "../../components/Loader/miniLoader/MiniLoader";
import { v4 as uuidv4 } from "uuid";

export default function TableSideBarFolderBox({ setCheckAll }: any) {
  const {
    folders: { data, isPending },
  } = useData();

  const folderArray = isPending ? [] : data;

  return (
    <div className="flex flex-col gap-1 ">
      {isPending ? (
        <MiniLoader />
      ) : (
        folderArray
          ?.sort((a: any, b: any) => a?.id - b?.id)
          .map((fold: any) => (
            <FolderBox key={uuidv4()} setCheckAll={setCheckAll} folder={fold} />
          ))
      )}
    </div>
  );
}
