import { RowFieldType } from "@/types/database.tables.types";
import React from "react";
import NewQuestions from "./NewQuestions";

function NewQuestionsList({
  additionalQuestionsForm,
}: {
  additionalQuestionsForm: RowFieldType[];
}) {
  console.log(additionalQuestionsForm);
  return (
    <div className="flex w-full flex-col items-start justify-center gap-1">
      {additionalQuestionsForm?.map((RowField: RowFieldType, index: number) => {
        return <NewQuestions key={index} RowField={RowField} />;
      })}
    </div>
  );
}

export default NewQuestionsList;
