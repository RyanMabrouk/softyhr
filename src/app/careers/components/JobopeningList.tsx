import { Hiring_type } from "@/types/database.tables.types";
import React from "react";
import Jobopening from "./Jobopening";
import companyLogo from "/public/cropped (2).jpg";
import Image from "next/image";

interface JobopeningListTypeProps {
  data: Hiring_type[];
}

function JobopeningList({ data }: JobopeningListTypeProps) {
  return (
    <div className="relative  flex w-3/4 flex-col items-center justify-center gap-[2rem]">
      <div className="self-start">
        <Image
          className="cursor-pointer self-start"
          alt="company logo"
          src={companyLogo}
        />
      </div>
      <div className="shadow-popup  flex w-full flex-col items-start justify-center bg-white p-10">
        <div className="mb-6 flex flex-col items-start justify-center gap-[0.5rem]">
          <h1 className="text-3xl text-color-primary-8">Current Openings</h1>
          <h1 className="text-lg text-gray-15">
            Thanks for checking out our job openings. See something that
            interests you? Apply here.
          </h1>
        </div>
        {data?.map((job: Hiring_type) => {
          return <Jobopening job={job} />;
        })}
      </div>
      <div className="absolute bottom-0 h-[0.2rem] w-full bg-gradient-to-r from-color-primary-1 to-color-primary-3" />
    </div>
  );
}

export default JobopeningList;
