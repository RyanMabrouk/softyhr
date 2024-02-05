import Image from "next/image";
import React from "react";
import defaut_avatar from "/public/default_avatar.png";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { ApproveButton } from "./ApproveButton";
import { DenyButton } from "./DenyButton";
import { database_leave_request_duration_used_type } from "@/types/database.tables.types";
import { formatDateToMonDDYYYY } from "@/helpers/date.helpers";
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
}) {
  return (
    <>
      <Link
        href={`/inbox/TimeOffRequests/${id}`}
        className="group flex w-full cursor-pointer flex-row items-center justify-between px-6 py-4 transition-all ease-linear hover:bg-gray-14"
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
            <span className="text-sm leading-6 text-gray-21 min-h-max">{note || `Is requesting vacation from ${formatDateToMonDDYYYY(new Date(start_at))} to ${formatDateToMonDDYYYY(new Date(end_at))}`}</span>
          </div>
        </section>
        <section className="flex flex-row items-center gap-3">
          <ApproveButton request={{
            id: id,
            policy_id: policy_id,
            user_id:user_id ,
            duration_used:duration_used ,
          }} className="hidden group-hover:block" />
          <DenyButton
            id={id}
            className="hidden !border-gray-23 group-hover:block"
          />
          <IoIosArrowForward className="text-xl text-gray-21 group-hover:hidden" />
        </section>
      </Link>
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
    </>
  );
}
