"use client";
import { useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import EmailTemplates from "./components/EmailTemplates";
import EmailForm from "./components/EmailForm";
import EmailPlaceHolders from "./components/EmailPlaceHolders";

export default function EmailEditor() {
  const [value, setValue] = useState();

  return (
    <div className="flex h-full w-full items-start justify-center gap-[1rem]">
      <div className="flex h-full w-full flex-col items-start justify-start gap-[1rem] py-4">
        <EmailTemplates setValue={setValue} />
        <EmailForm />
      </div>
      <EmailPlaceHolders />
    </div>
  );
}
