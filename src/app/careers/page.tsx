"use client";
import React from "react";
import Loader from "../_ui/Loader/Loader";
import JobopeningList from "./components/JobopeningList";
import useHiring from "@/hooks/Hiring/useHiring";
import Empty from "./components/Empty";
import useHiringGuest from "./hooks/useHiringGuest";

function Page() {
  const { Hiring: data } = useHiringGuest({ "Job Status": "Open" });
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-14">
      {data?.data ? (
        <div className="flex  h-full w-full flex-col items-center justify-start bg-gray-14 pt-4">
          <JobopeningList data={data?.data} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Page;
