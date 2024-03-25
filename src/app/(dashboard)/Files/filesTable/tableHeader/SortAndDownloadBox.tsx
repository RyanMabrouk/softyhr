import React from "react";
import FilesDownloadButton from "../../_ui/components/FilesDownloadButton";
import FilesTrashButton from "../../_ui/components/FilesTrashButton";
import FilesSelectComponent from "../../_ui/components/FilesSelectComponent";

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
            { value: "created_at-desc", label: "Date : Recent First" },
            { value: "created_at-asc", label: "Date : Oldest First" },
            { value: "size-desc", label: "Size : Largest First" },
            { value: "size-asc", label: "Size : Smallest First" },
          ]}
        />
      </div>
      <FilesDownloadButton />
      <FilesTrashButton />
    </div>
  );
}
