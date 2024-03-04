"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { TbFolderPlus } from "react-icons/tb";

export default function AddFolder() {
  const Router = useRouter();
  const pathname = usePathname();
  function handleClick() {
    Router.push(`${pathname}?popup=ADD_FOLDER`);
  }
  return (
    <button
      className="border-spacing-4 cursor-pointer rounded-md border border-fabric-700 px-2 py-1 text-fabric-700 transition-all ease-linear hover:bg-fabric-700 hover:text-white"
      onClick={handleClick}
    >
      <TbFolderPlus className="text-2xl" />
    </button>
  );
}
