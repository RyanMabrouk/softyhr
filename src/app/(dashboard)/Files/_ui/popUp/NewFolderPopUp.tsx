import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import ButtonPopUp from "../components/ButtonPopUp";
import { addFolder } from "@/actions/files/addFolder";
import Error from "../components/Error";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import postData from "@/api/postData";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";

export default function NewFolderPopUp() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const Router = useRouter();
  const pathname = usePathname();
  const { handleSubmit } = useForm();

  const [isTyping, setIsTyping] = useState("");

  const { mutateAsync: addFold } = useMutation({
    mutationFn: async (isTyping: any) => {
      const { error }: any = await addFolder(isTyping);
      if (error) {
        toast.error("Folder name existed Please try another name");
        setIsTyping("");
      } else {
        toast.success("Folder Created", "Success");
        Router.push(pathname);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  async function onSubmit() {
    const { error }: any = addFold(isTyping);
  }

  return (
    <>
      <PopUpSkeleton title={"Add Folder"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-popup px-auto flex min-w-[35rem] flex-col items-center gap-2 rounded-sm bg-white px-8 py-4"
        >
          <div className="flex w-full flex-col gap-4 px-2 pt-3">
            <label htmlFor="input">Enter the Name of the new Folder</label>
            <input
              type="text"
              value={isTyping}
              onChange={(e) => setIsTyping(e.target.value)}
              className=" w-80 border border-stone-400 px-2 py-1 outline-1 transition-all duration-300 focus:outline-color1-300 "
            />

            <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
            <div className="flex flex-row gap-4 px-2 pt-3">
              <ButtonPopUp
                // onClick={handleClick}
                check={isTyping === ""}
                className="!w-fit"
              >
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
          </div>
        </form>
      </PopUpSkeleton>
    </>
  );
}
