"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/constants/filesConstants";
import { FaFolder } from "react-icons/fa6";
import { IoFolderOpenSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import FilesSelectArrowDown from "../../_ui/components/FilesSelectArrowDown";
import { useQueryClient } from "@tanstack/react-query";
import useFoldersIds from "@/hooks/files/useFoldersIds";
import useUserRole from "@/hooks/Roles/useUserRole";
import {
  database_files_type,
  database_folder_type,
} from "@/types/database.tables.types";
import { getTailwindColor } from "@/helpers/getTailwindColor";
const primary = getTailwindColor("fabric-700");
const grey = getTailwindColor("gray-30");
export default function FolderBox({
  folder,
  setCheckAll,
}: {
  folder: database_folder_type & { files: database_files_type[] };
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>> | undefined;
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

  const Router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedOption, setSelectOption] = useState<string | null>(null);

  useEffect(() => {
    if (selectedOption === "rename") {
      Router.push(`/Files/${folder.id}?popup=RENAME_FOLDER&folderName=${name}`);
      handleSelectedOption(null);
    }
    if (selectedOption === "share") {
      Router.push(`/Files/${folder.id}?popup=SHARE_FOLDER`);
      handleSelectedOption(null);
    }
    if (selectedOption === "delete") {
      Router.push(`/Files/${folder.id}?popup=DELETE_FOLDER`);
      handleSelectedOption(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, name, id]);

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

  function handleClick() {
    setCheckAll && setCheckAll(false);
    queryClient.setQueryData(["fileIds"], []);
    Router.push(`/Files/${folder.id}`);
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
      className={`flex h-10 w-11/12 cursor-pointer items-center gap-1 rounded-md px-3 py-4 transition-all ${isHovered || isOver ? "bg-white [&>*:nth-child(2)]:block" : ""}  `}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={() => handleClick()}
      ref={drop}
    >
      <button className="  flex w-full flex-row items-center justify-between text-left text-base  text-gray-30 transition-all  duration-300 hover:text-fabric-700">
        <div className="flex flex-row items-center gap-1.5">
          {isHovered || isOver ? (
            <IoFolderOpenSharp fontSize="1.3rem" fill={primary} />
          ) : (
            <FaFolder fontSize="1.3rem" fill={grey} />
          )}
          <span className="line-clamp-1">{name}</span>
        </div>
        <span className="text-sm "> ({numFiles})</span>
      </button>
      <FilesSelectArrowDown options={options} onSelect={handleSelectedOption} />
    </div>
  );
}

///
