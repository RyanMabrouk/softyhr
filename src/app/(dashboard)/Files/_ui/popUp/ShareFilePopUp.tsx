import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import ButtonPopUp from "../components/ButtonPopUp";
import FilesCheckBox from "../components/FilesCheckBox";
import useFileData from "@/hooks/useFileData";
import LoaderPopUp from "../components/Loader/LoaderPopUp/LoaderPopUp";
import { useQueryClient } from "@tanstack/react-query";

export default function ShareFilePopUp() {
  const Router = useRouter();
  const pathname = usePathname();
  const [isTyping, setIsTyping] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("fileId");
  const queryClient = useQueryClient();


  const { file } = useFileData(id);
  const isPending = file.isPending;

  return (
    <>
      <div className="z-50 flex flex-col gap-2 ">
        {isPending ? (
          <LoaderPopUp />
        ) : (
          <>
            <div className="z-50 flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
                  {`Share ${
                    file.data[0].name.length < 40
                      ? file.data[0].name
                      : `${file.data[0].name?.slice(0, 40)}...`
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
                <div className="h-40"></div>
              </div>
              <div
                className={`flex flex-col gap-4 bg-gray-17 px-4 py-6 ${
                  true ? "" : "opacity-60"
                } `}
              >
                <div className="flex items-center gap-2">
                  <FilesCheckBox check={false} />
                  <p className=" mb-1 text-sm text-gray-10">
                    Share this file with all employees
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="input" className="text-sm text-gray-10">
                    Or only these people
                  </label>
                  <input
                    type="text"
                    placeholder="Enter names or groups..."
                    disabled={false}
                    className=" border border-stone-400 px-2 py-1 text-sm font-normal text-gray-12 outline-1 transition-all duration-300 placeholder:text-sm focus:outline-color1-300 "
                  />
                </div>
              </div>

              <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
              <div className="flex flex-row gap-4 px-2 pt-3">
                <ButtonPopUp check={false} className="!w-fit">
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
            </div>
          </>
        )}
      </div>
    </>
  );
}
