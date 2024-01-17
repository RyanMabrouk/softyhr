"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa6";
import { IoFolderOpenSharp } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilesSelectArrowDown from "../../components/FilesSelectArrowDown";

export default function FolderBox({ folder }: any) {
  const { name } = folder;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedOption, setSelectOption] = useState(null);

  useEffect(() => {
    if (selectedOption === "rename") {
      replace(`Files?popup=RENAME_FOLDER&folderName=${name}`);
      handleSelectedOption(null);
    }
    if (selectedOption === "share") {
      replace(`Files?popup=SHARE_FOLDER&folderName=${name}`);
      handleSelectedOption(null);
    }
    if (selectedOption === "delete") {
      replace(`Files?popup=DELETE_FOLDER&folderName=${name}&numFiles=${2}`);
      handleSelectedOption(null);
    }
  }, [selectedOption, replace, name]);

  function handleSelectedOption(option: any) {
    setSelectOption(option);
  }

  const handleHover = (event: MouseEvent<HTMLElement>) => {
    setIsHovered(true);
  };
  const handleLeave = (event: MouseEvent<HTMLElement>) => {
    setIsHovered(false);
  };

  function handleClick(term1: any, term2: any) {
    const params = new URLSearchParams(searchParams);
    if (term1 && term2) {
      params.set("folderName", term1);
      params.set("numFiles", term2);
    } else {
      params.delete("folderName");
      params.delete("numFiles");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      className="flex h-12 w-11/12 cursor-pointer items-center justify-between rounded-md p-3 transition-all hover:bg-white [&>*:nth-child(2)]:hover:block "
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={() => handleClick(folder.name, 2)}
    >
      {isHovered ? (
        <button className=" flex w-full items-center  gap-3 text-base  text-stone-500 transition-all  duration-300 hover:text-color-primary-8">
          <IoFolderOpenSharp fontSize="1.3rem" fill="#527A01" />
          {name}
          <span className="text-sm text-stone-400"> ({2})</span>
        </button>
      ) : (
        <button className="flex w-full items-center   gap-3 text-base  text-stone-500 transition-all  duration-300 hover:text-color-primary-8">
          <FaFolder fontSize="1.3rem" fill="#777" />
          {name}
          <span className="text-sm text-stone-400"> ({2})</span>
        </button>
      )}

      {/* <button className=" hidden p-1 transition-all duration-300 hover:border hover:border-stone-400">
        <TiArrowSortedDown fill="#232323" />
      </button> */}
      <div className="">
        <FilesSelectArrowDown
          options={[
            { value: "rename", label: "Rename..." },
            { value: "share", label: "Share Folder..." },
            { value: "delete", label: "Delete..." },
          ]}
          onSelect={handleSelectedOption}
        />
      </div>
    </div>
  );
}
