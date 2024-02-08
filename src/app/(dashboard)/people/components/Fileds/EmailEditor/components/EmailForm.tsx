import React, { useContext } from "react";
import "@blocknote/react/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import Input from "../../Input/Input";
import {
  MailContext,
  MailContextType,
} from "@/app/_ui/_PopUp/components/Hiring/SendMail/context/MailContext";

function EmailForm() {
  const { Mail, setMail } = useContext<MailContextType>(MailContext);

  const editor: BlockNoteEditor = useBlockNote({
    onEditorContentChange: (editor) => {
      const saveBlocksAsHTML = async () => {
        console.log(editor.topLevelBlocks);
        const html: string = await editor.blocksToHTMLLossy(
          editor.topLevelBlocks,
        );
        setMail &&
          setMail({
            email_object: Mail?.email_object || "",
            email_html: String(html) || "",
          });
      };
      saveBlocksAsHTML();
    },
  });
  const handleSetSelectedKeys: React.Dispatch<React.SetStateAction<string>> = (
    value,
  ) => {
    setMail &&
      setMail({
        email_html: Mail?.email_html || "",
        email_object: String(value) || "",
      });
  };
  return (
    <div className="flex w-full flex-col items-start justify-center gap-4">
      <Input
        className={"!h-[2.5rem] !w-[25rem] !border-gray-18 text-lg"}
        RowField={{ name: "Email object", required: true }}
        setSelectedKeys={handleSetSelectedKeys}
      />
      <div className="max-h-[35rem] min-h-[12rem] w-full overflow-y-auto rounded-sm border border-gray-18 p-4 shadow-sm">
        <BlockNoteView editor={editor} theme={"light"} />
      </div>
    </div>
  );
}

export default EmailForm;
