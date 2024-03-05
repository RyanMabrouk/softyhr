"use client";
import React from "react";
import { statusType } from "./types/status.types";
import { GrNotes } from "react-icons/gr";
import Loader from "@/app/_ui/Loader/Loader";
import useCandidateStatus from "@/hooks/Hiring/useCandidateStatus";
import Link from "next/link";
import { FaTrash } from "react-icons/fa6";
import StatusCard from "./components/StatusCard";
import AddStatus from "./components/AddStatus";

function CandidateStatuses() {
  const { data, isPending } = useCandidateStatus();
  return (
    <div className="mt-6 flex flex-col pl-6">
      <p className="text-xl font-semibold text-black">Candidate Statuses</p>
      <div className="mt-4 w-full bg-gray-17">
        <div className="font-base flex items-center justify-start gap-2 px-4 py-2">
          <p className="font-bold text-gray-35">Status Name</p>
        </div>
      </div>
      <div>
        <div className="flex w-full items-start justify-center border-b border-gray-18 bg-gray-14">
          <div className="flex w-full items-center justify-start gap-2 px-4 py-2">
            <GrNotes className="text-gray-21" />
            <p className=" font-bold text-gray-35">Actif</p>
          </div>
        </div>
        {!isPending ? (
          <>
            {data
              ?.filter((status: statusType) => status?.group_name == "Actif")
              ?.map((status: statusType) => {
                return <StatusCard {...status} key={"status" + status?.id} />;
              })}
            <AddStatus group_name="Actif"/>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <div>
        <div className="flex w-full items-start justify-center border-b border-gray-18 bg-gray-14 px-4 py-2">
          <div className="flex w-full items-center justify-start gap-2">
            <GrNotes className="text-gray-15" />
            <p className=" font-bold text-gray-21">Disqualified</p>
          </div>
        </div>
        {!isPending ? (
          <>
            {data
              ?.filter(
                (status: statusType) => status?.group_name == "Disqualified",
              )
              ?.map((status: statusType) => {
                return <StatusCard {...status} key={"status" + status?.id} />;
              })}
            <AddStatus group_name="Disqualified" />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default CandidateStatuses;
