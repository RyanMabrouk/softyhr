"use client";
import { CreateHiringJob, HirinSections } from "@/constants/Hiring";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { FaPlusCircle } from "react-icons/fa";
import HiringTable from "../_ui/HiringTable/HiringTable";
import useData from "@/hooks/useData";
import { NewCandidates } from "@/helpers/CountNewCandidates";
import { Hiring_type } from "@/types/database.tables.types";
import { HiringTableType } from "../_ui/HiringTable/Hiringtable.types";

function Page() {
  const {
    Hiring: { data, isPending },
  } = useData();
  const HiringDataTable: HiringTableType[] = data?.map(
    (Hiring: Hiring_type) => {
      return {
        id: uuidv4(),
        Candiates: Hiring?.candidates?.length || 0,
        NewCandidates: NewCandidates(Hiring?.candidates || []),
        job_opening: Hiring?.job_information?.["Posting Title"],
        hiring_lead: Hiring?.job_information?.["Hiring Lead"],
        CreatedOn: new Date(Hiring?.created_at).toDateString(),
        department: Hiring?.job_information?.["Departement"],
        Location: Hiring?.job_information?.["Job Location"],
        status: Hiring?.job_information?.["Job Status"],
      };
    },
  );

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white">
      <div className="flex w-5/6 flex-col gap-[1rem]">
        <div className="mt-4 w-full">
          <Link
            href={HirinSections[0]?.path + "/add/" + CreateHiringJob[0]}
            className="duration-250 focus-within:shadow-green flex w-[11.5rem] items-center justify-center gap-[0.5rem] border border-color-primary-8 py-1  text-color-primary-8 ease-in-out hover:!border-color-primary-7 hover:!text-color-primary-7"
          >
            <FaPlusCircle />
            Add Job Openings
          </Link>
        </div>
        <div className="flex w-full items-center justify-center">
          {isPending ? (
            <h1>Loading...</h1>
          ) : (
            <HiringTable Hiring={HiringDataTable} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
