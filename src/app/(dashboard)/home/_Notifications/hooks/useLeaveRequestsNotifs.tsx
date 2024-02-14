"use client";
import React from "react";
import useNotifications from "@/hooks/useNotifications";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { useDeleteNotificationMut } from "../../../../../hooks/home/useDeleteNotificationMut";
import { NotificationType } from "../Notifications";

export function useLeaveRequestsNotifs() {
  const {
    notifications: { data: unformatted_notifications, isPending },
  } = useNotifications({
    type: "leave_request",
  });
  const { deleteNotification } = useDeleteNotificationMut();
  const formatted_notifications: NotificationType[] =
    unformatted_notifications?.map((e) => {
      return {
        id: e.id,
        notification: (
          <div className="group relative h-fit w-full">
            <div className="flex w-full flex-row items-center gap-2 rounded-sm px-4 py-3 transition-all ease-linear hover:bg-gray-14">
              {e.status === "approved" && (
                <FaCheckCircle className="h-11 w-11 rounded-full text-fabric-700" />
              )}
              {e.status === "rejected" && (
                <MdCancel className="h-12 w-12 rounded-full text-color9-500" />
              )}
              {e.status !== "approved" && e.status !== "rejected" && (
                <FaInfoCircle className="h-11 w-11 rounded-full text-color5-500" />
              )}
              <div className="flex flex-col">
                <span className="flex flex-row items-center gap-1 font-semibold text-gray-27 transition-all ease-linear first-letter:capitalize ">
                  {e.message}
                </span>
                <span className="-mt-1.5 mr-20 line-clamp-2 min-h-max leading-8 text-gray-21 text-sm">
                  {e.description}
                </span>
              </div>
            </div>
            <div
              className="absolute inset-y-0 right-5 flex h-full w-fit cursor-pointer items-center justify-center text-gray-26 hover:text-gray-27"
              role="button"
              onClick={() => deleteNotification(e.id)}
            >
              <TiDelete className="h-6 w-6" />
            </div>
          </div>
        ),
        createdAt: new Date(e.created_at),
      };
    }) ?? [];
  return {
    data: formatted_notifications,
    isPending: isPending,
  };
}
