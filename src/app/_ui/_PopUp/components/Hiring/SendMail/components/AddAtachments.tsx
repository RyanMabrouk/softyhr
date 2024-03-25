"use client";
import React, { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UploadImage } from "@/actions/UploadFiles/uploadImage";
import { v4 as uuidv4 } from "uuid";
import getCurrentorg from "@/api/getCurrentOrg";
import getSession from "@/api/getSession";
import { addFile } from "@/actions/files/addFile";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import getData from "@/api/getData";
import { IoMdCloseCircleOutline } from "react-icons/io";
import useProfiles from "@/hooks/useProfiles";
import { addFiletoUser } from "@/actions/files/addFiletoUser";
import DragAndDropFileInput from "@/app/(dashboard)/Files/_ui/components/DragAndDropFile";
import UploadInput from "@/app/(dashboard)/Files/_ui/components/UploadInput";
import FilesSelectComponent from "@/app/(dashboard)/Files/_ui/components/FilesSelectComponent";
import UploadFileCheckBox from "@/app/(dashboard)/Files/_ui/components/UploadFileCheckBox";
import { MailContext, MailContextType, MailType } from "../context/MailContext";
interface FileObject {
  size: number;
  name: string;
}
export default function AddAttachments({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { Mail, setMail } = useContext<MailContextType>(MailContext);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const Router = useRouter();
  const pathname = usePathname();
  const { handleSubmit } = useForm();
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedShared, setSelectedShared] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const { data: allFolders, isPending: isPending } = useQuery({
    queryKey: ["folders"],
    queryFn: () =>
      getData("folders", {
        org: true,
        column: "*,files(*)",
      }),
  });

  const options: any = [];
  !isPending &&
    allFolders?.data?.map((fold: any) => {
      options.push({ label: fold.name, value: fold.id });
    });
  function handleSelect(id: any) {
    setSelectedFolder(id);
  }

  const { mutateAsync: addFileApi, isPending: isAddingFile } = useMutation({
    mutationFn: async (payload: any) => {
      const { error, data }: any = await addFile(payload);
      if (error) {
        toast.error("error found while uploading .Please Try Again  ");
      } else {
        toast.success("File Created", "Success");
        return data;
      }
    },
    onSuccess: () => {
      Router.push(pathname);
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
    const { uploaded } = await UploadImage(formData, fileName, "emails");
    return { uploaded, fileName, fileType, fileData };
  }
  async function onSubmit() {
    const l = files.length;
    for (let i = 0; i <= l - 1; i++) {
      if (files[i].size > 50000000) {
        toast.error("the size of the file cannot exceed 50MB ");
      } else {
        const { uploaded, fileName, fileType, fileData }: any =
          await uploadImage(files[i]);
        if (uploaded) {
          const org = await getCurrentorg();
          const orgName = org?.name;
          const { name, size } = fileData;
         setMail &&
            setMail((old: MailType) => {
              return {
                email_object: old?.email_object,
                email_html: old?.email_html,
                attachment: [
                  ...(old?.attachment || []),
                  {
                    content: `https://ybwqmrrlvmpdikvmkqra.supabase.co/storage/v1/object/public/emails/${fileName}`,
                    file_name: name,
                    org_name: orgName || "",
                    size: Math.round(size / 1000),
                    file_type: fileType,
                  },
                ],
              };});
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

          <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
          <div className="flex flex-row gap-4 px-2 pt-3">
            <button disabled={isAddingFile}>Upload</button>
            <button
              className="cursor-pointer text-color5-500 hover:underline "
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </PopUpSkeleton>
    </>
  );
}
