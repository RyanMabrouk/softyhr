"use client";
import React from "react";
import useFormattedLeaves from "../hooks/useFormattedLeavs";
import { Card } from "../components/Card";
import Loader from "@/app/_ui/Loader/Loader";
import { Player } from "@lottiefiles/react-lottie-player";
import useAcceptedDeniedLeaves from "@/hooks/TimeOff/useAcceptedDeniedLeaves";
import { TbPlayerTrackNext } from "react-icons/tb";
import { useQueryClient } from "@tanstack/react-query";
import { database_leave_request_status_type } from "@/types/database.tables.types";
import getAcceptedDeniedLeavs from "@/api/TimeOff/getAcceptedDeniedLeavs";
export default function Page() {
  const [page, setPage] = React.useState(1);
  const queryclient = useQueryClient();
  const {
    accepted_denied_leaves: {
      data: accepted_denied_leaves,
      isPending: isPending1,
    },
  } = useAcceptedDeniedLeaves({
    page: page,
  });
  if (accepted_denied_leaves?.length === 8 && page) {
    const status: database_leave_request_status_type = "approved";
    const status2: database_leave_request_status_type = "rejected";
    queryclient.prefetchQuery({
      queryKey: ["leave_requests", status, status2, page + 1],
      queryFn: () =>
        getAcceptedDeniedLeavs({ status, status2, page: page + 1 }),
    });
  }
  const { data: formatted_leavs, isPending: isPending2 } = useFormattedLeaves({
    leave_requests: accepted_denied_leaves,
  });
  const isPending = isPending1 || isPending2;
  return (
    <div className="mb-10 ml-5 flex min-h-full w-full flex-col">
      {formatted_leavs && formatted_leavs.length > 0 ? (
        formatted_leavs?.map((e) => (
          <Card
            {...e}
            duration_used={e.duration_used.map((d: any) => ({
              date: String(d.date),
              duration: d.duration,
            }))}
            key={"card" + e.id}
          />
        ))
      ) : isPending ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Player
            src="https://lottie.host/85fb7313-2848-45c2-bdb9-2b729f57afc2/AwfmWMtW8n.json"
            className="h-60 w-60"
            loop
            autoplay
          />
        </div>
      )}
      <div className="flex w-full flex-row items-center justify-center">
        <div className="mt-4 flex w-60 flex-row items-center gap-7">
          <button
            disabled={page === 1}
            onClick={() => setPage((old) => old - 1)}
            className={`flex cursor-pointer flex-row items-center gap-0.5 self-start justify-self-start text-color5-500 hover:underline disabled:hidden`}
          >
            <TbPlayerTrackNext className="-mb-1 rotate-180 text-[0.75rem]" />
            <span>Prev</span>
          </button>
          <div
            className={`flex w-fit flex-row items-center justify-items-center gap-1.5 self-center justify-self-center text-gray-21 ${page === 1 ? "ml-auto" : ""}`}
          >
            <button
              disabled={page === 1}
              onClick={() => setPage((old) => old - 1)}
              className=" cursor-pointer rounded-sm border border-fabric-700 px-2 py-0.5 text-sm transition-all ease-linear hover:border-white hover:bg-fabric-700 hover:text-white disabled:hidden"
            >
              {page - 1}
            </button>
            <button className="cursor-pointer rounded-sm border border-gray-14 bg-gray-14 px-2 py-0.5 text-sm transition-all ease-linear hover:border-white hover:bg-fabric-700 hover:text-white">
              {page}
            </button>
            <button
              disabled={formatted_leavs && formatted_leavs.length < 8}
              className=" cursor-pointer rounded-sm border border-fabric-700 px-2 py-0.5 text-sm transition-all ease-linear hover:border-white hover:bg-fabric-700 hover:text-white disabled:hidden"
              onClick={() => setPage((old) => old + 1)}
            >
              {page + 1}
            </button>
          </div>
          <button
            disabled={formatted_leavs && formatted_leavs.length < 8}
            onClick={() => setPage((old) => old + 1)}
            className={`flex cursor-pointer flex-row items-center gap-0.5 self-end justify-self-end text-color5-500 hover:underline disabled:hidden`}
          >
            <span>Next</span>
            <TbPlayerTrackNext className="-mb-1 text-[0.75rem]" />
          </button>
        </div>
      </div>
    </div>
  );
}
