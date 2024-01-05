"use client";
import React from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export function DeleteEditBtns() {
  const className =
    " h-7 w-7 px-0.5 hidden  text-gray-25 cursor-pointer rounded-md border border-transparent transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block";
  return (
    <div className=" flex h-[4.25rem] w-full  flex-row  items-start justify-center gap-1 px-4 pt-3 text-center align-top text-gray-27  ">
      <MdDelete aria-label="Delete" className={className} />
      <MdModeEdit aria-label="Edit" className={className} />
    </div>
  );
}
