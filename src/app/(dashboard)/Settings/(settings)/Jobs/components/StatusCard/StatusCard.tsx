import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { statusType } from "../../types/status.types";
import Link from "next/link";
import { MdModeEditOutline } from "react-icons/md";
import { editCandidateStatus } from "@/actions/settings/Hiring/editCandidateStatus";

function StatusCard({ id, name, group_name }: statusType) {
  const [isEditting, setEditting] = useState<boolean>(false);
  const [value, setValue] = useState<string>(name || "");
  const [Error, setError] = useState<string | null>(null);

  const EditStatus = (formdata: FormData) => {
    if (String(formdata.get("status")) == ""){ 
        setError("required !");
        return;
    }
      editCandidateStatus(String(formdata.get("status")), id);
  };
  const Addstatus = () => {};

  return (
    <div>
      {!isEditting ? (
        <div
          key={"status" + id}
          className="group flex w-full items-center justify-between border-b  border-gray-18 px-4 py-3 duration-200 ease-linear hover:bg-gray-14"
        >
          <div className="text-base">{name}</div>
          <div className="flex items-center justify-center gap-[1rem] self-end">
            <div
              data-tip="edit status"
              onClick={() => setEditting(true)}
              className="tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center self-end duration-200 ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
            >
              <MdModeEditOutline className="cursor-pointer !text-gray-15" />
            </div>
            <Link
              data-tip="delete status"
              href={`?popup=DELETE_CANDIDATE_STATUS&id=${id}`}
              className="tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center duration-200 ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
            >
              <FaTrash className="cursor-pointer !text-gray-15" />
            </Link>
          </div>
        </div>
      ) : (
        <form
          action={id ? EditStatus : Addstatus}
          className="flex min-h-[3.5rem] w-full items-start justify-between gap-[1rem] rounded-sm border-b border-gray-18 bg-white px-4 pt-4"
        >
          <div className="flex w-full flex-col items-start justify-center">
            <div className="flex w-full items-center justify-center gap-[1rem]">
              <input
                name={"status"}
                value={value}
                required
                type="text"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                className="peer h-[2.5rem] w-full overflow-hidden rounded-sm border border-gray-19 bg-white px-2 text-[0.95rem] font-normal !text-gray-13 outline-none"
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

export default StatusCard;

/*
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
      )}*/
