"use client";
import React from "react";
import FolderBox from "./FolderBox";
import useData from "@/hooks/useData";
import MiniLoader from "../../components/miniLoader/MiniLoader";

export default function TableSideBarFolderBox() {
  const {
    folders: { data, isPending },
  } = useData();

  const folderArray = isPending ? [] : data;
  console.log(folderArray);

  // const filesFolderArray = [
  //   {
  //     id: 1,
  //     name: "Bamboo",
  //     numFiles: 3,
  //   },
  //   {
  //     id: 2,
  //     name: "Benefits",
  //     numFiles: 1,
  //   },
  //   {
  //     id: 3,
  //     name: "Company",
  //     numFiles: 5,
  //   },
  //   {
  //     id: 4,
  //     name: "New Hire",
  //     numFiles: 3,
  //   },
  // ];

  return (
    <div className="flex flex-col gap-1 ">
      {isPending ? (
        <MiniLoader />
      ) : (
        folderArray.map((fold: any) => (
          <FolderBox key={fold.id} folder={fold} />
        ))
      )}
    </div>
  );
}
