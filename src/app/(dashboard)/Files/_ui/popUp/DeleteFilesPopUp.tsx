import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import ButtonPopUp from "../components/ButtonPopUp";
import { useForm } from "react-hook-form";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteFile from "@/actions/files/deleteFile";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import LoaderPopUp from "../components/Loader/LoaderPopUp/LoaderPopUp";
import DeleteFileBox from "../components/DeleteFileBox";
import { InputGeneric } from "@/app/_ui/InputGeneric";

export default function DeleteFilesPopUp() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const Router = useRouter();
  const pathname = usePathname();
  const { handleSubmit } = useForm();

  const [isTypingDelete, setIsTypingDelete] = useState("");

  const fileIds: any = queryClient.getQueryData(["fileIds"]);

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

  function onSubmit() {
    fileIds?.forEach((id: any) => {
      deleteFileApi(id);
    });
  }

  return (
    <>
      {false ? (
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
              Are you sure you want to delete these files?
            </p>
            <div className="mt-4 flex max-h-96 w-11/12 flex-col items-center gap-4 overflow-y-auto overflow-x-hidden rounded-sm bg-gray-14 px-6 py-8">
              <div className="flex  w-[24rem] flex-col items-center px-4">
                {fileIds?.map((fileId: any) => (
                  <DeleteFileBox fileId={fileId} key={fileId} />
                ))}
              </div>
              <p className="w-[30rem] text-center text-sm text-color2-500">
                These files will be removed from onboarding tasks, offboarding
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
            <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
            <div className="flex flex-row gap-4 self-start px-2 pt-3">
              <ButtonPopUp check={!(isTypingDelete === "Delete")}>
                Delete Files
              </ButtonPopUp>
              <button
                className="min-w-[10rem] cursor-pointer rounded-md bg-gray-4 px-4 py-2 font-semibold text-gray-23 transition-all ease-linear hover:bg-gray-6 "
                type="button"
                onClick={() => {
                  queryClient.setQueryData(["fileIds"], []);
                  Router.push(pathname);
                }}
              >
                {fileIds?.length === 1 ? "Keep File" : "Keep Files"}
              </button>
            </div>
          </form>
        </PopUpSkeleton>
      )}
    </>
  );
}
