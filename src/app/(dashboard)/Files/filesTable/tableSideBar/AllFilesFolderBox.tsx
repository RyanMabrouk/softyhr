"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { MouseEvent, useState } from "react";
import { BiSolidCabinet } from "react-icons/bi";

export default function AllFilesFolderBox({
  setCheckAll,
}: {
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  const { folderId } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  function handleClick() {
    queryClient.setQueryData(["fileIds"], []);
    setCheckAll && setCheckAll(false);
    router.push(`/Files`);
  }
  const handleHover = (event: MouseEvent<HTMLElement>) => {
    setIsHovered(true);
  };
  const handleLeave = (event: MouseEvent<HTMLElement>) => {
    setIsHovered(false);
  };
  return (
    <button
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={() => handleClick()}
      className="flex w-11/12 cursor-pointer items-center gap-3 rounded-md p-3 text-stone-500 transition-all hover:bg-white hover:text-color-primary-8 "
    >
      <BiSolidCabinet
        fontSize=""
        className={`text-[1.5rem] ${isHovered || !folderId ? "text-fabric-700" : "text-gray-30"}`}
      />
      All Files
    </button>
  );
}
