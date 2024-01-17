"use client";

import React, { useEffect, useState } from "react";
import FilesCheckBox from "../../components/FilesCheckBox";
import { AiOutlineFileText } from "react-icons/ai";
import { FaRegFileImage } from "react-icons/fa6";
import { FaRegFilePdf } from "react-icons/fa";

import FileDownloadButton from "../../components/FileDownloadButton";
import FilesSelectSettingsArrowDown from "../../components/FilesSelectSettingsArrowDown";
import { useRouter } from "next/navigation";
import { formatDateFiles } from "@/helpers/date.helpers";

export default function FileBox({ file, pushFileId, removeFileId }: any) {
  const {
    id,
    name,
    created_at: addedAt,
    addedBy,
    size,
    file_url,
    file_type: type,
  } = file;
  const { replace } = useRouter();

  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectOption] = useState(null);

  useEffect(() => {
    if (selectedOption === "rename") {
      replace(`Files?popup=RENAME_FILE&fileName=${name}`);
      handleSelectedOption(null);
    }
    if (selectedOption === "delete") {
      replace(`Files?popup=DELETE_FILE&fileName=${name}`);
      handleSelectedOption(null);
    }
    if (selectedOption === "emailAtt") {
      replace(`Files?popup=SEND_EMAIL_FILE&fileName=${name}`);
      handleSelectedOption(null);
    }
    if (selectedOption === "share") {
      replace(`Files?popup=SHARE_FILE&fileName=${name}`);
      handleSelectedOption(null);
    }
  }, [selectedOption, replace, name]);

  function handleSelectedOption(option: any) {
    setSelectOption(option);
  }

  function handleCheck(id: number) {
    setIsChecked(!isChecked);
    if (isChecked) {
      removeFileId(id);
    } else {
      pushFileId(id);
    }
  }

  return (
    <div
      className={`flex items-center justify-between border-b-2 border-stone-200 p-2.5 transition-all  [&>*:nth-child(2)]:hover:flex ${
        isChecked
          ? "bg-color-primary-13 hover:bg-color-primary-12  "
          : "hover:bg-gray-14"
      } `}
    >
      <div className="flex items-center gap-3">
        <FilesCheckBox
          isChecked={isChecked}
          handleCheck={() => handleCheck(id)}
        />
        {(type === "pdf" && (
          <FaRegFilePdf fontSize="1.7rem" fill="#cc4373" />
        )) ||
          (type === "image" && (
            <FaRegFileImage fontSize="1.7rem" fill="#777270" />
          ))}
        <div>
          <a
            href={file_url}
            target="_blank"
            className="text-color5-500 hover:text-fabric-600 hover:underline"
          >
            {name}
          </a>
          <p className=" text-[0.85rem] text-stone-500">
            Added {formatDateFiles(addedAt)} by {addedBy} ({size}KB)
          </p>
        </div>
      </div>
      <div className=" z-30 hidden items-center gap-2">
        <FileDownloadButton />
        <FilesSelectSettingsArrowDown
          options={[
            { value: "share", label: "Share With Employees" },
            { value: "emailAtt", label: "Email Attachment" },
            { value: "rename", label: "Rename" },
            { value: "delete", label: "Delete" },
          ]}
          onSelect={handleSelectedOption}
        />
      </div>
    </div>
  );
}
