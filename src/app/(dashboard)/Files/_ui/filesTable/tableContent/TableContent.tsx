"use client";
import React from "react";
import FileBox from "./FileBox";
import useData from "@/hooks/useData";
import LoaderFiles from "../../components/Loader/LoaderFiles";

export default function TableContent() {
  const {
    files: { data, isPending },
  } = useData();

  const filesArray = isPending ? [] : data;
  console.log(data);

  // const filesArray = [
  //   {
  //     id: 1,
  //     name: "4 Ways the BambooHR ATS Improves the Hiring Process",
  //     fileURL: "testURL",
  //     addedAt: "02/17/2024",
  //     addedBy: "vini",
  //     size: "835KB",
  //   },
  //   {
  //     id: 2,
  //     name: "Australia Standard Choice Form.pdf",
  //     fileURL: "testURL",
  //     addedAt: "10/27/2023",
  //     addedBy: "BambooHR",
  //     size: "316KB",
  //   },

  //   {
  //     id: 3,
  //     name: "Australia Taxfile Declaration Form.pdf",
  //     fileURL: "testURL",
  //     addedAt: "10/27/2023",
  //     addedBy: "BambooHR",
  //     size: "402KB",
  //   },
  //   {
  //     id: 4,
  //     name: "Fair-Work-Information-Statement.pdf",
  //     fileURL: "testURL",
  //     addedAt: "10/27/2023",
  //     addedBy: "BambooHR",
  //     size: "220KB",
  //   },
  // ];
  let filesIdArr: any = [];
  function pushFileId(id: number) {
    filesIdArr.push(id);
    console.log(filesIdArr);
  }
  function removeFileId(id: number) {
    filesIdArr = filesIdArr.filter((fileId: number) => fileId !== id);
    console.log(filesIdArr);
  }
  return (
    <div className="w-full ">
      {isPending ? (
        <LoaderFiles />
      ) : (
        filesArray.map((file: any) => {
          return (
            <FileBox
              key={file.id}
              file={file}
              pushFileId={pushFileId}
              removeFileId={removeFileId}
            />
          );
        })
      )}
    </div>
  );
}
