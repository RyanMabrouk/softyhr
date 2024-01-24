"use client";
import React from "react";
import CandiatesTable from "./components/CandidatesTable/CandidatesTable";
import useCandidate from "@/hooks/useCandidate";
import useHiring from "@/hooks/useHiring";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

function Page({ params: { Job_id } }: { params: { Job_id: string } }) {
  const {
    candidates: { data, isPending },
  } = useCandidate({ job_id: Job_id });

  const { Hiring } = useHiring({ id: Job_id });
  const CandidateTableData: any = data?.map((candidate: any) => {
    return {
      id: candidate?.id,
      "Candidate Info":
        candidate?.["First Name"] + " " + candidate?.["Last Name"],
      Status: "NEW",
      Status_update: "Updated Just Now",
      Rating: candidate?.Ratings,
      Applied: candidate?.created_at,
      "Last Email": candidate?.["Last Email"] || "",
    };
  });
  console.log(Hiring);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white">
      <div className="flex w-5/6 flex-col gap-[1rem]">
        <div className="flex w-full items-center justify-center">
          {isPending || Hiring?.isPending ? (
            <h1>Loading...</h1>
          ) : (
            <div className="mt-6 flex w-full flex-col items-start justify-center gap-2">
              <Link
                href="/hiring/jobs"
                className="flex items-center justify-center gap-[0.5rem] text-sm text-gray-11 duration-200 ease-linear hover:!text-color-primary-8 hover:underline"
              >
                <FaArrowLeftLong fontSize="1rem" />
                Job Opening
              </Link>
              <div className="flex items-center justify-center gap-[0.5rem]">
                <MdOutlineEventNote className="text-4xl text-color-primary-8" />
                <div className="flex flex-col items-center justify-center gap-1">
                  <h1 className="text-semibold text-lg text-color-primary-8">
                    {Hiring?.data[0]?.job_information?.["Posting Title"]}
                  </h1>
                  <h1 className="text-sm text-gray-15">
                    {Hiring?.data[0]?.job_information?.["Location"]}
                  </h1>
                </div>
              </div>
              <CandiatesTable
                Hiring={Hiring?.data[0]}
                candidate={CandidateTableData}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
