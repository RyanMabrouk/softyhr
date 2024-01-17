import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { FaRegTrashCan } from "react-icons/fa6";
import ButtonPopUp from "../components/ButtonPopUp";

export default function NewFolderPopUp() {
  const Router = useRouter();
  const pathname = usePathname();
  const [isTypingDelete, setIsTypingDelete] = useState("");
  const searchParams = useSearchParams();
  const fileName = searchParams.get("fileName");
  return (
    <>
      <div className="z-50 flex flex-col gap-2  ">
        <div className="z-50 flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
              Just Checking ...
            </h1>
            <div
              onClick={() => {
                Router.push(pathname);
              }}
            >
              <CgClose className="cursor-pointer text-3xl text-gray-15" />
            </div>
          </div>
        </div>
        <div className=" shadow-popup px-auto flex min-w-[40rem] flex-col items-center gap-2 rounded-sm bg-white px-12 py-8">
          <FaRegTrashCan fontSize="3.6rem" fill="#C20C0C" />
          <p className="text-lg ">Are you sure you want to delete this file?</p>
          <div className="mt-4 flex max-h-96 w-11/12 flex-col items-center gap-4 overflow-y-auto bg-gray-14 px-6 py-8">
            <div className="flex  w-[28rem] flex-col items-center  gap-4 p-6">
              <AiOutlineFileText fontSize="3rem" fill="#3FA146" />
              <div>
                <p className="font-semibold">{fileName}</p>
                <p className="text-center text-sm text-gray-15">
                  Created 02/18/2024 (37KB)
                </p>
              </div>
              <p className="text-center text-sm text-color2-500">
                This file will be removed from onboarding tasks, offboarding
                tasks, offer letters, and company announcements.
              </p>
              <p className="text-center text-sm text-color2-500">
                Type <strong>"Delete"</strong> to continue
              </p>
              <input
                type="text"
                value={isTypingDelete}
                onChange={(e) => setIsTypingDelete(e.target.value)}
                className="w-40 border border-stone-400 p-2  outline-1 transition-all duration-300 focus:outline-color2-300"
              />
            </div>
          </div>
          <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
          <div className="flex flex-row gap-4 self-start px-2 pt-3">
            <ButtonPopUp check={!(isTypingDelete.toUpperCase() === "DELETE")}>
              Delete File
            </ButtonPopUp>
            <button
              className="cursor-pointer bg-gray-4 px-4 py-2 font-semibold text-gray-23 hover:bg-gray-6 "
              type="button"
              onClick={() => {
                Router.push(pathname);
              }}
            >
              Keep File
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
