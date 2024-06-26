import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import ButtonPopUp from "../components/ButtonPopUp";
import deleteFolder from "@/actions/files/deleteFolder";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import useFolderData from "@/hooks/files/useFolderData";
import LoaderPopUp from "../components/Loader/LoaderPopUp/LoaderPopUp";
import { InputGeneric } from "@/app/_ui/InputGeneric";

export default function DeleteFolderPopUp() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const params = useParams();
  const Router = useRouter();
  const pathname = usePathname();
  const { handleSubmit } = useForm();

  const [isTypingDelete, setIsTypingDelete] = useState("");
  const id = Number(params.folderId);

  const { folder } = useFolderData(id);
  const isPending = folder.isPending;

  const { mutateAsync: deleteFold } = useMutation({
    mutationFn: async (folderId: number) => {
      const { error } = await deleteFolder(folderId);
      if (error) {
        toast.error("Folder isn't deleted please try again");
      } else {
        toast.success("Folder Deleted", "Success");
        Router.push(pathname);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      Router.push(pathname);
    },
  });

  return (
    <>
      {isPending ? (
        <div className="z-50">
          <LoaderPopUp />
        </div>
      ) : (
        <PopUpSkeleton title={"Just Checking ..."}>
          <form
            onSubmit={handleSubmit(() => deleteFold(Number(id)))}
            className=" shadow-popup px-auto flex min-w-[40rem] flex-col items-center gap-2 rounded-sm bg-white px-12 py-8"
          >
            <FaRegTrashCan fontSize="3.6rem" fill="#C20C0C" />

            <p className="mt-4 w-[28rem] text-center text-lg ">
              {`Are you sure you want to delete the folder "${
                folder?.data?.[0]?.name
              }" 
              ${
                folder?.data?.[0]?.files?.length
                  ? `and all of its  ${folder?.data[0]?.files?.length} 
              files?`
                  : ""
              } `}
            </p>

            <div className="mt-4 flex max-h-96 w-11/12 flex-col items-center gap-4 overflow-y-auto bg-gray-14 px-6 py-8">
              <div className="flex  w-[28rem] flex-col items-center  gap-4 px-2">
                <p className="text-center text-sm text-color2-500">
                  Type <strong>"Delete"</strong> to permanently remove the
                  folder and its files.
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
                Delete Folder
              </ButtonPopUp>
              <button
                className="min-w-[10rem] cursor-pointer rounded-md bg-gray-4 px-4 py-2 font-semibold text-gray-23 transition-all ease-linear hover:bg-gray-6 "
                type="button"
                onClick={() => {
                  queryClient.setQueryData(["fileIds"], []);
                  Router.push(pathname);
                }}
              >
                Keep Folder
              </button>
            </div>
          </form>
        </PopUpSkeleton>
      )}
    </>
  );
}
