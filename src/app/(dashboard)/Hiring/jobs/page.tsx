import { CreateHiringJob, HirinSections } from "@/constants/Hiring";
import Link from "next/link";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";

function page() {
  return (
    <div className="flex w-full items-center justify-center bg-white">
      <div className="mt-4 w-3/4">
        <Link
          href={HirinSections[0]?.path + "/add/" + CreateHiringJob[0]}
          className="duration-250 focus-within:shadow-green flex w-[11.5rem] items-center justify-center gap-[0.5rem] border border-color-primary-8 py-1  text-color-primary-8 ease-in-out hover:!border-color-primary-7 hover:!text-color-primary-7"
        >
          <FaPlusCircle />
          Add Job Openings
        </Link>
      </div>
    </div>
  );
}

export default page;
