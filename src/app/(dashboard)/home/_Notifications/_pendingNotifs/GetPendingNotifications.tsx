"use client";
import React, { useEffect } from "react";
import { usePendingLeaveRequestNotifications } from "./hooks/usePendingLeaveRequestNotifications";
import { NotificationType } from "../Notifications";

export function GetPendingNotifications({
  setNotifications,
  setIsPending,
}: {
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: pendingNotifs, isPending: isPending1 } =
    usePendingLeaveRequestNotifications();
  useEffect(() => {
    if (!isPending1 && pendingNotifs) {
      setNotifications((old) => [...old, ...pendingNotifs]);
    }
    // @ts-ignore adding pendingNotifs to the dependency array will cause an infinite loop
  }, [isPending1, setNotifications]);
  useEffect(() => {
    setIsPending((old) => isPending1);
  }, [isPending1, setIsPending]);
  return null;
}
