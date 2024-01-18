"use client";
import React, { memo, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { RowFieldType } from "@/types/database.tables.types";

interface EditorPropsType {
  RowField: RowFieldType;
  defaultValue?: any;
}

function Editor({ RowField,  defaultValue }: EditorPropsType) {
  const [value, setValue] = useState<any>(defaultValue || null);
  const editor: BlockNoteEditor = useBlockNote({
    initialContent: defaultValue ? JSON.parse(defaultValue) : undefined,
    onEditorContentChange: (editor) => {
      setValue(editor.topLevelBlocks);
    },
  });
  console.log(defaultValue);
  return (
    <div className="w-full">
      <h1 className="ext-[14px] text-gray-29">{RowField?.name}</h1>
      <div className="h-[10rem] w-[70rem] overflow-x-auto rounded-md border border-gray-14 p-2">
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
