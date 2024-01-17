"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { TbFolderPlus } from "react-icons/tb";

export default function AddFolder() {
  const Router = useRouter();
  function handleClick() {
    Router.replace("Files?popup=ADD_FOLDER");
  }
  return (
    <button
      className="border-spacing-4 cursor-pointer border border-color-primary-8 px-2 py-1 hover:opacity-80"
      onClick={handleClick}
    >
      <TbFolderPlus fontSize="1.5rem" stroke="#527A01" />
    </button>
  );
}
