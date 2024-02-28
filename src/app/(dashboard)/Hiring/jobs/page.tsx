"use client";
import { CreateHiringJob, HirinSections } from "@/constants/Hiring/Hiring";
import Link from "next/link";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaPlusCircle } from "react-icons/fa";
import HiringTable from "../components/HiringTable/HiringTable";
import useData from "@/hooks/useData";
import { Hiring_type, Profile_Type } from "@/types/database.tables.types";
import { HiringTableType } from "../components/HiringTable/Hiringtable.types";
import useHiring from "@/hooks/Hiring/useHiring";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetJobOpening } from "@/actions/hiring/GetJobOpening";
import getHiring from "@/api/Hiring/getHiring";
import useCandidate from "@/hooks/Hiring/useCandidate";
import TableSkeleton from "../components/HiringTable/components/TableSkeleton";
import { NewCandidates } from "../components/HiringTable/helpers/CountNewCandidates";

function Page() {
  const [filter, setFilter] = useState<string | null>("All");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {
    Hiring: { data, isPending, meta, isPlaceholderData },
  } = useHiring(
    {},
    '*,profiles("Basic Information"),Department(name)',
    page,
    6,
    filter,
  );

  React.useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["Hiring", page + 1, filter],
    });
    if (!isPlaceholderData && Math.ceil(meta?.totalPages / 6) - 1 > page) {
      queryClient.prefetchQuery({
        queryKey: ["Hiring", page + 1, filter],
        queryFn: () =>
          getHiring("Hiring", {
            match: {},
            column: '*,profiles("Basic Information")',
            StartPage: (page + 1) * 6,
            EndPage: (page + 2) * 6,
            filter,
          }),
      });
    }
  }, [page, filter, meta?.totalPages, isPlaceholderData, queryClient]);
  const HiringDataTable: HiringTableType[] = data?.map(
    (Hiring: Hiring_type<Profile_Type>) => {
      return {
        id: Hiring?.id,
        Candiates: Hiring?.candidates?.length || 0,
        NewCandidates: NewCandidates(Hiring?.candidates || []),
        job_opening: Hiring?.job_information?.["Posting Title"] || "",
        hiring_lead:
          `${Hiring?.profiles?.["Basic Information"]?.["First name"]} ${Hiring?.profiles?.["Basic Information"]?.["Last name"]}` ||
          "",
        CreatedOn: new Date(Hiring?.created_at || "").toDateString() || "",
        department: Hiring?.Department?.name || "",
        Location: Hiring?.job_information?.["Job Location"] || "",
        status: Hiring?.["Job Status"] || "",
      };
    },
  );
  return (
    <div className="shadow-black-top flex h-full w-full flex-col items-center justify-center bg-white">
      <div className="flex w-5/6 flex-col gap-[1rem]">
        <div className="mt-4 w-full">
          <Link
            href={HirinSections[0]?.path + "/add/" + CreateHiringJob[0]}
            className="focus-within:shadow-green flex w-[11.5rem] items-center justify-center gap-[0.5rem] rounded-sm border border-color-primary-8 py-1 text-color-primary-8  duration-200 ease-in-out hover:!border-color-primary-7 hover:!text-color-primary-7"
          >
            <FaPlusCircle />
            Add Job Openings
          </Link>
        </div>
        <div className="flex w-full items-center justify-center">
          {isPending ? (
            <TableSkeleton />
          ) : (
            <HiringTable
              page={page}
              totalPages={meta?.totalPages}
              setPage={setPage}
              setFilter={setFilter}
              filter={filter}
              Hiring={HiringDataTable}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
