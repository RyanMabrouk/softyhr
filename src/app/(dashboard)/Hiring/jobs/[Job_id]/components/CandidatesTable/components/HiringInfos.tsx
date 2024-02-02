import React from "react";
import Avatar from "./Avatar";
import useEmployeeData from "@/hooks/useEmloyeeData";

function HiringInfos({ Hiring }: any) {
  const { employee_profile:{ data, isPending} } = useEmployeeData({employeeId:Hiring?.job_information?.["Hiring Lead"]});
  return (
    <>
    {isPending ?
    <h1>Loading...</h1>
      :
  ( <div className="flex h-full items-center justify-center gap-[1rem]">
      <Avatar
        name={`${data?.["Basic Information"]?.["First name"]} ${data?.["Basic Information"]?.["First name"]}`}
      />
      <div className="flex h-full items-center justify-center gap-[1rem]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="whitespace-nowrap text-sm text-gray-15">
            Hiring Lead
          </h1>
          <h1 className="whitespace-nowrap text-sm">{`${data?.["Basic Information"]?.["First name"]} ${data?.["Basic Information"]?.["First name"]}`}</h1>
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
  )}
  </>
  );
}

export default HiringInfos;
