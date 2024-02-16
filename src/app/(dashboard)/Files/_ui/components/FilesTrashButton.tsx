"use client";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import RoleGuard from "@/app/_ui/RoleGuard";
export default function FilesTrashButton() {
  const Router = useRouter();
  const { data } = useQuery<number[]>({
    queryKey: ["fileIds"],
  });
  const isDisabled = (data?.length ?? 0) === 0;
  function handleClick() {
    if (!isDisabled) Router.replace("Files?popup=DELETE_FILES");
  }
  return (
    <RoleGuard permissions={["delete:files"]}>
      <button
        data-tip="Delete All"
        disabled={isDisabled}
        className={`tooltip border-spacing-4 cursor-pointer rounded-md border border-gray-25 p-[0.4rem] px-[0.6rem] text-gray-25  transition-all ease-linear  hover:border-gray-25 hover:bg-gray-25  hover:text-white disabled:cursor-not-allowed disabled:opacity-50`}
        onClick={handleClick}
      >
        <FaTrash />
      </button>
    </RoleGuard>
  );
}
