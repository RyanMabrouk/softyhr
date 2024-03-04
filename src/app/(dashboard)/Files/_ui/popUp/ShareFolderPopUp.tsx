"use client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import ButtonPopUp from "../components/ButtonPopUp";
import LoaderPopUp from "../components/Loader/LoaderPopUp/LoaderPopUp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useProfiles from "@/hooks/useProfiles";
import { IoMdCloseCircleOutline } from "react-icons/io";
import SelectSharedUsers from "../components/SelectSharedUsers";
import UploadFileCheckBox from "../components/UploadFileCheckBox";
import useToast from "@/hooks/useToast";
import default_avatar from "/public/default_avatar.png";
import useAllPermissions from "@/hooks/useAllPermissions";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { PostgrestError } from "@supabase/supabase-js";
import {
  database_permissions_type,
  database_profile_type,
} from "@/types/database.tables.types";
import Image from "next/image";
import { PiUsersThreeFill } from "react-icons/pi";
import useFolderFilesIds from "@/hooks/files/useFolderFilesIds";
import useFolderData from "@/hooks/files/useFolderData";
import { removeFolderFromUser } from "@/actions/files/removeFolderFromUser";
import { shareFilestoUsers } from "@/actions/files/shareFilestoUsers";

export default function ShareFolderPopUp() {
  const Router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const id = useParams().folderId;
  const queryClient = useQueryClient();
  const {
    folder_files_ids: { data: folder_files_ids },
  } = useFolderFilesIds(Number(id));
  const {
    folder: { data: folder, isPending },
  } = useFolderData(Number(id));
  const {
    profiles: { data: profiles },
  } = useProfiles();
  const {
    permissions: { data: allPermissions },
  } = useAllPermissions();
  const useres_who_have_access = profiles?.filter(
    (user: database_profile_type) => {
      const user_files_ids = allPermissions?.find(
        (e) => e.user_id === user.user_id,
      )?.files_ids;
      return folder_files_ids?.every((id) => user_files_ids?.includes(id));
    },
  );
  const [selectedShared, setSelectedShared] = useState<database_profile_type[]>(
    [],
  );
  const [isChecked, setIsChecked] = useState(false);
  function handleCheckedAllUsers() {
    setIsChecked((check) => !check);
    if (!isChecked) {
      setSelectedShared(
        (profiles?.filter(
          (user: database_profile_type) =>
            useres_who_have_access?.find((e) => e.user_id === user.user_id) ===
            undefined,
        ) as database_profile_type[]) ?? [],
      );
    } else {
      setSelectedShared([]);
    }
  }

  function handleSelectedShared(selected: any) {
    setSelectedShared((old: any) => [...old, selected]);
  }
  function handleDeleteShared(id: string) {
    setSelectedShared((old) =>
      old.filter((user: database_profile_type) => user.user_id !== id),
    );
  }
  async function handleShare() {
    if (selectedShared.length > 0) {
      shareFolder({ users: selectedShared, fileIds: folder_files_ids ?? [] });
    } else {
      toast.error("Please select at least one user", "Error");
    }
  }

  // Share folder to users mutation
  const { mutate: shareFolder } = useMutation({
    mutationFn: async ({
      users,
      fileIds,
    }: {
      users: { user_id: string }[];
      fileIds: number[];
    }) => {
      const error = await shareFilestoUsers({
        users: users,
        fileIds: fileIds,
      });
      if (error) throw error;
    },
    onError: (error) => {
      toast.error(error.message, "Error");
    },
    onSuccess: () => {
      toast.success("File Shared", "Success");
      queryClient.invalidateQueries({ queryKey: ["users_permissions"] });
      Router.push(pathname);
    },
  });
  // Remove folder from user mutation
  const { mutate: removeFolderMutation } = useMutation({
    mutationFn: async ({
      user_id,
      ids,
    }: {
      user_id: string;
      ids: number[];
    }) => {
      const error = await removeFolderFromUser(user_id, ids);
      if (error) throw error;
    },
    onMutate: async (params) => {
      await queryClient.cancelQueries({
        queryKey: ["users_permissions", "all"],
      });
      const previousValue = queryClient.getQueryData([
        "users_permissions",
        "all",
      ]);
      queryClient.setQueryData(
        ["users_permissions", "all"],
        (old: {
          data: database_permissions_type[];
          error: PostgrestError | null;
        }) => {
          return {
            data: old.data.map((user: any) => {
              if (user.user_id === params.user_id) {
                return {
                  ...user,
                  files_ids: user.files_ids.filter(
                    (file_id: string | number) =>
                      !params.ids.includes(Number(file_id)),
                  ),
                };
              }
              return user;
            }),
            error: old.error,
          };
        },
      );
      return { previousValue };
    },
    onError: (err, params, context) => {
      toast.error("Error removing user", "Error");
      queryClient.setQueryData(
        ["users_permissions", "all"],
        context?.previousValue,
      );
    },
    onSuccess: () => {
      toast.success("User removed", "Success");
      queryClient.invalidateQueries({ queryKey: ["users_permissions"] });
    },
  });
  return (
    <form action={handleShare} className="z-50 flex flex-col ">
      {isPending ? (
        <LoaderPopUp />
      ) : (
        <>
          <div className="z-50 flex flex-col">
            <div className="flex flex-row justify-between">
              <h1 className=" line-clamp-1 max-w-[35rem] pb-2 text-2xl font-normal text-fabric-700">
                {`Share ${folder?.[0]?.name}`}
              </h1>
              <div
                onClick={() => {
                  queryClient.setQueryData(["fileIds"], []);
                  Router.push(pathname);
                }}
              >
                <CgClose className="cursor-pointer text-3xl text-gray-15" />
              </div>
            </div>
          </div>
          <div className="shadow-popup flex min-w-[38rem] max-w-[38rem] flex-col  rounded-sm bg-white px-8 py-4">
            <h2 className="mb-6 text-xl">Who has Access</h2>
            <hr />
            <div className=" flex h-44 w-full  flex-col flex-wrap items-start justify-start gap-y-2 overflow-y-auto py-2">
              {useres_who_have_access?.map((user) => (
                <div
                  key={"user" + user.user_id}
                  className={`flex  w-[12rem] cursor-pointer  items-center justify-between gap-1 rounded-md px-3 py-1 text-sm text-gray-700 transition-all duration-150 hover:bg-white   `}
                >
                  <EmployeeCard
                    name={`${user?.["Basic Information"]?.["First name"]} ${user?.["Basic Information"]?.["Last name"]}`}
                    picture={user.picture}
                  />
                  <button
                    className="hover:opacity-70"
                    type="button"
                    onClick={() =>
                      removeFolderMutation({
                        user_id: user.user_id,
                        ids: folder_files_ids ?? [],
                      })
                    }
                  >
                    <IoMdCloseCircleOutline className={"text-lg"} />
                  </button>
                </div>
              ))}
              {useres_who_have_access?.length === 0 && (
                <div className="my-auto flex w-full flex-col items-center justify-center text-center text-gray-21">
                  <PiUsersThreeFill className="h-10 w-10" />
                  <span className="text-xl">
                    No users have access to this folder.
                  </span>
                </div>
              )}
            </div>
            <hr className="mb-4" />
            <hr />
            <div className=" flex h-44 w-full flex-col flex-wrap items-start justify-start gap-y-2 overflow-y-auto py-2">
              {selectedShared?.map((user: any) => (
                <div
                  key={"user" + user.user_id}
                  className={`flex  w-[12rem] cursor-pointer  items-center justify-between gap-1 rounded-md px-3 py-1 text-sm text-gray-700 transition-all duration-150 hover:bg-white   `}
                >
                  <EmployeeCard
                    name={`${user?.["Basic Information"]?.["First name"]} ${user?.["Basic Information"]?.["Last name"]}`}
                    picture={user.picture}
                  />
                  <button
                    className="hover:opacity-70"
                    onClick={() => {
                      handleDeleteShared(user.user_id);
                    }}
                  >
                    <IoMdCloseCircleOutline className={"text-lg"} />
                  </button>
                </div>
              ))}
              {selectedShared?.length === 0 && (
                <div className="my-auto flex w-full flex-col items-center justify-center text-center text-gray-21">
                  <PiUsersThreeFill className="h-10 w-10" />
                  <span className="text-xl">
                    Select users to share this folder with.
                  </span>
                </div>
              )}
            </div>
            <hr className="mb-4 " />
            <div
              className={`flex flex-col gap-4 bg-gray-17 px-4 py-6 ${
                true ? "" : "opacity-60"
              } `}
            >
              <div className="flex items-center gap-2">
                <UploadFileCheckBox
                  isChecked={isChecked}
                  handleCheck={handleCheckedAllUsers}
                  disabled={false}
                />
                <p className=" mb-1 text-sm text-gray-10">
                  Share this file with all employees
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <SelectSharedUsers
                  disabled={!isChecked}
                  onSelect={handleSelectedShared}
                  selectedShared={selectedShared as database_profile_type[]}
                />
              </div>
            </div>

            <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
            <div className="flex flex-row gap-4 px-2 pt-3">
              <ButtonPopUp check={false}>Share</ButtonPopUp>
              <CancelBtnGeneric
                onClick={() => {
                  queryClient.setQueryData(["fileIds"], []);
                  Router.push(pathname);
                }}
              />
            </div>
          </div>
        </>
      )}
    </form>
  );
}
function EmployeeCard({ name, picture }: { name: string; picture: string }) {
  return (
    <div className="flex flex-row items-center gap-2">
      {picture ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={picture} alt="" className="h-8 w-8 rounded-full  " />
      ) : (
        <Image src={default_avatar} alt="" className="h-8 w-8 rounded-full  " />
      )}
      <p className="line-clamp-1 ">{name}</p>
    </div>
  );
}
