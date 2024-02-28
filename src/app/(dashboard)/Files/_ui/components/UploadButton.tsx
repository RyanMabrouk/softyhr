"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { RiUploadFill } from "react-icons/ri";

export default function UploadButton() {
  const Router = useRouter();
  function handleClick() {
    Router.replace("Files?popup=UPLOAD_FILE");
  }

  return (
    <button
      className="flex border-spacing-4 items-center gap-1 rounded-md border border-fabric-700 px-2 py-1 font-semibold text-fabric-700 transition-all ease-linear hover:bg-fabric-700 hover:text-white"
      onClick={handleClick}
    >
      <RiUploadFill className="text-[1.2rem]" /> Upload
    </button>
  );
}
