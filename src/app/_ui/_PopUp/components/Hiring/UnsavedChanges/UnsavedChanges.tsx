import React from "react";
import { IoIosWarning } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CgClose } from "react-icons/cg";

interface UnsavedChangesPropsType {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function UnsavedChanges({ setShow }: UnsavedChangesPropsType) {
  const pathname = usePathname();
  return (
    <div className="z-50 flex flex-col gap-2">
      <div className="z-50 flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
            Just Cheking...
          </h1>
          <div onClick={() => setShow(false)}>
            <CgClose className="cursor-pointer text-3xl text-gray-15" />
          </div>
        </div>
      </div>
      <div className={`shadow-popup rounded-sm bg-white`}>
        <div className="flex flex-col items-center justify-center gap-[1rem] p-4">
          <IoIosWarning className="!text-[4rem] !text-color-primary-8" />
          <h1 className="text-xl font-semibold">
            You haven't saved your changes
          </h1>
          <h1 className="text-gray-34">
            Your progress will be lost if you navigate away from this page
            without saving.
          </h1>
          <div className="h-[2px] w-full bg-gradient-to-r from-color-primary-2 to-color-primary-3" />
          <div className="flex w-full items-center justify-start gap-[1rem] px-8">
            <button
              onClick={() => console.log(pathname)}
              className="bg-color-primary-8 px-4 py-1 text-lg font-semibold text-white"
            >
              Save Changes
            </button>
            <Link
              href="/Hiring/jobs"
              className="bg-gray-17 px-4 py-1 text-lg font-semibold text-black"
            >
              Don't Save
            </Link>
            <button
              className=" cursor-pointer items-center text-color5-600 hover:text-fabric-700 hover:underline "
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnsavedChanges;
