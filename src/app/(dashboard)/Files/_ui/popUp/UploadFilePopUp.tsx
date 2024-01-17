import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import UploadInput from "../components/UploadInput";
import DragAndDropFileInput from "../components/DragAndDropFile";
import UploadFileCheckBox from "../components/UploadFileCheckBox";
import ButtonPopUp from "../components/ButtonPopUp";

interface FileObject {
  name: string;
}

export default function UploadFilePopUp() {
  const Router = useRouter();
  const pathname = usePathname();

  const [files, setFiles] = useState<FileObject[]>([]);
  const isThereFile = files.length !== 0;

  function reset(name: string) {
    const newFiles = files.filter((file: FileObject) => {
      return file.name !== name;
    });

    setFiles(newFiles);
  }
  function handleAddFile(selectedFile: any) {
    const newFiles = [...files, selectedFile];
    setFiles(newFiles);
  }
  console.log(files);

  return (
    <>
      <div className="z-50 flex flex-col gap-2 ">
        <div className="z-50 flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
              Upload Files
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
        <div className="shadow-popup px-auto flex min-w-[35rem] flex-col items-center gap-2 rounded-sm bg-white px-8 py-4 ">
          <form
            // action={() => addFolder()}
            className="flex w-full flex-col gap-4 px-2 pt-3"
          >
            {isThereFile ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 ">
                  <DragAndDropFileInput
                    isThereFile={isThereFile}
                    handleAddFile={handleAddFile}
                    files={files}
                    reset={reset}
                  />
                </div>

                <UploadInput
                  isThereFile={isThereFile}
                  handleAddFile={handleAddFile}
                />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 self-center">
                  <DragAndDropFileInput
                    isThereFile={isThereFile}
                    handleAddFile={handleAddFile}
                  />
                </div>
                <p className="text-center">or</p>
                <div className={`${isThereFile ? "" : "self-center"} `}>
                  <UploadInput
                    isThereFile={isThereFile}
                    handleAddFile={handleAddFile}
                  />
                </div>
              </>
            )}
            <div
              className={`flex flex-col gap-4 bg-gray-17 px-4 py-6 ${
                isThereFile ? "" : "opacity-60"
              } `}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="select" className="placeholder:text-gray-20">
                  Choose a Folder
                </label>
                <select
                  name="folder"
                  id="folder-select"
                  disabled={!isThereFile}
                  className="h-10 w-56 p-2"
                >
                  <option value="bamboo">Bamboo</option>
                  <option value="softy">Softy</option>
                </select>
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
                  className="p-2"
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
        </div>
      </div>
    </>
  );
}
