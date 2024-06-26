import { CAREER_PATH } from "@/constants/LayoutRoute";
import useDepartment from "@/hooks/useDepartment";
import { Hiring_type } from "@/types/database.tables.types";
import Link from "next/link";
import React from "react";
import { CgScreen } from "react-icons/cg";
import { FaUserGroup } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

interface JobopeningTypeProps {
  job: Hiring_type;
}

function Jobopening({ job }: JobopeningTypeProps) {
  const {
    Department: { data, isPending },
  } = useDepartment({ match: { id: job?.job_information?.Departement } });
  return (
    <div className="flex w-full items-center justify-between border-t border-gray-31 px-8 py-4 ">
      <div className="flex w-4/12 flex-col items-start justify-start gap-[1rem]">
        <h1 className="text-sm capitalize text-color-primary-8 ">
          {data?.[0]?.name}
        </h1>
        <Link
          href={CAREER_PATH + `/${job?.id}`}
          className="cursor-pointer text-lg capitalize text-color5-500 hover:text-color-primary-8 hover:underline"
        >
          {job?.job_information?.["Posting Title"]}
        </Link>
      </div>
      <div className="flex w-4/12 flex-col items-start justify-start gap-[0.5rem]">
        <div className="flex items-center justify-start gap-[0.3rem]">
          {job?.job_information?.["Location"] == "remote" ? (
            <CgScreen fill="#999999" />
          ) : (
            <MdLocationOn fill="#999999" />
          )}
          <h1 className="capitalize text-gray-27">
            {job?.job_information?.["Job Location"]?.slice(
              0,
              job?.job_information?.["Job Location"]?.indexOf(","),
            ) || "Remote"}
          </h1>
        </div>
        <h1 className="capitalize text-gray-15">
          {job?.job_information?.["Job Location"]?.slice(
            job?.job_information?.["Job Location"]?.indexOf(", ") + 1,
            job?.job_information?.["Job Location"]?.length + 1,
          ) || "Remote"}
        </h1>
      </div>
      <div className="flex w-4/12 flex-col items-start justify-start gap-[0.5rem]">
        {!data && !isPending ? (
          <div className="flex items-start justify-center gap-[0.3rem]">
            <FaUserGroup fill="#999999" />
            <h1 className="text-sm capitalize text-gray-27">
              {job?.job_information?.["Employment Type"]}
            </h1>
          </div>
        ) : (
          <div className="flex items-start justify-center gap-[0.3rem]">
            <FaUserGroup fill="#999999" />
              <h1 className="text-sm capitalize text-gray-27">
                <h1 className="capitalize text-gray-15">
                  {job?.job_information?.["Employment Type"]}
                </h1>
              </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobopening;
