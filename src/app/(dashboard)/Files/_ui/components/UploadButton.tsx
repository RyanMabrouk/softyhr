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
    <div>
      <button
        className="flex border-spacing-4 items-center gap-1 border border-color-primary-8 px-2 py-1 font-semibold text-color-primary-8 hover:opacity-80"
        onClick={handleClick}
      >
        <RiUploadFill fontSize="1.2rem" fill="#527A01" /> Upload
      </button>
    </div>
  );
}
