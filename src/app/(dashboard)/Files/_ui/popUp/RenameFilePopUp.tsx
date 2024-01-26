import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import ButtonPopUp from "../components/ButtonPopUp";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { renameFile } from "@/actions/files/renameFile";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";

export default function RenameFilePopUp() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const Router = useRouter();
  const pathname = usePathname();
  const { handleSubmit } = useForm();
  const searchParams = useSearchParams();

  const [isTyping, setIsTyping] = useState("");
  const id = searchParams.get("fileId");

  /////
  const { mutateAsync: renameFileApi } = useMutation({
    mutationFn: async ({ id: fileId, isTyping: newName }: any) => {
      const error = await renameFile(fileId, newName);
      if (error) {
        toast.error("File name existed Please try another name");
        setIsTyping("");
      } else {
        toast.success("File Name Changed", "Success");
        Router.push(pathname);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });

  function onSubmit() {
    const { error }: any = renameFileApi({ id, isTyping });
  }

  return (
    <>
      <PopUpSkeleton
        title={"Rename File"}
        className="shadow-popup px-auto flex min-w-[35rem] flex-col items-center gap-2 rounded-sm bg-white px-8 py-4"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4 px-2 pt-3"
        >
          <label htmlFor="input">Enter a new name for this file</label>
          <input
            type="text"
            value={isTyping}
            onChange={(e) => setIsTyping(e.target.value)}
            className=" w-80 border border-stone-400 px-2 py-1 outline-1 transition-all duration-300 focus:outline-color1-300 "
          />

          <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
          <div className="flex flex-row gap-4 px-2 pt-3">
            <ButtonPopUp check={isTyping === ""} className="!w-fit">
              Save
            </ButtonPopUp>
            <button
              className="cursor-pointer text-color5-500 hover:underline "
              type="button"
              onClick={() => {
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
