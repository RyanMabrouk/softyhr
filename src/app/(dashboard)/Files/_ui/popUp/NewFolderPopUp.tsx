import { SubmitBtn } from "@/app/(auth)/login/_ui/SubmitBtn";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import ButtonPopUp from "../components/ButtonPopUp";

export default function NewFolderPopUp() {
  const Router = useRouter();
  const pathname = usePathname();
  const [isTyping, setIsTyping] = useState("");
  return (
    <>
      <div className="z-50 flex flex-col gap-2 ">
        <div className="z-50 flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
              Add Folder
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
        <div className="shadow-popup px-auto flex min-w-[35rem] flex-col items-center gap-2 rounded-sm bg-white px-8 py-4">
          <form
            // action={() => addFolder()}
            className="flex w-full flex-col gap-4 px-2 pt-3"
          >
            <label htmlFor="input">Enter the Name of the new Folder</label>
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
        </div>
      </div>
    </>
  );
}
