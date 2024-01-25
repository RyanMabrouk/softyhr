"use client";
import Loader from "@/app/_ui/Loader/Loader";
import AppliymentForm from "@/app/careers/[career_id]/components/AppliymentForm/AppliymentForm";
import useHiring from "@/hooks/useHiring";
import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

function Page({ params: { job_id } }: { params: { job_id: string } }) {
  const {
    Hiring: { data, isPending },
  } = useHiring({ id: job_id });

  console.log(job_id);
  console.log(data);
  return isPending ? (
    <Loader />
  ) : (
    <div className="flex w-full items-start justify-center bg-white p-4">
      <div className="flex w-3/5 flex-col items-start justify-center">
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <div className="flex items-center justify-center gap-2">
            <BsArrowLeft className="gray-15" />
            <Link
              href={`/Hiring/jobs/${job_id}`}
              className="text-sm text-gray-15 duration-200 ease-linear hover:underline"
            >
              {data[0]?.job_information?.["Posting Title"] +
                "   -   " +
                data[0]?.job_information?.["Location"]}
            </Link>
          </div>
          <div className="flex w-full items-center justify-start gap-3 border-b border-gray-18 pb-4">
            <FaUserCircle className="!text-3xl !text-color-primary-8" />
            <h1 className="text-3xl text-color-primary-8">Add Candidate</h1>
          </div>
        </div>
        <AppliymentForm
          SuccessMessage="Candidate Added successfuly !"
          SubmittingButtonText="Adding Candidate..."
          ButtonText="Add Candidate"
          job={data[0]}
        />
      </div>
    </div>
  );
}

export default Page;
