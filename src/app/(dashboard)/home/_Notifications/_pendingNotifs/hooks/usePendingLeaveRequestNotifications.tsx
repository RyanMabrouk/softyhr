"use client";
import React from "react";
import usePendingLeaveRequests from "@/hooks/TimeOff/usePendingLeaveRequests";
import useFormattedLeaves from "../../../../inbox/TimeOffRequests/hooks/useFormattedLeavs";
import { PendingLeaveRequestNotification } from "../PendingLeaveRequestNotification";
import { NotificationType } from "../../Notifications";
import RoleGuard from "@/app/_ui/RoleGuard";
export function usePendingLeaveRequestNotifications(): {
  data: NotificationType[] | undefined;
  isPending: boolean;
} {
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
  return {
    data: pendingData?.map((e) => ({
      notification: (
        <PendingLeaveRequestNotification
          {...e}
          key={"card_pending_leave_notif" + e.id}
          duration_used={e.duration_used.map((d: any) => ({
            date: String(d.date),
            duration: d.duration,
          }))}
        />
      ),
      createdAt: new Date(e.created_at),
    })),
    isPending: isPending,
  };
}
