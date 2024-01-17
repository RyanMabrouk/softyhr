"use client";
import useData from "@/hooks/useData";
import React from "react";
import Loader from "../_ui/Loader/Loader";
import Jobopening from "./components/Jobopening";
import JobopeningList from "./components/JobopeningList";
import Image from "next/image";

function page() {
  const { Hiring: data } = useData();
  console.log(data);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {data?.data ? (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gray-14">
          <JobopeningList data={data?.data} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default page;
