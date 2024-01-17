"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function FolderTitle() {
  const searchParams = useSearchParams();
  const folderName = searchParams.get("folderName");
  const numFiles = searchParams.get("numFiles");
  return (
    <p className="text-xl  text-color-primary-8">
      {folderName ? folderName : "All Files"}
      <span className="ml-1 text-xs font-normal text-stone-500">
        ({numFiles ? numFiles : 2})
      </span>
    </p>
  );
}
