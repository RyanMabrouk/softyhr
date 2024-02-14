"use client";
import React from "react";
import {
  database_leave_request_duration_used_type,
  database_leave_request_status_type,
} from "@/types/database.tables.types";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { formatDateToMonDDYYYY } from "@/helpers/date.helpers";
import defaut_avatar from "/public/default_avatar.png";
import { DenyNotifBtn } from "./DenyNotifBtn";
import { ApproveNotifBtn } from "./ApproveNotifBtn";
export function PendingLeaveRequestNotification({
  id,
  policy_id,
  duration_used,
  user_id,
  name,
  date,
  note,
  picture,
  start_at,
  end_at,
  balance,
  status,
}: {
  id: number;
  name: string;
  date: string;
  note: string | null;
  picture?: string | null;
  policy_id: number;
  duration_used: database_leave_request_duration_used_type[];
  user_id: string;
  start_at: string;
  end_at: string;
  balance: number;
  status: database_leave_request_status_type;
}) {
  const queryClient = useQueryClient();
  return (
    <div className="group relative h-fit w-full">
      <div className="flex w-full flex-row items-center justify-between rounded-sm px-4 py-3 transition-all ease-linear hover:bg-gray-14">
        <section className="flex flex-row items-center gap-2">
          <Image
            alt=""
            src={picture ?? defaut_avatar}
            className="h-12 w-12 rounded-full"
            height={48}
            width={48}
            priority
          />
          <div className="flex flex-col justify-center">
            <div className="flex flex-row items-center gap-0.5">
              <Link
                href={`/inbox/TimeOffRequests/${id}`}
                className="flex flex-row items-center gap-1 text-gray-27 transition-all ease-linear first-letter:capitalize hover:text-fabric-700 hover:underline"
                onClick={() => {
                  queryClient.setQueryData(["leave_requests", id], () => ({
                    data: [
                      {
                        id,
                        name,
                        date,
                        note,
                        picture,
                        policy_id,
                        duration_used,
                        user_id,
                        start_at,
                        end_at,
                        balance,
                        status,
                      },
                    ],
                    error: null,
                  }));
                }}
              >
                <span className="capitalize">{name}</span>
                <span>is requesting Time off from</span>
                <span className="-mb-[1px] text-sm font-semibold">
                  {formatDateToMonDDYYYY(new Date(start_at))}
                </span>
                <span>to</span>
                <span className="-mb-[1px] text-sm  font-semibold">
                  {formatDateToMonDDYYYY(new Date(end_at))}
                </span>
              </Link>
            </div>
            <span className="mr-20 line-clamp-2 min-h-max text-sm leading-6 text-gray-21">
              Sent on {date}
            </span>
          </div>
        </section>
      </div>
      {status === "pending" && (
        <div className="absolute inset-y-0 right-[1.5rem]  flex h-full flex-row items-center gap-1.5 transition-all ease-linear">
          <ApproveNotifBtn
            request={{
              id: id,
              policy_id: policy_id,
              user_id: user_id,
              duration_used: duration_used,
            }}
            className="hidden group-hover:block"
          />
          <DenyNotifBtn
            id={id}
            className="hidden !border-gray-23 group-hover:block"
          />
        </div>
      )}
    </div>
  );
}
