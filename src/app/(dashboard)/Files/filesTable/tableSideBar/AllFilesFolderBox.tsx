"use client";
import { getTailwindColor } from "@/helpers/getTailwindColor";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useState } from "react";

import { BiSolidCabinet } from "react-icons/bi";

const primary = getTailwindColor("fabric-700");
const grey = getTailwindColor("gray-30");
export default function AllFilesFolderBox({
  setCheckAll,
}: {
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  function handleClick() {
    queryClient.setQueryData(["fileIds"], []);
    setCheckAll && setCheckAll(false);
    replace(`Files`);
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
      <BiSolidCabinet fontSize="1.5rem" fill={isHovered ? primary : grey} />
      All Files
    </button>
  );
}
