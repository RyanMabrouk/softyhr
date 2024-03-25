import React, { ChangeEvent, useState } from "react";
import PopUpSkeleton from "../../../PopUpSkeleton";
import Confetti from "react-confetti";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiFillSafetyCertificate } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";

function HireCandidate() {
  const params = useSearchParams();
  const ApplicationId = params.get("ApplicationId");
  const Candidate = params.get("Candidate");
  const [checked, setCheked] = useState<boolean>();
  return (
    <PopUpSkeleton title="Hire">
      <div className="relative flex flex-col items-center justify-start gap-4 overflow-hidden px-10 py-4">
        <Confetti width={600} className="absolute left-0 top-0" height={400} />
        <AiFillSafetyCertificate className="!text-7xl text-color-primary-8" />
        <h1 className="font-light text-gray-11">{`Add ${"iheb sbeai"} as a new employee now.`}</h1>
        <div className="flex items-center justify-center gap-3 bg-gray-14 p-6">
          <Checkbox
            checked={checked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheked(e.target.checked);
            }}
            color="success"
          />
          <h1 className="text-gray- font-medium text-gray-29">
            Close this job opening and remove the public posting
          </h1>
        </div>
        <hr className="mt-4 h-[3px] w-full bg-primary-gradient" />
        <Link
          href={`/people/NewEmployee?DJO=${checked}&ApplicationId=${ApplicationId}&Candidate=${Candidate}`}
          className="text-bold !justify-start self-start rounded bg-color-primary-8 p-2 px-5 text-white duration-300 ease-in-out hover:!bg-color-primary-7 "
        >
          Add New Employee
        </Link>
      </div>
    </PopUpSkeleton>
  );
}

export default HireCandidate;
