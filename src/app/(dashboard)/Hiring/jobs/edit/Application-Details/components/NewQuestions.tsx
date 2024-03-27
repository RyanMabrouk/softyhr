"use client";
import { sectionIcon } from "@/constants/userInfo";
import { RowFieldType } from "@/types/database.tables.types";
import React, { useContext, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { RxDragHandleDots2 } from "react-icons/rx";
import { StepsContext } from "../../../add/context/StepsContext";
import { EditApplicationContext } from "../context/EditApplicationDetailsContext";

function NewQuestions({ RowField }: { RowField: RowFieldType }) {
  const Component = sectionIcon[RowField?.Icon?.toUpperCase() || "FAGRIPLINES"];
  const [idEditting, setEditting] = useState<boolean>(RowField?.name == "");
  const [Error, setError] = useState<string | null>(null);
  const [QuestionValue, setQuestionValue] = useState<string>("");
  const [OldQuestionName, setOldQuestionName] = useState("");
  const { Update_ApplicationDetails, ApplicationDetails } = useContext(
    EditApplicationContext,
  );

  const SaveQuestion = () => {
    const IsQuestionExist = Object.keys(
      ApplicationDetails?.values?.Questions || {},
    )?.find((question_name: string) => question_name == QuestionValue?.trim());
    if (IsQuestionExist) {
      setError("This Field name Already Exist !");
      return;
    }
    if (QuestionValue?.trim() == "") {
      setError("This Field Should not be empty !");
      return;
    }

    Update_ApplicationDetails({
      values: {
        ...ApplicationDetails?.values,
        Questions: {
          ...ApplicationDetails?.values?.Questions,
          [QuestionValue]: {
            ...ApplicationDetails?.values?.[QuestionValue],
            AddToAppliement: true,
            name: QuestionValue?.trim(),
            type: RowField?.type,
          },
        },
      },
    });
    setEditting(false);
    setError(null);
  };

  const EditQuestion = () => {
    const IsQuestionExist =
      Object.keys(ApplicationDetails?.values?.Questions || {})?.find(
        (question_name: string) => question_name == QuestionValue,
      ) || [];
    if (IsQuestionExist?.length > 2) {
      setError("This Field name Already Exist !");
      return;
    }
    if (QuestionValue?.trim() == "") {
      setError("This Field Should not be empty !");
      return;
    }
    delete ApplicationDetails?.values?.Questions?.[OldQuestionName];
    Update_ApplicationDetails({
      values: {
        ...ApplicationDetails?.values,
        Questions: {
          ...ApplicationDetails?.values?.Questions,
          [QuestionValue]: {
            ...ApplicationDetails?.values?.[QuestionValue],
            AddToAppliement: true,
            name: QuestionValue?.trim(),
            type: RowField?.type,
          },
        },
      },
    });
    setEditting(false);
    setError(null);
  };
  return (
    <div className="w-full">
      {!idEditting ? (
        <div className="flex h-[2.5rem] w-full items-start justify-between rounded-sm border border-gray-18 bg-white px-4 py-1">
          <RxDragHandleDots2 className="!pl-4 !text-gray-15" />
          <div className="flex h-full w-full items-center justify-start gap-[1rem]">
            <Component className="!text-xl !text-color-primary-8" />
            <p>{QuestionValue}</p>
          </div>
          <div className="flex gap-[0.5rem]">
            <div
              onClick={() => {
                setEditting(true);
                setOldQuestionName(QuestionValue);
              }}
              data-tip={`Edit ${RowField?.type}`}
              className="duration-250 tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center rounded-md ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
            >
              <AiFillEdit className="!text-2xl !text-color-primary-8" />
            </div>
            <div
              data-tip="delete Question"
              className="duration-250 tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center rounded-md ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
            >
              <FaTrash className="!text-xl !text-color-primary-8" />
            </div>
          </div>
        </div>
      ) : (
        <form
          action={
            ApplicationDetails?.values?.Questions?.[QuestionValue] != ""
              ? EditQuestion
              : SaveQuestion
          }
          className="flex min-h-[3.5rem] w-full items-start justify-between gap-[1rem] rounded-sm border border-gray-18 bg-white px-4 pt-4"
        >
          <div className="flex w-full flex-col items-start justify-center">
            <div className="flex w-full items-center justify-center gap-[1rem]">
              <Component className="!text-xl !text-color-primary-8" />
              <input
                name={QuestionValue}
                value={QuestionValue}
                required
                type="text"
                onChange={(e) => {
                  setQuestionValue(e.target.value);
                }}
                className="peer h-[2rem] w-full overflow-hidden rounded-sm border border-gray-19 bg-white px-2 text-[0.95rem] font-normal !text-gray-13 outline-none"
              />
            </div>
            <p
              className={`pl-8 text-sm font-medium text-red-500 ${Error ? "opacity-100" : "opacity-0"}`}
            >
              {Error || "ERROR"}
            </p>
          </div>
          <div className="flex items-center justify-center  gap-[1rem]">
            <button
              className="col-span-2 w-full min-w-[9rem] space-x-8 rounded-md border bg-color-primary-8 px-2 py-1 font-semibold capitalize text-white shadow-sm transition-all ease-linear first-letter:capitalize hover:bg-fabric-600   hover:shadow-md "
              onClick={SaveQuestion}
              type="submit"
            >
              Save
            </button>
            <button type="button">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default NewQuestions;
