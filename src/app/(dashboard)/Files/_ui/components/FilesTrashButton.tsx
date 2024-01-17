"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { FaTrash } from "react-icons/fa";

export default function FilesTrashButton({ check }: any) {
  const Router = useRouter();
  function handleClick() {
    Router.replace("Files?popup=DELETE_FILE");
  }
  return (
    <div>
      <button
        disabled={check}
        className="border-spacing-4  cursor-pointer  border border-color-primary-8 p-[0.4rem]  px-[0.6rem] hover:opacity-80 disabled:cursor-not-allowed "
        onClick={handleClick}
      >
        <FaTrash fontSize="1rem" fill="#38312F" />
      </button>
    </div>
  );
}
