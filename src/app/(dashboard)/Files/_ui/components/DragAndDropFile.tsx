"use client";
import { useState } from "react";
import { RiUploadFill } from "react-icons/ri";
import FileUploaded from "./FileUploaded";

const DragAndDropFileInput = ({
  handleAddFile,
  isThereFile,
  handleRemoveFile,
  files,
}: any) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDrop = (e: any) => {
    e.preventDefault();
    const droppedFiles: any = Array.from(e.dataTransfer.files);
    setSelectedFiles(droppedFiles);

    if (droppedFiles.length) {
      handleAddFile(...droppedFiles);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e: any) => {
    const uploadedFiles: any = Array.from(e.target.files);
    setSelectedFiles(uploadedFiles);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`flex items-center gap-4   ${
        isThereFile
          ? "pb-6 pr-20"
          : "border border-dotted border-zinc-400 px-20 py-10"
      }`}
    >
      {isThereFile ? (
        <div className="flex flex-col gap-2">
          <input
            type="file"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
            multiple
          />
          {files?.map((file: any, index: number) => (
            <FileUploaded file={file} key={index} reset={handleRemoveFile} />
          ))}
        </div>
      ) : (
        <>
          <RiUploadFill fontSize="2rem" fill="#527A01" />
          <p>Drop Files Here to Upload</p>
          <input
            type="file"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
            multiple
          />
        </>
      )}
    </div>
  );
};

export default DragAndDropFileInput;
