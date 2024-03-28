import React from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { CheckedContextProvider } from "./context/checkedContext";
import FilesTable from "./filesTable/FilesTable";
import { Footer } from "@/app/_ui/Footer";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto mt-6 w-full max-w-[85rem]">
        <div className="-ml-2 flex items-center gap-2">
          <AiOutlineFileText fontSize="2.4rem" fill="#527A01" />
          <p className="text-3xl font-semibold text-color-primary-8">Files</p>
        </div>
        <CheckedContextProvider>
          <FilesTable>{children}</FilesTable>
        </CheckedContextProvider>
      </div>
      <Footer />
    </>
  );
}
