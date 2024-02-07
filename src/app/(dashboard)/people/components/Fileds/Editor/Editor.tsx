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

function Editor({ RowField, defaultValue, editable = true }: EditorPropsType) {
  const [value, setValue] = useState<any>(defaultValue || null);
  const editor: BlockNoteEditor = useBlockNote({
    editable: editable,

    initialContent: defaultValue ? JSON.parse(defaultValue) : undefined,
    onEditorContentChange: (editor) => {
      setValue(editor.topLevelBlocks);
    },
  });

  const lightgreenTheme = {
    colors: {
      editor: {
        text: "#222222",
        background: "#ffffff",
      },
      menu: {
        // text: "#ffffff",
        background: "#ffff",
      },
      tooltip: {
        text: "#ffffff",
        background: "#527A01",
      },
      disabled: {
        text: "#EEF3E5",
        background: "#496D00",
      },
      sideMenu: "#bababa",
    },
    borderRadius: 4,
    fontFamily: "Helvetica Neue, sans-serif",
  } satisfies Theme;
  const darkRedTheme = {
    ...lightgreenTheme,
    colors: {
      ...lightgreenTheme.colors,
    },
  } satisfies Theme;

  const redTheme = {
    light: lightgreenTheme,
    dark: darkRedTheme,
  };


   //console.log(defaultValue ? JSON.stringify(JSON.parse(value)) : JSON.stringify(value))
  
  return (
    <div className="w-full pt-2">
      <h1 className="text-[14px] text-gray-29">{RowField?.name}</h1>
      <div
        className={
          " overflow-x-auto " +
          (editable ? " w-[70rem] rounded-md border border-gray-19 p-2 " : "")
        }
      >
        <BlockNoteView theme={redTheme} editor={editor} />
        <input
          readOnly
          autoFocus
          hidden
          name={RowField?.name}
          value={defaultValue ? JSON.stringify(JSON.parse(value)) : JSON.stringify(value)}
        />
      </div>
    </div>
  );
}

export default memo(Editor);
