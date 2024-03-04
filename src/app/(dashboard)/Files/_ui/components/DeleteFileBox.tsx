import { formatDateFiles } from "@/helpers/date.helpers";
import useFileData from "@/hooks/files/useFileData";
import React from "react";
import { FaRegFileImage, FaRegFilePdf } from "react-icons/fa6";
import LoaderPopUp from "./Loader/LoaderPopUp/LoaderPopUp";

export default function DeleteFileBox({ fileId }: { fileId: number }) {
  const { file } = useFileData(fileId);
  const isPending = file.isPending;

  return (
    <>
      {isPending ? (
        <LoaderPopUp />
      ) : (
        <div className="flex  w-[28rem] flex-col items-center  gap-4 p-6">
          {(file?.data?.file_type === "application" && (
            <FaRegFilePdf fontSize="2.6rem" fill="#cc4373" />
          )) ||
            (file?.data?.file_type === "image" && (
              <FaRegFileImage fontSize="2.6rem" fill="#777270" />
            ))}
          <div>
            <p className="text-center text-lg ">{file?.data?.name}</p>
            <p className="text-center text-sm text-gray-15">
              Created {formatDateFiles(file?.data?.created_at)} (
              {file?.data?.size}KB)
            </p>
          </div>
        </div>
      )}
    </>
  );
}
