import { CAREER_PATH } from "@/constants/LayoutRoute";
import { Hiring_type } from "@/types/database.tables.types";
import Link from "next/link";
import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

interface JobopeningTypeProps {
  job: Hiring_type;
}

function Jobopening({ job }: JobopeningTypeProps) {
  return (
    <div className="border-gray-31 flex w-full items-center justify-between border-t px-4 py-4 ">
      <div className="items flex flex-col justify-center gap-[1rem]">
        <h1 className="text-sm capitalize text-color-primary-8 ">
          {job?.job_information?.Departement}
        </h1>
        <Link
          href={CAREER_PATH + `/${job?.id}`}
          className="cursor-pointer text-lg capitalize text-color5-500 hover:text-color-primary-8 hover:underline"
        >
          {job?.job_information?.["Posting Title"]}
        </Link>
      </div>
      <div className="items flex flex-col justify-center gap-[1rem]">
        <div className="flex items-center justify-center gap-[0.3rem]">
          <MdLocationOn fill="#999999" />
          <h1 className="capitalize text-gray-27">
            {job?.job_information?.["Job Location"]?.slice(
              0,
              job?.job_information?.["Job Location"]?.indexOf(","),
            )}
          </h1>
        </div>
        <h1 className="capitalize text-gray-15">
          {job?.job_information?.["Job Location"]?.slice(
            job?.job_information?.["Job Location"]?.indexOf(", ") + 1,
            job?.job_information?.["Job Location"]?.length,
          )}
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-[1rem]">
        <div className="flex items-center justify-center gap-[0.3rem]">
          <FaUserGroup fill="#999999" />
          <h1 className="text-sm capitalize text-gray-27">
            {job?.job_information?.Departement}
          </h1>
        </div>
        <h1 className="capitalize text-gray-15">
          {job?.job_information?.["Employment Type"]}
        </h1>
      </div>
    </div>
  );
}

export default Jobopening;
