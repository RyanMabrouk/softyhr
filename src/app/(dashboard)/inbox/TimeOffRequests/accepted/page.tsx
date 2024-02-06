"use client";
import React from "react";
import useFormattedLeaves from "../hooks/useFormattedLeavs";
import { Card } from "../components/Card";
import Loader from "@/app/_ui/Loader/Loader";
import { Player } from "@lottiefiles/react-lottie-player";
import useAcceptedDeniedLeaves from "@/hooks/TimeOff/useAcceptedDeniedLeaves";
export default function Page() {
  const [page, setPage] = React.useState(1);
  const {
    accepted_denied_leaves: {
      data: accepted_denied_leaves,
      isPending: isPending1,
    },
  } = useAcceptedDeniedLeaves({
    page: page,
  });
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
    </div>
  );
}
