"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { FaTrash } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import useData from "@/hooks/useData";
import RoleGuard from "@/app/_ui/RoleGuard";

export default function FilesTrashButton({ check }: any) {
  const {
    user_profile: { data: cur_user, isPending: isPending_user },
  } = useData();

  const role = cur_user?.role;

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
    <RoleGuard permissions={["delete:files"]}>
      <button
        data-tip="Delete All"
        className={`tooltip border-spacing-4 cursor-pointer rounded-md border border-gray-25 p-[0.4rem] px-[0.6rem] text-gray-25  transition-all ease-linear  hover:border-gray-25 hover:bg-gray-25  hover:text-white  ${isDisabled ? "cursor-not-allowed" : ""}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      >
        <FaTrash />
      </button>
    </RoleGuard>
  );
}
