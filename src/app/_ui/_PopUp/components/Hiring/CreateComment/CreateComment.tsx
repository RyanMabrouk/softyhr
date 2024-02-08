import React from "react";
import { CgClose } from "react-icons/cg";
import PopUpSkeleton from "../../../PopUpSkeleton";
import { useSearchParams } from "next/navigation";
import useCandidate from "@/hooks/Hiring/useCandidate";
import { FaUserCircle } from "react-icons/fa";
import CreateCommentForm from "./CreateCommentForm";

function CreateComment() {
  const params = useSearchParams();
  const id = params.get("id");
  const {
    candidates: { data, isPending },
  } = useCandidate({ id: id });
  console.log(data);
  return (
    <>
      {isPending ? (
        <h1>Loading...</h1>
      ) : (
        <PopUpSkeleton
          className="min-w-[35rem] px-8 py-5"
          title="Edit Fields for All Employees"
        >
          <div className="flex w-full items-center justify-start gap-[1rem] border-b border-gray-18 bg-gray-14 px-2 py-6 pr-16">
            <h1 className="whitespace-nowrap font-semibold">
              Updating Status for:
            </h1>
            <div className="flex w-full items-center justify-start gap-[0.5rem] text-lg font-semibold text-color-primary-7">
              <FaUserCircle className=" text-3xl font-semibold " />
              <h1 className="text-base font-light text-gray-29">
                {data[0]?.["First Name"] + " " + data[0]?.["Last Name"]}
              </h1>
            </div>
          </div>
          <CreateCommentForm id={id} />
        </PopUpSkeleton>
      )}
    </>
  );
}

export default CreateComment;
