"use client";
import React from "react";
import usePendingLeaveRequests from "@/hooks/TimeOff/usePendingLeaveRequests";
import { Card } from "../components/Card";
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
  return (
    <div className="mb-10 ml-5 flex min-h-full w-full flex-col">
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
