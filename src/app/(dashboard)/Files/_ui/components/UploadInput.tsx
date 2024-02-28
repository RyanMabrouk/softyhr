"use client";
import React, { useRef, ChangeEvent } from "react";

export default function UploadInput({ isThereFile, handleAddFile }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = (e: any) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      handleAddFile(selectedFile);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/gif,image/png,application/pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {isThereFile ? (
        <button
          className="text-color5-500 hover:text-fabric-600 hover:underline"
          onClick={handleFileUpload}
        >
          +Add a File
        </button>
      ) : (
        <button
          className="flex border-spacing-4 items-center gap-1 border bg-gray-17 px-2 py-1  text-gray-27 hover:opacity-80"
          onClick={handleFileUpload}
        >
          Choose File(s)
        </button>
      )}
    </div>
  );
}
