"use client";
import React, { useEffect, useState } from "react";
import useCandidate from "@/hooks/Hiring/useCandidate";
import LastMail from "../jobs/[Job_id]/components/CandidatesTable/components/Mail/LastMail";
import { CandidateType } from "@/types/candidate.types";
import CandiatesTable from "../jobs/[Job_id]/components/CandidatesTable/CandidatesTable";
import { useQueryClient } from "@tanstack/react-query";
import getCandidate from "@/api/Hiring/getCandidates";
import TopContentTableCandidate from "./components/TopContentTableCandidate";
import Search from "./components/Search";
import Filter from "./components/FilterTableCandidates/Filter";
import { GlobalFilterState, GlobalRangeState } from "./components/types";
import { generateFilterArray } from "./helpers/generateFilterArray";
import TableSkeleton from "../components/HiringTable/components/TableSkeleton";

function Page() {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [search, setSearch] = React.useState<string | null>(null);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const filterKeys = {
    jobStatus: "Job Status",
    jobStatusTable: "Hiring",
    jobName: "id",
    jobNameTable: "Hiring",
    jobLocation: "id",
    jobLocationTable: "Hiring",
    jobSourse: "job_Boards",
    jobSourseTable: "Hiring",
    hiringLeader: "leader",
    hiringLeaderTable: "profiles",
  };

  const [filter, setFilter] = useState<GlobalFilterState>({
    jobStatus: [],
    jobName: [],
    jobSourse: [],
    jobLocation: [],
    hiringLeader: [],
  });
  const [range, setRange] = useState<GlobalRangeState>({
    ratings: { min: 0, max: 5 },
    dates: { min: "", max: "" },
  });
  const {
    candidates: { data, isPending, meta, isPlaceholderData },
  } = useCandidate(
    search || "",
    {},
    page,
    6,
    "All",
    "*,candidate_emails(*),user_emails(*),Hiring!inner(id,name,job_information)",
    generateFilterArray(filter, filterKeys),
    range,
  );

  const CandidateTableData: any = data?.map((candidate: CandidateType) => {
    return {
      id: candidate.id,
      "Candidate Info":
        candidate?.["First Name"] + " " + candidate?.["Last Name"],
      job_opportunity: candidate?.Hiring!.job_information?.["Posting Title"],
      status: candidate?.status,
      Status_update: "Updated Just Now",
      Rating: candidate?.Ratings,
      Applied: candidate?.created_at,
      "Last Email": () => <LastMail candidate={candidate} />,
      Hiring: candidate?.Hiring,
      metadata: candidate?.metadata,
      Phone: candidate?.Phone,
    };
  });

  React.useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["Candidates", page + 1, search],
    });
    if (!isPlaceholderData && Math.ceil(meta?.totalPages / 6) - 1 > page) {
      queryClient.prefetchQuery({
        queryKey: ["Candidates", page + 1, search],
        queryFn: () =>
          getCandidate("candidates", {
            StartPage: (page + 1) * 6,
            EndPage: (page + 2) * 6,
            filter: "",
            search: search || "",
            genericFilter: generateFilterArray(filter, filterKeys),
            range,
          }),
      });
    }
  }, [
    page,
    search,
    meta?.totalPages,
    range,
    filter,
    isPlaceholderData,
    queryClient,
  ]);

  return (
    <div className="shadow-black-top flex h-full w-full flex-col items-center justify-center bg-white">
      <div className="flex w-5/6 flex-col gap-[1rem]">
        <Search search={search} setSearch={setSearch} />
        <div className="flex gap-5">
          <div className="w-[250px]">
            <Filter
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              filter={filter}
              setFilter={setFilter}
              range={range}
              setRange={setRange}
            />
          </div>
          {isPending ? (
            <TableSkeleton />
          ) : (
            <CandiatesTable
              setpage={setPage}
              data={CandidateTableData}
              page={page}
              totalPages={meta?.totalPages}
              hasNoSelectedItemsInPagination={true}
              isTableCandidate={true}
              initialVisibleColumns={[
                "Job Opportunity",
                "Candidate Info",
                "Status",
                "Rating",
                "Applied",
                "Changes Status",
                "Last Email",
                "actions",
              ]}
              topContent={
                <TopContentTableCandidate totalPages={meta?.totalPages} />
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
