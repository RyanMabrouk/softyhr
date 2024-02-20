import { formatDateFiles } from "@/helpers/date.helpers";
import useFileData from "@/hooks/files/useFileData";
import React from "react";
import { FaRegFileImage, FaRegFilePdf } from "react-icons/fa6";
import LoaderPopUp from "./Loader/LoaderPopUp/LoaderPopUp";

export default function DeleteFileBox({ fileId }: any) {
  const { file }: any = useFileData(fileId);
  const isPending = file.isPending;

  return (
    <>
      {isPending ? (
        <LoaderPopUp />
      ) : (
        <div className="flex  w-[28rem] flex-col items-center  gap-4 p-6">
          {(file?.data[0]?.file_type === "application" && (
            <FaRegFilePdf fontSize="2.6rem" fill="#cc4373" />
          )) ||
            (file?.data[0]?.file_type === "image" && (
              <FaRegFileImage fontSize="2.6rem" fill="#777270" />
            ))}
          <div>
            <p className="text-center text-lg ">{file?.data[0]?.name}</p>
            <p className="text-center text-sm text-gray-15">
              Created {formatDateFiles(file?.data[0]?.created_at)} (
              {file?.data[0]?.size}KB)
            </p>
          </div>
        </div>
      )}
    </>
  );
}
