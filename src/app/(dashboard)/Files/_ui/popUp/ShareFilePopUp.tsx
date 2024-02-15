import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import ButtonPopUp from "../components/ButtonPopUp";
import FilesCheckBox from "../components/FilesCheckBox";
import useFileData from "@/hooks/useFileData";
import LoaderPopUp from "../components/Loader/LoaderPopUp/LoaderPopUp";
import { useQueryClient } from "@tanstack/react-query";
import useProfiles from "@/hooks/useProfiles";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { removeFileFromUser } from "@/actions/files/removeFileFromUser";
import SelectSharedUsers from "../components/SelectSharedUsers";
import UploadFileCheckBox from "../components/UploadFileCheckBox";
import { addFiletoUser } from "@/actions/files/addFiletoUser";
import useToast from "@/hooks/useToast";

export default function ShareFilePopUp() {
  const Router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [isTyping, setIsTyping] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("fileId");
  const queryClient = useQueryClient();

  const { file } = useFileData(id);
  const isPending = file.isPending;

  const {
    profiles: { data: profiles, isPending: isPendingAllProfiles },
  } = useProfiles();

  const [selectedShared, setSelectedShared] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  function handleCheckedAllUsers() {
    setIsChecked((check) => !check);
    setSelectedShared([]);
  }

  function handleSelectedShared(selected: any) {
    const arr: any = [...selectedShared, selected];
    setSelectedShared(arr);
  }
  function handleDeleteShared(id: any) {
    const newShared = selectedShared.filter((user: any) => user.user_id !== id);
    setSelectedShared(newShared);
  }

  async function handleShare() {
    const promises: any = [];
    if (selectedShared.length > 0 && !isChecked) {
      selectedShared.forEach((user: any) => {
        let userId = user?.user_id;
        promises.push(addFiletoUser(userId, id));
      });
      await Promise.all(promises);
    } else if (isChecked) {
      profiles
        ?.filter(
          (user: any) =>
            user.role === "employee" && !user.files_ids.includes(Number(id)),
        )
        .forEach((user: any) => {
          let userId = user?.user_id;
          promises.push(addFiletoUser(userId, id));
        });
      await Promise.all(promises);
    }
  }

  return (
    <>
      <form
        action={async () => {
          await handleShare();
          toast.success("File Shared", "Success");
          queryClient.invalidateQueries({ queryKey: ["profiles"] });
          Router.replace(pathname);
        }}
        className="z-50 flex flex-col gap-2 "
      >
        {isPending ? (
          <LoaderPopUp />
        ) : (
          <>
            <div className="z-50 flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
                  {`Share ${
                    file.data?.[0].name.length < 40
                      ? file.data?.[0].name
                      : `${file.data?.[0].name?.slice(0, 40)}...`
                  }`}
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
            <div className="shadow-popup px-auto flex min-w-[38rem] flex-col gap-2 rounded-sm bg-white px-8 py-4">
              <div>
                <h2 className="text-xl">Who has Access</h2>
                <hr className="mt-4" />
                <div className="h-32 overflow-y-scroll">
                  {profiles
                    ?.filter((user: any) =>
                      user?.files_ids?.includes(Number(id)),
                    )
                    ?.map((user: any) => (
                      <div
                        key={user.user_id}
                        className={` flex w-fit cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-700 transition-all duration-150 hover:bg-white`}
                      >
                        {
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={
                              user?.picture
                                ? user?.picture
                                : "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg"
                            }
                            alt="user picture"
                            className="h-8 w-8 rounded-full object-cover "
                          />
                        }
                        <p>{`${user?.["Basic Information"]?.["First name"]}     ${user?.["Basic Information"]?.["Last name"]} `}</p>
                        <button
                          className="hover:opacity-70"
                          type={"button"}
                          onClick={async (e) => {
                            e.stopPropagation();
                            removeFileFromUser(user.user_id, id);
                            queryClient.invalidateQueries({
                              queryKey: ["profiles"],
                            });
                          }}
                        >
                          <IoMdCloseCircleOutline className={"text-lg"} />
                        </button>
                      </div>
                    ))}
                </div>
                <hr className="mt-4" />

                <div className="h-32 overflow-y-scroll">
                  {selectedShared.map((user: any) => (
                    <div
                      key={user.user_id}
                      className={` flex w-fit cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-700 transition-all duration-150 hover:bg-white   
                  `}
                    >
                      {
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={
                            user?.picture
                              ? user?.picture
                              : "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg"
                          }
                          alt="user picture"
                          className="h-8 w-8 rounded-full object-cover "
                        />
                      }
                      <p>{`${user?.["Basic Information"]?.["First name"]}     ${user?.["Basic Information"]?.["Last name"]} `}</p>
                      <button
                        className="hover:opacity-70"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteShared(user.user_id);
                        }}
                      >
                        <IoMdCloseCircleOutline className={"text-lg"} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
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
                    selectedShared={
                      profiles?.filter((user: any) =>
                        user?.files_ids?.includes(Number(id)),
                      )
                        ? [
                            ...selectedShared,
                            ...profiles?.filter((user: any) =>
                              user?.files_ids?.includes(Number(id)),
                            ),
                          ]
                        : selectedShared
                    }
                  />
                </div>
              </div>

              <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
              <div className="flex flex-row gap-4 px-2 pt-3">
                <ButtonPopUp check={false}>Share</ButtonPopUp>
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
            </div>
          </>
        )}
      </form>
    </>
  );
}
