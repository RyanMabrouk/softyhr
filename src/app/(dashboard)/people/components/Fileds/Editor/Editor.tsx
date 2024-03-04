"use client";
import React, { memo, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, Theme, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { RowFieldType } from "@/types/database.tables.types";
import "@blocknote/react/style.css";

interface EditorPropsType {
  RowField?: RowFieldType;
  defaultValue?: any;
  editable: boolean;
}

function Editor({
  RowField,
  defaultValue = undefined,
  editable = true,
}: EditorPropsType) {
  const [value, setValue] = useState<any>(
    defaultValue ? JSON.parse(defaultValue) : undefined,
  );
  const editor: BlockNoteEditor = useBlockNote({
    editable: editable,
    initialContent: defaultValue ? JSON.parse(defaultValue) : undefined,
    onEditorContentChange: (editor) => {
      setValue(editor.topLevelBlocks);
    },
  });

 

  return (
    <div className="w-full pt-2">
      <h1 className="text-[14px] text-gray-29">{RowField?.name}</h1>
      <div
        className={
          " overflow-x-auto " +
          (editable ? " w-[70rem] rounded-md border border-gray-19 p-2 " : "")
        }
      >
        <BlockNoteView editor={editor} />
        <input
          readOnly
          autoFocus
          hidden
          name={RowField?.name}
          value={JSON.stringify(value)}
        />
      </div>
    </div>
  );
}

export default memo(Editor);
