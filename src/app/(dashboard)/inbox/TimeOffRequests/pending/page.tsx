"use client";
import React from "react";
import usePendingLeaveRequests from "@/hooks/TimeOff/usePendingLeaveRequests";
import useProfiles from "@/hooks/useProfiles";
import { database_profile_type } from "@/types/database.tables.types";
import { formatDateToMonDDYYYY } from "@/helpers/date.helpers";
import { Card } from "../components/Card";
import useRealTime from "@/hooks/useRealTime";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "@/app/_ui/Loader/Loader";
import { Player } from "@lottiefiles/react-lottie-player";
import useFormattedLeaves from "../hooks/useFormattedLeavs";
export default function Page() {
  const {
    pending_leave_requests: {
      data: pending_leave_requests,
      isPending: isPending1,
    },
  } = usePendingLeaveRequests();
  const { data: pendingData, isPending: isPending2 } = useFormattedLeaves({
    leave_requests: pending_leave_requests,
  });
  const isPending = isPending1 || isPending2;
  const queryclient = useQueryClient();
  useRealTime({
    table: "leave_requests",
    event: "INSERT",
    onReceive: (payload) => {
      queryclient.invalidateQueries({
        queryKey: ["leave_requests", "pending"],
      });
    },
  });
  useRealTime({
    table: "leave_requests",
    event: "UPDATE",
    onReceive: (payload) => {
      queryclient.invalidateQueries({
        queryKey: ["leave_requests", "pending"],
      });
    },
  });
  return (
    <div className="ml-5 flex min-h-full w-full flex-col">
      {pendingData && pendingData.length > 0 ? (
        pendingData?.map((e) => (
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
    </div>
  );
}
