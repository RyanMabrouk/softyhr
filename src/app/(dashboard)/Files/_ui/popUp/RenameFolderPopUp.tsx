import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import ButtonPopUp from "../components/ButtonPopUp";
import { renameFolder } from "@/actions/files/renameFolder";
import { useForm } from "react-hook-form";
import Error from "../components/Error";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateData from "@/api/updateData";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";

export default function RenameFolderPopUp() {
  const Router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { handleSubmit } = useForm();

  const folderName = searchParams.get("folderName");
  const folderId = searchParams.get("id");
  const [isTyping, setIsTyping] = useState("");

  /////
  const { mutateAsync: renameFold } = useMutation({
    mutationFn: async ({ folderId: foldId, isTyping: newName }: any) => {
      const error = await renameFolder(foldId, newName);
      if (error) {
        toast.error("Folder name existed Please try another name");
        setIsTyping("");
      } else {
        toast.success("Folder Name Changed", "Success");
        Router.push(pathname);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  function onSubmit() {
    const { error }: any = renameFold({ folderId, isTyping });
  }

  return (
    <>
      <PopUpSkeleton
        title={"Rename Folder"}
        className="shadow-popup px-auto flex min-w-[35rem] flex-col items-center gap-2 rounded-sm bg-white px-8 py-4"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4 px-2 pt-3"
        >
          <label htmlFor="input">Enter a new name for this folder</label>
          <input
            type="text"
            placeholder={folderName ? folderName : ""}
            value={isTyping}
            onChange={(e) => setIsTyping(e.target.value)}
            className=" w-80 border border-stone-400 px-2 py-1 outline-1 transition-all duration-300 focus:outline-color1-300 "
          />

          <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
          <div className="flex flex-row gap-4 px-2 pt-3">
            <ButtonPopUp check={isTyping === ""}>Save</ButtonPopUp>
            <button
              className="cursor-pointer text-color5-500 hover:underline "
              type="button"
              onClick={() => {
                queryClient.setQueryData(["fileIds"], []);
                Router.push(pathname);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </PopUpSkeleton>
    </>
  );
}
