"use client";
import useRealTime from "@/hooks/useRealTime";
import { useQueryClient } from "@tanstack/react-query";
export function RealTimeDataLeaveRequets() {
  console.log("🚀 ~ RealTimeDataLeaveRequets ~ RealTimeData for LeaveRequets:");
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
  return null;
}
