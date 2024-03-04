"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/constants/filesConstants";
import { FaFolder } from "react-icons/fa6";
import { IoFolderOpenSharp } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilesSelectArrowDown from "../../components/FilesSelectArrowDown";
import { useQueryClient } from "@tanstack/react-query";
import useFoldersIds from "@/hooks/files/useFoldersIds";
import RoleGuard from "@/app/_ui/RoleGuard";
import useUserRole from "@/hooks/useUserRole";
import {
  database_files_type,
  database_folder_type,
} from "@/types/database.tables.types";

export default function FolderBox({
  folder,
  setCheckAll,
}: {
  folder: database_folder_type & { files: database_files_type[] };
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  let { id, name, files } = folder;
  const { filesIds } = useFoldersIds();
  // active user role
  const {
    role: { data: role },
  } = useUserRole();
  const numFiles = role?.permissions.includes("read:files")
    ? files?.map((file) => file.id)?.length
    : files?.map((file) => file.id).filter((id) => filesIds.includes(id))
        ?.length;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedOption, setSelectOption] = useState<string | null>(null);

  useEffect(() => {
    if (selectedOption === "rename") {
      replace(`Files?popup=RENAME_FOLDER&id=${id}&folderName=${name}`);
      handleSelectedOption(null);
    }
    if (selectedOption === "share") {
      replace(`Files?popup=SHARE_FOLDER&id=${id}`);
      handleSelectedOption(null);
    }
    if (selectedOption === "delete") {
      replace(`Files?popup=DELETE_FOLDER&id=${id}`);
      handleSelectedOption(null);
    }
  }, [selectedOption, replace, name, id]);

  function handleSelectedOption(option: string | null) {
    setSelectOption(option);
  }

  const handleHover = (event: MouseEvent<HTMLElement>) => {
    setIsHovered(true);
  };
  const handleLeave = (event: MouseEvent<HTMLElement>) => {
    setIsHovered(false);
  };

  const queryClient = useQueryClient();

  function handleClick(term: number) {
    setCheckAll(false);
    queryClient.setQueryData(["fileIds"], []);
    const params = new URLSearchParams(searchParams);
    params.delete("folderName");
    if (term) {
      params.set("id", String(term));
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
  const options = [{ value: "rename", label: "Rename..." }];
  if (role?.permissions.includes("share:files")) {
    options.push({ value: "share", label: "Share Folder..." });
  }
  if (role?.permissions.includes("delete:files")) {
    options.push({ value: "delete", label: "Delete..." });
  }
  return (
    <div
      className={`flex h-12 w-11/12 cursor-pointer items-center justify-between rounded-md p-3 transition-all ${isHovered || isOver ? "bg-white [&>*:nth-child(2)]:block" : ""}  `}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={() => handleClick(folder.id)}
      ref={drop}
    >
      <button className="  flex w-full flex-row items-center gap-3  text-left text-base  text-stone-500 transition-all  duration-300 hover:text-color-primary-8">
        {isHovered || isOver ? (
          <IoFolderOpenSharp fontSize="1.3rem" fill="#527A01" />
        ) : (
          <FaFolder fontSize="1.3rem" fill="#777" />
        )}
        <span className="line-clamp-1">{name}</span>
        <span className="text-sm text-stone-400"> ({numFiles})</span>
      </button>

      <RoleGuard permissions={["delete:files"]}>
        <FilesSelectArrowDown
          options={options}
          onSelect={handleSelectedOption}
        />
      </RoleGuard>
    </div>
  );
}

///
