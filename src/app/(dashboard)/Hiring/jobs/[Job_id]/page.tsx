"use client";
import React, { useState } from "react";
import CandiatesTable from "./components/CandidatesTable/CandidatesTable";
import useCandidate from "@/hooks/useCandidate";
import useHiring from "@/hooks/useHiring";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";
import getCandidate from "@/api/getCandidates";
import TableSkeleton from "./components/CandidatesTable/TableSkeleton";

function Page({ params: { Job_id } }: { params: { Job_id: string } }) {
  const [page, setpage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("*");
  const queryClient = useQueryClient();
  const {
    candidates: { data, isPending, meta, isPlaceholderData },
  } = useCandidate({ job_id: Job_id, status: filter }, page, 6);
  const { Hiring } = useHiring({ id: Job_id });

  React.useEffect(() => {
    if (!isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ["Candidates", Job_id, page + 1],
        queryFn: () =>
          getCandidate("candidates", {
            match: { job_id: Job_id, status: filter },
            StartPage: (page + 1) * 6,
            EndPage: (page + 2) * 6,
          }),
      });
    }
  }, [page]);

  const CandidateTableData: any = data?.map((candidate: any) => {
    return {
      id: candidate?.id,
      "Candidate Info":
        candidate?.["First Name"] + " " + candidate?.["Last Name"],
      Status: candidate?.status,
      Status_update: "Updated Just Now",
      Rating: candidate?.Ratings,
      Applied: candidate?.created_at,
      "Last Email": candidate?.["Last Email"] || "",
    };
  });
  console.log(isPending);
  return (
    <div className="flex h-full w-full flex-col items-center justify-start bg-white">
      <div className="flex w-5/6 flex-col gap-[1rem]">
        <div className="flex w-full items-center justify-center">
          {isPending || Hiring?.isPending ? (
            <TableSkeleton />
          ) : (
            <div className="mt-6 flex w-full flex-col items-start justify-center gap-2">
              <Link
                href="/Hiring/jobs"
                className="flex items-center justify-center gap-[0.5rem] text-sm text-gray-11 duration-200 ease-linear hover:!text-color-primary-8 hover:underline"
              >
                <FaArrowLeftLong fontSize="1rem" />
                Job Opening
              </Link>
              <div className="flex items-center justify-center gap-[0.5rem]">
                <MdOutlineEventNote className="text-4xl text-color-primary-8" />
                <div className="flex flex-col items-start justify-center gap-1">
                  <h1 className="text-semibold text-lg text-color-primary-8">
                    {Hiring?.data[0]?.job_information?.["Posting Title"]}
                  </h1>
                  <h1 className="text-sm text-gray-15">
                    {Hiring?.data[0]?.job_information?.["Location"]}
                  </h1>
                </div>
              </div>
              <CandiatesTable
                setpage={setpage}
                Hiring={Hiring?.data[0]}
                data={CandidateTableData}
                setFilter={setFilter}
                filter={filter}
                Job_id={Job_id}
                page={page}
                totalPages={meta?.totalPages}
                isPlaceholderData={isPlaceholderData}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
