"use client";
import { sectionIcon } from "@/constants/userInfo";
import { RowFieldType } from "@/types/database.tables.types";
import React, { useContext, useState } from "react";
import { StepsContext } from "../../context/StepsContext";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

function NewQuestions({ RowField }: { RowField: RowFieldType }) {
  const Component = sectionIcon[RowField?.Icon?.toUpperCase() || "FAGRIPLINES"];
  const [idEditting, setEditting] = useState<boolean>(RowField?.name == "");
  const [QuestionValue, setQuestionValue] = useState("");
  const { Update_ApplicationDetails, ApplicationDetails } =
    useContext(StepsContext);

  const SaveQuestion = () => {
    console.log(RowField, QuestionValue, {
      ...ApplicationDetails?.values?.[QuestionValue],
      AddToAppliement: true,
      name: QuestionValue,
      type: RowField?.type,
    });
    Update_ApplicationDetails({
      values: {
        ...ApplicationDetails?.values,
        Questions: {
          ...ApplicationDetails?.values?.Questions,
          [QuestionValue]: {
            ...ApplicationDetails?.values?.[QuestionValue],
            AddToAppliement: true,
            name: QuestionValue,
            type: RowField?.type,
          },
        },
      },
    });
    setEditting(false);
  };
  return (
    <div className="w-full">
      {!idEditting ? (
        <div className="flex h-[2.5rem] w-full items-start justify-between px-4 py-1 rounded-sm border border-gray-18 bg-white">
          <div className="flex w-full items-start justify-center gap-[1rem]">
            <Component className="!text-xl !text-color-primary-8" />
            <p>{QuestionValue}</p>
          </div>
          <div className="">
            <div
              data-tip="Edit Question"
              className="duration-250 tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
            >
              <AiFillEdit className="!text-xl !text-color-primary-8" />
            </div>
            <div
              data-tip="delete Question"
              className="duration-250 tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
            >
              <FaTrash className="!text-xl !text-color-primary-8" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[3.5rem] w-full items-start justify-between gap-[1rem] rounded-sm border border-gray-18 bg-white px-4 py-2">
          <div className="flex w-full items-center justify-center gap-[1rem]">
            <Component className="!text-xl !text-color-primary-8" />
            <input
              name={QuestionValue}
              value={QuestionValue}
              type="text"
              onChange={(e) => {
                console.log(e.target.value);
                setQuestionValue(e.target.value);
              }}
              className="peer h-[2rem] w-full overflow-hidden rounded-sm border border-gray-19 bg-white px-2 text-[0.95rem] font-normal !text-gray-13 outline-none"
            />
          </div>
          <div className="flex items-center justify-center  gap-[1rem]">
            <button
              className="col-span-2 w-full min-w-[9rem] space-x-8 rounded-md border bg-color-primary-8 px-2 py-1 font-semibold capitalize text-white shadow-sm transition-all ease-linear first-letter:capitalize hover:bg-fabric-600   hover:shadow-md "
              onClick={SaveQuestion}
              type="button"
            >
              Save
            </button>
            <button type="button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewQuestions;
