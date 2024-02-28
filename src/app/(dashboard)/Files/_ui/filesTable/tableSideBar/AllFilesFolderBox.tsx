"use client";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { MouseEvent, useState } from "react";

import { BiSolidCabinet } from "react-icons/bi";

export default function AllFilesFolderBox({ setCheckAll }: any) {
  const [isHovered, setIsHovered] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();

  const queryClient = useQueryClient();

  function handleClick() {
    queryClient.setQueryData(["fileIds"], []);
    setCheckAll(false);
    const params = new URLSearchParams(searchParams);
    params.delete("id");
    replace(`${pathname}?${params.toString()}`);
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
      <BiSolidCabinet fontSize="1.5rem" fill={isHovered ? "#527A01" : "#777"} />
      All Files
    </button>
  );
}
