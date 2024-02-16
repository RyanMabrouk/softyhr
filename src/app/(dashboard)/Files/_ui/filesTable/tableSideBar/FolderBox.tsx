"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/constants/filesConstants";
import { FaFolder } from "react-icons/fa6";
import { IoFolderOpenSharp } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilesSelectArrowDown from "../../components/FilesSelectArrowDown";
import { useQueryClient } from "@tanstack/react-query";
import useFoldersIds from "@/hooks/useFoldersIds";
import RoleGuard from "@/app/_ui/RoleGuard";
import useUserRole from "@/hooks/useUserRole";

export default function FolderBox({ folder, setCheckAll }: any) {
  let { id, name, files } = folder;
  const { filesIds } = useFoldersIds();
  // active user role
  const {
    role: { data: role },
  } = useUserRole();
  const numFiles = role?.permissions.includes("read:files")
    ? files?.map((file: any) => file.id)?.length
    : files
        ?.map((file: any) => file.id)
        .filter((id: any) => filesIds.includes(id))?.length;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedOption, setSelectOption] = useState(null);

  useEffect(() => {
    if (selectedOption === "rename") {
      replace(`Files?popup=RENAME_FOLDER&id=${id}`);
      handleSelectedOption(null);
    }
    // if (selectedOption === "share") {
    //   replace(`Files?popup=SHARE_FOLDER&id=${id}`);
    //   handleSelectedOption(null);
    // }
    if (selectedOption === "delete") {
      replace(`Files?popup=DELETE_FOLDER&id=${id}`);
      handleSelectedOption(null);
    }
  }, [selectedOption, replace, name, id]);

  function handleSelectedOption(option: any) {
    setSelectOption(option);
  }

  const handleHover = (event: MouseEvent<HTMLElement>) => {
    setIsHovered(true);
  };
  const handleLeave = (event: MouseEvent<HTMLElement>) => {
    setIsHovered(false);
  };

  const queryClient = useQueryClient();

  function handleClick(term: any) {
    setCheckAll(false);
    queryClient.setQueryData(["fileIds"], []);
    const params = new URLSearchParams(searchParams);
    params.delete("folderName");
    if (term) {
      params.set("id", term);
    } else {
      params.delete("id");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.File,
      drop: (item, monitor) => {
        return { id };
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [id],
  );

  return (
    <div
      className={`flex h-12 w-11/12 cursor-pointer items-center justify-between rounded-md p-3 transition-all ${isHovered || isOver ? "bg-white [&>*:nth-child(2)]:block" : ""}  `}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={() => handleClick(folder.id)}
      ref={drop}
    >
      {isHovered || isOver ? (
        <button className=" flex w-full items-center  gap-3 text-base  text-stone-500 transition-all  duration-300 hover:text-color-primary-8">
          <IoFolderOpenSharp fontSize="1.3rem" fill="#527A01" />
          {name}
          <span className="text-sm text-stone-400"> ({numFiles})</span>
        </button>
      ) : (
        <button className="flex w-full items-center   gap-3 text-base  text-stone-500 transition-all  duration-300 hover:text-color-primary-8">
          <FaFolder fontSize="1.3rem" fill="#777" />
          {name}
          <span className="text-sm text-stone-400"> ({numFiles})</span>
        </button>
      )}
      <RoleGuard permissions={["delete:files"]}>
        <FilesSelectArrowDown
          options={[
            { value: "rename", label: "Rename..." },
            // { value: "share", label: "Share Folder..." },
            { value: "delete", label: "Delete..." },
          ]}
          onSelect={handleSelectedOption}
        />
      </RoleGuard>
    </div>
  );
}

///
