"use client";
import React, { useEffect, useMemo } from "react";
import { usePendingLeaveRequestNotifications } from "../hooks/usePendingLeaveRequestNotifications";
import { NotificationType } from "../../Notifications";
export function GetPendingNotifications({
  setNotifications,
  setIsPending,
}: {
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    data: pendingNotifs,
    isPending: isPending1,
    isFetching,
  } = usePendingLeaveRequestNotifications();
  useEffect(() => {
    if (!isPending1 && pendingNotifs) {
      setNotifications((old) => [
        ...old.filter(
          (e) => !String(e.id).includes("card_pending_leave_notif"),
        ),
        ...pendingNotifs,
      ]);
    }
    // @ts-ignore adding pendingNotifs to the dependency array will cause an infinite loop
  }, [isPending1, setNotifications, isFetching]);
  useEffect(() => {
    setIsPending(isPending1);
  }, [isPending1, setIsPending]);
  return null;
}
