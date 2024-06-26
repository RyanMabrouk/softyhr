import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaRegFileImage, FaRegFilePdf, FaRegTrashCan } from "react-icons/fa6";
import ButtonPopUp from "../components/ButtonPopUp";
import { useForm } from "react-hook-form";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteFile from "@/actions/files/deleteFile";
import useFileData from "@/hooks/files/useFileData";
import { formatDateFiles } from "@/helpers/date.helpers";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import LoaderPopUp from "../components/Loader/LoaderPopUp/LoaderPopUp";
import { InputGeneric } from "@/app/_ui/InputGeneric";

export default function DeleteFilePopUp() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const Router = useRouter();
  const pathname = usePathname();
  const { handleSubmit } = useForm();

  const [isTypingDelete, setIsTypingDelete] = useState("");
  const id = searchParams.get("fileId");

  const { file } = useFileData(Number(id));
  const isPending = file.isPending;

  const { mutateAsync: deleteFileApi } = useMutation({
    mutationFn: async (id: any) => {
      const { error } = await deleteFile(id);
      if (error) {
        toast.error("File isn't deleted please try again");
      } else {
        toast.success("File Deleted", "Success");
        Router.push(pathname);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
  const fileIds: any = queryClient.getQueryData(["fileIds"]);

  function onSubmit() {
    if (fileIds.includes(Number(id))) {
      const newFilesIds: any = fileIds?.filter(
        (fileid: any) => fileid !== Number(id),
      );

      queryClient.setQueryData(["fileIds"], newFilesIds);
    }
    const { error }: any = deleteFileApi(id);
  }

  return (
    <>
      {isPending ? (
        <div className="z-50">
          <LoaderPopUp />
        </div>
      ) : (
        <PopUpSkeleton title={"Just Checking ..."}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" shadow-popup px-auto flex min-w-[40rem] flex-col items-center gap-2 rounded-sm bg-white px-12 py-8"
          >
            <FaRegTrashCan fontSize="3.6rem" fill="#C20C0C" />
            <p className="text-lg ">
              Are you sure you want to delete this file?
            </p>
            <div className="mt-4 flex max-h-96 w-11/12 flex-col items-center gap-4 overflow-hidden rounded-sm bg-gray-14 px-6 py-8">
              <div className="flex  w-[28rem] flex-col items-center  gap-4 p-6">
                {(file?.data?.file_type === "application" && (
                  <FaRegFilePdf fontSize="3rem" fill="#cc4373" />
                )) ||
                  (file?.data?.file_type === "image" && (
                    <FaRegFileImage fontSize="3rem" fill="#777270" />
                  ))}
                <div className="flex flex-col items-center">
                  <p className="line-clamp-1 w-[70%] px-12 text-center text-xl ">
                    {file?.data?.name}
                  </p>
                  <p className="text-center text-sm text-gray-15">
                    Created {formatDateFiles(file?.data?.created_at)} (
                    {file?.data?.size}KB)
                  </p>
                </div>
                <p className="text-center text-sm text-color2-500">
                  This file will be removed from onboarding tasks, offboarding
                  tasks, offer letters, and company announcements.
                </p>
                <p className="text-center text-sm text-color2-500">
                  Type <strong>"Delete"</strong> to continue
                </p>
                <InputGeneric
                  type="text"
                  name="checkDelete"
                  value={isTypingDelete}
                  setValueInParent={setIsTypingDelete}
                  shadow="red"
                />
              </div>
            </div>
            <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
            <div className="flex flex-row gap-4 self-start px-2 pt-3">
              <ButtonPopUp check={!(isTypingDelete === "Delete")}>
                Delete File
              </ButtonPopUp>
              <button
                className="min-w-[10rem] cursor-pointer rounded-md bg-gray-4 px-4 py-2 font-semibold text-gray-23 transition-all ease-linear hover:bg-gray-6 "
                type="button"
                onClick={() => {
                  queryClient.setQueryData(["fileIds"], []);
                  Router.push(pathname);
                }}
              >
                Keep File
              </button>
            </div>
          </form>
        </PopUpSkeleton>
      )}
    </>
  );
}
