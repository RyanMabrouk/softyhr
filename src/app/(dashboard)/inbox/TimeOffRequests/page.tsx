"use client";
import React from "react";
import usePendingLeaveRequests from "@/hooks/usePendingLeaveRequests";
import useProfiles from "@/hooks/useProfiles";
import { database_profile_type } from "@/types/database.tables.types";
import { formatDateToMonDDYYYY } from "@/helpers/date.helpers";
import { Card } from "./Card";
import useRealTime from "@/hooks/useRealTime";
import { useQueryClient } from "@tanstack/react-query";
export default function Page() {
  const {
    pending_leave_requests: { data: pending_leave_requests },
  } = usePendingLeaveRequests();
  const {
    profiles: { data: profiles },
  } = useProfiles();
  const pendingData = pending_leave_requests?.map((e) => {
    const user = profiles?.find(
      (p: database_profile_type) => p.user_id === e.user_id,
    );
    return {
      ...e,
      name:
        user?.["Basic Information"]?.["First name"] +
        " " +
        user?.["Basic Information"]?.["Last name"],
      picture: user?.picture,
      date: formatDateToMonDDYYYY(new Date(e.start_at)),
    };
  });
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
    <div className="ml-5 flex h-full w-full flex-col">
      {pendingData?.map((e) => <Card {...e} key={"card" + e.id} />)}
    </div>
  );
}
