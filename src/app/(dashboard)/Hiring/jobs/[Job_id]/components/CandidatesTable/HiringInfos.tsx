import React from "react";
import Avatar from "./Avatar";

function HiringInfos({ Hiring }: any) {
  return (
    <div className="flex h-full items-center justify-center gap-[1rem]">
      <Avatar name={Hiring?.job_information?.["Hiring Lead"]} />
      <div className="flex h-full items-center justify-center gap-[1rem]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="whitespace-nowrap text-sm text-gray-15">
            Hiring Lead
          </h1>
          <h1 className="whitespace-nowrap text-sm">
            {Hiring?.job_information?.["Hiring Lead"]}
          </h1>
        </div>
        <div className="h-[3rem] w-[1px] bg-gray-18" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="whitespace-nowrap text-sm text-gray-15">Status</h1>
          <h1 className="whitespace-nowrap text-sm">
            {Hiring?.job_information?.["Job Status"]}
          </h1>
        </div>
        <div className="h-[3rem] w-[1px] bg-gray-18" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="whitespace-nowrap text-sm text-gray-15">Open</h1>
          <h1 className="whitespace-nowrap text-sm">0 Days</h1>
        </div>
      </div>
    </div>
  );
}

export default HiringInfos;
