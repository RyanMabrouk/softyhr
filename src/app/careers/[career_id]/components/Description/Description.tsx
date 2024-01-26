import { useEffect, useState } from "react";
import { BlockNoteEditor, Block } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { Hiring_type } from "@/types/database.tables.types";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("@/app/(dashboard)/people/components/Fileds/Editor/Editor"),
  { ssr: false },
);
interface DesciprtionPropsType {
  job: Hiring_type;
}

export default function Description({ job }: DesciprtionPropsType) {

  return (
    <Editor
      editable={false}
      defaultValue={job?.job_information?.["Job Description"]}
    />
  );
}
