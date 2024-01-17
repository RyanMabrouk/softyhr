import React from "react";
import FilesDownloadButton from "../../components/FilesDownloadButton";
import FilesTrashButton from "../../components/FilesTrashButton";
import FilesSelectComponent from "../../components/FilesSelectComponent";

export default function SortAndDownloadBox() {
  return (
    <div className="flex items-center gap-4">
      <div>
        <label
          htmlFor="select"
          className=" m-2 text-sm font-normal text-stone-500 "
        >
          Sort By
        </label>
        <FilesSelectComponent
          options={[
            { value: "name-asc", label: "Name: A - Z" },
            { value: "name-desc", label: "Name: Z - A" },
            { value: "date-asc", label: "Date : Recent First" },
            { value: "date-desc", label: "Date : Oldest First" },
            { value: "size-asc", label: "Size : Largest First" },
            { value: "size-desc", label: "Size : Smallest First" },
          ]}
        />
      </div>
      <FilesDownloadButton />
      <FilesTrashButton />
    </div>
  );
}
