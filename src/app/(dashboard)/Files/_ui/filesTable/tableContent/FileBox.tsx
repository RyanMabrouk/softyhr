"use client";

import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import FilesCheckBox from "../../components/FilesCheckBox";
import { FaRegFileImage } from "react-icons/fa6";
import { FaRegFilePdf } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import FileDownloadButton from "../../components/FileDownloadButton";
import FilesSelectSettingsArrowDown from "../../components/FilesSelectSettingsArrowDown";
import { useRouter } from "next/navigation";
import { formatDateFiles } from "@/helpers/date.helpers";
import { ItemTypes } from "@/constants/filesConstants";
import { moveFile } from "@/actions/files/moveFile";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFile } from "@/actions/files/addFile";
import { UploadImage } from "@/actions/UploadFiles/uploadImage";
import getSession from "@/api/getSession";

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

  const { toast } = useToast();
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const [selectedOption, setSelectOption] = useState(null);

  const data: any = queryClient.getQueryData(["fileIds"]);
  useEffect(() => {
    setIsChecked(data?.includes(id) || false);
  }, [data, id]);
  const [isChecked, setIsChecked] = useState(data?.includes(id) || false);
  function handleCheck(id: any) {
    const data: any = queryClient.getQueryData(["fileIds"]);
    if (data?.includes(id)) {
      setIsChecked(false);
      removeFileId(id);
    } else {
      setIsChecked(true);
      pushFileId(id);
    }
  }

  ///////////////////////////////////////
  // DUPLICATE FILE
  ///////////////////////////////////////
  const { mutateAsync: duplicateFileApi } = useMutation({
    mutationFn: async (payload: any) => {
      const { error }: any = await addFile(payload);
      if (error) {
        toast.error("error found while uploading .Please Try Again  ");
      } else {
        toast.success("File Duplicated", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  async function handleDuplicate() {
    console.log(file);
    if (file.size > 50000000) {
      toast.error("the size of the file cannot exceed 50MB ");
    } else {
      const { file_url, name, org_name, size, file_type, folderId } = file;
      const session = await getSession();
      const user_id = session?.user?.id;

      const payload = {
        file_url,
        addedBy: user_id,
        name: "Duplicated " + name,
        org_name,
        size,
        file_type,
        folderId,
      };
      duplicateFileApi(payload);
    }
  }

  ///////////////////////////////////////
  //SELECT OPTIONS
  ///////////////////////////////////////
  function handleSelectedOption(option: any) {
    setSelectOption(option);
  }
  useEffect(() => {
    if (selectedOption === "rename") {
      replace(`Files?popup=RENAME_FILE&fileId=${id}`);
      handleSelectedOption(null);
    }
    if (selectedOption === "delete") {
      replace(`Files?popup=DELETE_FILE&fileId=${id}`);
      handleSelectedOption(null);
    }
    if (selectedOption === "duplicate") {
      console.log("duplicate");
      handleDuplicate();
      handleSelectedOption(null);
    }
    if (selectedOption === "emailAtt") {
      replace(`Files?popup=SEND_EMAIL_FILE&fileId=${id}`);
      handleSelectedOption(null);
    }
    if (selectedOption === "share") {
      replace(`Files?popup=SHARE_FILE&fileId=${id}`);
      handleSelectedOption(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, replace, id]);

  ///////////////////////////////////////
  //DRAG AND DROP
  ///////////////////////////////////////
  const { mutateAsync: moveFileApi } = useMutation({
    mutationFn: async ({ id: fileId, folderId: newFolderId }: any) => {
      const error = await moveFile(fileId, newFolderId);
      if (error) {
        toast.error("Error occured while moving the file please try again");
      } else {
        toast.success("File Moved", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.File,
    end(item, monitor) {
      const dropResult: any = monitor.getDropResult();
      const folderId = dropResult ? dropResult?.id : null;
      if (folderId && folderId !== file.folderId) {
        moveFileApi({ id, folderId });
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      className={`flex cursor-pointer items-center justify-between border-b-2 border-stone-200 p-2.5 transition-all  [&>*:nth-child(2)]:hover:flex  ${
        isChecked
          ? "bg-color-primary-13 hover:bg-color-primary-12  "
          : "hover:bg-gray-14"
      } `}
    >
      <div className="flex items-center gap-3  ">
        <FilesCheckBox
          isChecked={isChecked}
          handleCheck={() => handleCheck(id)}
        />
        {(type === "application" && (
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
        <FileDownloadButton fileUrl={file_url} fileName={name} />
        <FilesSelectSettingsArrowDown
          options={[
            { value: "share", label: "Share With Employees" },
            { value: "emailAtt", label: "Email Attachment" },
            { value: "rename", label: "Rename" },
            { value: "duplicate", label: "Duplicate" },
            { value: "delete", label: "Delete" },
          ]}
          onSelect={handleSelectedOption}
        />
      </div>
    </div>
  );
}
