"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/constants/filesConstants";
import { FaFolder } from "react-icons/fa6";
import { IoFolderOpenSharp } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import FilesSelectArrowDown from "../../_ui/components/FilesSelectArrowDown";
import { useQueryClient } from "@tanstack/react-query";
import useFoldersIds from "@/hooks/files/useFoldersIds";
import useUserRole from "@/hooks/Roles/useUserRole";
import {
  database_files_type,
  database_folder_type,
} from "@/types/database.tables.types";
export default function FolderBox({
  folder,
  setCheckAll,
}: {
  folder: database_folder_type & { files: database_files_type[] };
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  const { filesIds } = useFoldersIds();
  const { folderId } = useParams();
  // active user role
  const {
    role: { data: role },
  } = useUserRole();
  const numFiles = role?.permissions.includes("read:files")
    ? folder.files?.map((file) => file.id)?.length
    : folder.files?.map((file) => file.id).filter((id) => filesIds.includes(id))
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
  }, [selectedOption, folder.name, folder.id]);

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
        return { id: folder.id };
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [folder.id],
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
      className={`flex h-10 w-full cursor-pointer items-center gap-1 rounded-md px-3 py-4 transition-all ${isHovered || isOver ? "bg-white [&>*:nth-child(2)]:block" : ""}  `}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={() => handleClick()}
      // TODO: fix this type issue ( possible bug )
      ref={drop as unknown as React.RefObject<HTMLDivElement> | null}
    >
      <button className="  flex w-full flex-row items-center justify-between text-left text-base  text-gray-30 transition-all  duration-300 hover:text-fabric-700">
        <div className="line-clamp-1 flex flex-row items-center gap-1.5 break-all ">
          {isHovered || isOver || folder.id === Number(folderId) ? (
            <IoFolderOpenSharp className="h-5 min-h-5 w-5 min-w-5 text-fabric-700" />
          ) : (
            <FaFolder className="h-5 min-h-5 w-5 min-w-5 text-gray-30" />
          )}
          <span className="line-clamp-1 break-all ">{folder.name}</span>
        </div>
        <span className="text-sm "> ({numFiles})</span>
      </button>
      <FilesSelectArrowDown options={options} onSelect={handleSelectedOption} />
    </div>
  );
}

///
