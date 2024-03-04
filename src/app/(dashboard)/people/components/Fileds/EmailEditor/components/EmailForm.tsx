import React, { useContext } from "react";
import "@blocknote/react/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import Input from "../../Input/Input";
import {
  MailContext,
  MailContextType,
  MailType,
} from "@/app/_ui/_PopUp/components/Hiring/SendMail/context/MailContext";

function EmailForm() {
  const { Mail, setMail } = useContext<MailContextType>(MailContext);

  const editor: BlockNoteEditor = useBlockNote({
    onEditorContentChange: (editor) => {
      const saveBlocksAsHTML = async () => {
        const html: string = await editor.blocksToHTMLLossy(
          editor.topLevelBlocks,
        );
        setMail &&
          setMail((old: MailType) => {
            return {
              email_object: old?.email_object || "",
              email_html: String(html) || "",
              attachment: old?.attachment,
            };
          });
      };
      saveBlocksAsHTML();
    },
  });
  const handleSetSelectedKeys: React.Dispatch<React.SetStateAction<string>> = (
    value,
  ) => {
    console.log(value, "handleSetSelectedKeys");
    setMail &&
      setMail((old: MailType) => {
        return {
          email_html: old?.email_html || "",
          email_object: String(value) || "",
          attachment:old?.attachment,
        };
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
