import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";

function AddCandidate() {
  const { Job_id } = useParams();
  return (
    <Link href={`/candidates/${Job_id}`} className="group flex cursor-pointer items-center justify-center gap-[0.2rem] text-base  font-medium text-color5-500 duration-150 ease-linear hover:!text-color-primary-7 hover:underline">
      <FaPlusCircle className="!text-base text-color5-600 duration-150 ease-linear group-hover:!text-color-primary-7" />
      Add Candidate
    </Link>
  );
}

export default AddCandidate;
