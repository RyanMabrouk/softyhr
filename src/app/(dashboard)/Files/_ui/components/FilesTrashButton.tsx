"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { FaTrash } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

export default function FilesTrashButton({ check }: any) {
  const Router = useRouter();
  const queryClient = useQueryClient();
  const [isDisabled, setIsDisabled] = useState(true);

  function handleMouseEnter() {
    const data: any = queryClient.getQueryData(["fileIds"]);
    setIsDisabled(data === undefined || data?.length === 0);
  }

  function handleClick() {
    if (!isDisabled) Router.replace("Files?popup=DELETE_FILES");
  }
  return (
    <div>
      <button
        className={`border-spacing-4  cursor-pointer  border border-color-primary-8 p-[0.4rem]  px-[0.6rem] opacity-80 hover:opacity-60 ${isDisabled ? "cursor-not-allowed " : ""} `}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      >
        <FaTrash fontSize="1rem" fill="#38312F" />
      </button>
    </div>
  );
}
