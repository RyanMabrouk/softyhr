import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ButtonPopUp from "../components/ButtonPopUp";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { renameFile } from "@/actions/files/renameFile";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import { InputGeneric } from "@/app/_ui/InputGeneric";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";

export default function RenameFilePopUp() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const Router = useRouter();
  const pathname = usePathname();
  const { handleSubmit } = useForm();
  const searchParams = useSearchParams();

  const [isTyping, setIsTyping] = useState("");
  const id = searchParams.get("fileId");
  const name = searchParams.get("fileName");

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
      Router.push(pathname);
    },
  });

  return (
    <>
      <PopUpSkeleton
        title={"Rename File"}
        className="shadow-popup px-auto flex min-w-[35rem] flex-col items-center gap-2 rounded-sm bg-white px-8 py-4"
      >
        <form
          onSubmit={handleSubmit(() => renameFileApi({ id, isTyping }))}
          className="flex w-full flex-col gap-2 px-2 pt-3"
        >
          <InputGeneric
            label="Enter a new name for this file"
            name="input"
            type="text"
            placeholder={name ?? ""}
            defaultValue={name ?? ""}
            setValueInParent={setIsTyping}
            className=" !h-9 !min-w-[17.5rem]"
          />

          <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
          <div className="flex flex-row gap-4 px-2 pt-3">
            <ButtonPopUp check={isTyping === ""}>Save</ButtonPopUp>
            <CancelBtnGeneric
              onClick={() => {
                queryClient.setQueryData(["fileIds"], []);
                Router.push(pathname);
              }}
            />
          </div>
        </form>
      </PopUpSkeleton>
    </>
  );
}
