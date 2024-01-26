"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import UploadInput from "../components/UploadInput";
import DragAndDropFileInput from "../components/DragAndDropFile";
import UploadFileCheckBox from "../components/UploadFileCheckBox";
import ButtonPopUp from "../components/ButtonPopUp";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import FilesSelectComponent from "../components/FilesSelectComponent";
import useData from "@/hooks/useData";
import { UploadImage } from "@/actions/UploadFiles/uploadImage";
import { v4 as uuidv4 } from "uuid";
import getCurrentorg from "@/api/getCurrentOrg";
import getSession from "@/api/getSession";
import { addFile } from "@/actions/files/addFile";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";

interface FileObject {
  size: number;
  name: string;
}

export default function UploadFilePopUp() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const Router = useRouter();
  const pathname = usePathname();
  const { handleSubmit } = useForm();
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [canUpload, setCanUpload] = useState(true);

  // const [isTyping, setIsTyping] = useState("");

  const {
    folders: { data: allFolders, isPending },
  } = useData();
  const options: any = [];
  !isPending &&
    allFolders?.map((fold: any) => {
      options.push({ label: fold.name, value: fold.id });
    });
  function handleSelect(id: any) {
    setSelectedFolder(id);
  }

  const { mutateAsync: addFileApi } = useMutation({
    mutationFn: async (payload: any) => {
      const { error }: any = await addFile(payload);
      if (error) {
        toast.error("error found while uploading .Please Try Again  ");
      } else {
        toast.success("File Created", "Success");
        Router.push(pathname);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  async function uploadImage(fileData: any) {
    const fileType = fileData.type.split("/")[0];
    const fileTypeExt = fileData.type.split("/")[1];

    const formData: any = new FormData();
    formData.append("file", fileData);
    const fileName = "file_name" + uuidv4() + `.${fileTypeExt}`;
    const { uploaded } = await UploadImage(formData, fileName, "files");
    return { uploaded, fileName, fileType, fileData };
  }

  async function onSubmit() {
    const l = files.length;

    for (let i = 0; i <= l - 1; i++) {
      if (files[i].size > 50000000) {
        toast.error("the size of the file cannot exceed 50MB ");
      } else if (!selectedFolder) {
        toast.error("Please Choose a Folder ... ");
      } else {
        const { uploaded, fileName, fileType, fileData }: any =
          await uploadImage(files[i]);
        if (uploaded) {
          const org = await getCurrentorg();
          const orgName = org?.name;
          const { name, size } = fileData;

          const session = await getSession();
          const user_id = session?.user?.id;

          const payload = {
            file_url: `https://ybwqmrrlvmpdikvmkqra.supabase.co/storage/v1/object/public/files/${fileName}`,
            addedBy: user_id,
            name: name,
            org_name: orgName,
            size: Math.round(size / 1000),
            file_type: fileType,
            folderId: selectedFolder,
          };
          addFileApi(payload);
        }
      }
    }
  }

  const [files, setFiles] = useState<FileObject[]>([]);
  const isThereFile = files.length !== 0;

  function handleRemoveFile(name: string) {
    const newFiles = files.filter((file: FileObject) => {
      return file.name !== name;
    });
    setFiles(newFiles);
  }
  function handleAddFile(selectedFile: any) {
    const newFiles = [...files, selectedFile];
    setFiles(newFiles);
  }

  return (
    <>
      <PopUpSkeleton
        title={"Upload Files"}
        className="shadow-popup px-auto flex min-w-[35rem] flex-col items-center gap-2 rounded-sm bg-white px-8 py-4 "
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4 px-2 pt-3"
        >
          <div className="flex flex-col gap-4">
            <div
              className={`flex items-center gap-4 ${isThereFile ? "" : "self-center"}`}
            >
              <DragAndDropFileInput
                isThereFile={isThereFile}
                handleAddFile={handleAddFile}
                files={files}
                handleRemoveFile={handleRemoveFile}
              />
            </div>
            {isThereFile ? "" : <p className="text-center">or</p>}
            <div className={`${isThereFile ? "" : "self-center"} `}>
              <UploadInput
                isThereFile={isThereFile}
                handleAddFile={handleAddFile}
              />
            </div>
          </div>

          <div
            className={`flex flex-col gap-4 bg-gray-17 px-4 py-6 ${
              isThereFile ? "" : "opacity-60"
            } `}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="select" className="placeholder:text-gray-20">
                Choose a Folder
              </label>
              <FilesSelectComponent
                isThereFile={isThereFile}
                options={options}
                onSelect={handleSelect}
              />
            </div>
            <div className="flex items-center gap-2">
              <UploadFileCheckBox isThereFile={isThereFile} />
              <p className="mb-1 text-gray-20">
                Share these file(s) with all Employees
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="input" className="text-gray-20">
                Share These File(s) with Individuals or Groups
              </label>
              <input
                type="text"
                placeholder="Enter names or groups"
                disabled={!isThereFile}
                className="p-2 outline-1 transition-all duration-300 focus:outline-color1-300"
              />
            </div>
          </div>

          <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
          <div className="flex flex-row gap-4 px-2 pt-3">
            <ButtonPopUp check={!isThereFile} className="!w-fit">
              Upload
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
