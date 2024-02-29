"use client";
import MenuListGeneric from "@/app/_ui/MenuListGeneric";
import React, { useState } from "react";
import NewQuestionsList from "./NewQuestionsList";
import { RowFieldType } from "@/types/database.tables.types";
import { MdUpload } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { FaGripLines, FaListUl } from "react-icons/fa";

function AdditionalQuestions() {
  const [additionalQuestionsForm, setAdditionalQuestions] = useState<
    RowFieldType[]
  >([]);

  return (
    <div className="flex w-full flex-col items-start justify-center gap-[1rem]">
      <NewQuestionsList additionalQuestionsForm={additionalQuestionsForm} /> 
      <MenuListGeneric
        options={[
          {
            label: "Question",
            action: () =>
              setAdditionalQuestions((old: RowFieldType[]) => [
                ...old,
                {
                  name: "",
                  type: "Question",
                  Icon: "FAGRIPLINES",
                },
              ]),
            Icon: FaGripLines,
          },
          {
            label: "File Upload",
            action: () =>
              setAdditionalQuestions((old: RowFieldType[]) => [
                ...old,
                {
                  name: "",
                  type: "file",
                  Icon: "MDUPLOAD",
                },
              ]),
            Icon: MdUpload,
          },
          {
            label: "Multiple Choice",
            action: () =>
              setAdditionalQuestions((old: RowFieldType[]) => [
                ...old,
                {
                  name: "",
                  type: "Radio",
                  Icon: "FALISTUL",
                },
              ]),
            Icon: FaListUl,
          },
          {
            label: "Check Box",
            action: () =>
              setAdditionalQuestions((old: RowFieldType[]) => [
                ...old,
                {
                  name: "",
                  type: "check box",
                  Icon: "IOMDCHECKMARK",
                },
              ]),
            Icon: IoMdCheckmark,
          },
        ]}
      />
      <p>under construction</p>
    </div>
  );
}

export default AdditionalQuestions;
