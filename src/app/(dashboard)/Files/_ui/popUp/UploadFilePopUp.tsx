"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import UploadInput from "../components/UploadInput";
import DragAndDropFileInput from "../components/DragAndDropFile";
import UploadFileCheckBox from "../components/UploadFileCheckBox";
import ButtonPopUp from "../components/ButtonPopUp";
import useToast from "@/hooks/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import FilesSelectComponent from "../components/FilesSelectComponent";
import { UploadImage } from "@/actions/UploadFiles/uploadImage";
import { v4 as uuidv4 } from "uuid";
import getCurrentorg from "@/api/getCurrentOrg";
import getSession from "@/api/getSession";
import { addFile } from "@/actions/files/addFile";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import getData from "@/api/getData";
import SelectSharedUsers from "../components/SelectSharedUsers";
import { IoMdCloseCircleOutline } from "react-icons/io";
import useProfiles from "@/hooks/useProfiles";
import { addFiletoUser } from "@/actions/files/addFiletoUser";
import Image from "next/image";
import default_avatar from "/public/default_avatar.png";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { database_profile_type } from "@/types/database.tables.types";
import { EmployeesContainer } from "../components/EmployeesContainer";

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
  const [selectedShared, setSelectedShared] = useState<database_profile_type[]>(
    [],
  );
  console.log("🚀 ~ UploadFilePopUp ~ selectedShared:", selectedShared);
  const [isChecked, setIsChecked] = useState(false);

  const {
    profiles: { data: profiles },
  } = useProfiles();

  function handleCheckedAllUsers() {
    setIsChecked((check) => !check);
    setSelectedShared([]);
  }

  function handleSelectedShared(selected: database_profile_type) {
    console.log("🚀 ~ handleSelectedShared ~ selected:", selected);
    setSelectedShared((old) => [...old, selected]);
  }

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
            file_url: `${process.env.SUPABASE_STORAGE_LINK}/files/${fileName}`,
            addedBy: user_id,
            name: name,
            org_name: orgName,
            size: Math.round(size / 1000),
            file_type: fileType,
            folderId: selectedFolder,
          };
          const data = await addFileApi(payload);
          const fileId = data?.[0].id;
          if (selectedShared.length > 0 && !isChecked) {
            selectedShared.forEach((user: any) => {
              let userId = user?.user_id;
              addFiletoUser(userId, fileId);
            });
          } else if (isChecked) {
            profiles
              ?.filter((user: any) => user.role === "employee")
              .forEach((user: any) => {
                let userId = user?.user_id;
                addFiletoUser(userId, fileId);
              });
          }
        }
      }
    }
  }

  const [files, setFiles] = useState<FileObject[]>([]);
  const isThereFile = files.length !== 0;

  function handleRemoveFile(name: string) {
    setFiles((old) =>
      old.filter((file: FileObject) => {
        return file.name !== name;
      }),
    );
  }
  function handleAddFile(selectedFile: any) {
    setFiles((old) => [...old, selectedFile]);
  }
  function handleDeleteShared(id: string) {
    setSelectedShared((old) => old.filter((user) => user.user_id !== id));
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
              <label
                htmlFor="select"
                className="rounded-sm placeholder:text-gray-20"
              >
                Choose a Folder
              </label>
              <FilesSelectComponent
                isThereFile={isThereFile}
                options={options}
                onSelect={handleSelect}
              />
            </div>
            <div className="flex items-center gap-2">
              <UploadFileCheckBox
                isChecked={isChecked}
                handleCheck={handleCheckedAllUsers}
                disabled={!isThereFile}
              />
              <p className="mb-1 text-gray-20">
                Share these file(s) with all Employees
              </p>
            </div>
            {selectedShared.length > 0 && (
              <EmployeesContainer
                handleRemove={(user_id) => {
                  handleDeleteShared(user_id);
                }}
                users={selectedShared.map((user) => ({
                  user_id: user.user_id,
                  picture: user.picture ?? default_avatar.src,
                  //  @ts-ignore TODO: correct this type
                  name: `${user["Basic Information"]["First name"]} ${user["Basic Information"]["Last name"]}`,
                }))}
              />
            )}
            <span className="-mt-12"></span>
            <SelectSharedUsers
              disabled={isThereFile && !isChecked}
              onSelect={handleSelectedShared}
              selectedShared={selectedShared}
            />
          </div>

          <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
          <div className="flex flex-row gap-4 px-2 pt-3">
            <ButtonPopUp check={!isThereFile} disabled={isAddingFile}>
              Upload
            </ButtonPopUp>
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
