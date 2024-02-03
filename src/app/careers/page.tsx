"use client";
import React from "react";
import Loader from "../_ui/Loader/Loader";
import JobopeningList from "./components/JobopeningList";
import useHiring from "@/hooks/Hiring/useHiring";
import Empty from "./components/Empty";

function Page() {
  const { Hiring: data } = useHiring({ "Job Status": "Open" });
  console.log(data);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {data?.data ? (
        <div className="flex  h-full w-full flex-col items-center justify-start bg-gray-14 pt-6">
          <JobopeningList data={data?.data} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Page;
