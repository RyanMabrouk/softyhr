"use client";
import Image from "next/image";
import React from "react";
import defaut_avatar from "/public/default_avatar.png";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { ApproveButton } from "./ApproveButton";
import { DenyButton } from "./DenyButton";
import {
  database_leave_request_duration_used_type,
  database_leave_request_status_type,
} from "@/types/database.tables.types";
import { formatDateToMonDDYYYY } from "@/helpers/date.helpers";
import { useQueryClient } from "@tanstack/react-query";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
export function Card({
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
    <>
      <div className="group relative h-fit w-full">
        <Link
          href={`/inbox/TimeOffRequests/${id}`}
          className="flex w-full cursor-pointer flex-row items-center justify-between px-6 py-3 transition-all ease-linear hover:bg-gray-14"
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
              <div className="flex flex-row items-center gap-1">
                <span className="font-semibold">{name}</span>
                <span className="text-sm leading-6 text-gray-21">-</span>
                <span className="text-sm leading-6 text-gray-21">{date}</span>
              </div>
              <span className="mr-20 line-clamp-2 min-h-max text-sm leading-6 text-gray-21">
                {note ||
                  `Is requesting Time off from ${formatDateToMonDDYYYY(new Date(start_at))} to ${formatDateToMonDDYYYY(new Date(end_at))}`}
              </span>
            </div>
          </section>
          <section className="flex flex-row items-center gap-3 transition-all ease-linear">
            <IoIosArrowForward
              className={`text-xl text-gray-21 ${status === "pending" ? "group-hover:hidden" : ""}`}
            />
          </section>
        </Link>
        {status === "pending" && (
          <div className="absolute inset-y-0 right-10  flex h-full flex-row items-center gap-3 transition-all ease-linear">
            <ApproveButton
              request={{
                id: id,
                policy_id: policy_id,
                user_id: user_id,
                duration_used: duration_used,
              }}
              className="hidden group-hover:block"
            />
            <DenyButton
              id={id}
              className="hidden !border-gray-23 group-hover:block"
            />
          </div>
        )}
        {status === "approved" && (
          <div className="absolute inset-y-0 right-[3rem] flex h-full flex-row items-center gap-0.5 font-semibold text-fabric-700 transition-all ease-linear">
            <FaCheckCircle className={`h-4 w-4 `} />
            <span>Approved</span>
          </div>
        )}
        {status === "rejected" && (
          <div className="absolute inset-y-0 right-[3.4rem] flex h-full flex-row items-center gap-0.5 font-semibold text-color9-500 transition-all ease-linear">
            <MdCancel className="h-[1.125rem] w-[1.125rem] " />
            <span>Rejected</span>
          </div>
        )}
      </div>
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
    </>
  );
}
