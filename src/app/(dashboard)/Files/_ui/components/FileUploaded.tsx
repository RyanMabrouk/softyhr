import React from "react";
import { AiOutlineCloseCircle, AiOutlineFileText } from "react-icons/ai";

export default function FileUploaded({ file, reset }: any) {
  const { name } = file;

  return (
    <div className="flex items-center gap-2">
      <AiOutlineFileText fontSize="1.3rem" fill="#232323" />

      <p className="text-gray-30 ">{name}</p>

      <button
        className="mt-1 hover:opacity-70"
        onClick={(e) => {
          e.preventDefault();
          reset(name);
        }}
      >
        <AiOutlineCloseCircle />
      </button>
    </div>
  );
}
