"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import defaut_avatar from "/public/default_avatar.png";
import { ApproveButton } from "../ApproveButton";
import { DenyButton } from "../DenyButton";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { BiSolidUpArrow } from "react-icons/bi";
import { Calendar } from "./Calendar";
import { CalendarView } from "./CalendarView";
import useProfiles from "@/hooks/useProfiles";
import usePendingLeaveRequests from "@/hooks/TimeOff/usePendingLeaveRequests";
import usePolicy from "@/hooks/usePolicy";
import { formatDateToMonDDYYYY } from "@/helpers/date.helpers";
import {
  database_leave_request_duration_used_type,
  database_profile_type,
} from "@/types/database.tables.types";
import useAcceptedLeaveRequests from "@/hooks/TimeOff/useAcceptedLeaveRequests";
import { CgArrowLeft } from "react-icons/cg";
import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";
export default function Page() {
  const { leave_request_id } = useParams();
  const {
    profiles: { data: profiles },
  } = useProfiles();
  const {
    pending_leave_requests: { data: pending_leave_requests },
  } = usePendingLeaveRequests();
  const leave_request_data = pending_leave_requests?.find(
    (e) => e.id === Number(leave_request_id),
  );
  const profile = profiles?.find(
    (p: database_profile_type) => p.user_id === leave_request_data?.user_id,
  );
  const user = {
    name:
      profile?.["Basic Information"]?.["First name"] +
      " " +
      profile?.["Basic Information"]?.["Last name"],
    picture: profile?.picture,
  };
  const { category } = usePolicy({
    policy_id: leave_request_data?.policy_id ?? 0,
  });
  const leave_request = leave_request_data
    ? {
        ...leave_request_data,
        user_id: leave_request_data?.user_id as string,
        id: leave_request_data?.id as number,
        policy_id: leave_request_data?.policy_id as number,
        duration_used:
          leave_request_data?.duration_used as database_leave_request_duration_used_type[],
        total_duration: leave_request_data?.duration_used.reduce(
          (acc: number, e: any) => acc + Number(e.duration),
          0,
        ) as number,
        start_at: new Date(leave_request_data?.start_at ?? ""),
        end_at: new Date(leave_request_data?.end_at ?? ""),
        created_at: formatDateToMonDDYYYY(new Date("2022-01-01T00:00:00Z")),
      }
    : null;
  // accepted leave requests
  const {
    accepted_leave_requests: { data: accepted_leave_requests },
  } = useAcceptedLeaveRequests({
    end_at: leave_request?.end_at,
    start_at: leave_request?.start_at,
  });
  const accepted_leave_requests_data = accepted_leave_requests?.map((e) => {
    const user_profile = profiles.find(
      (p: database_profile_type) => p.user_id === e.user_id,
    );
    return {
      start_at: new Date(e.start_at),
      end_at: new Date(e.end_at),
      username:
        user_profile?.["Basic Information"]?.["First name"] +
        " " +
        user_profile?.["Basic Information"]?.["Last name"],
      user_picture: user_profile?.picture,
    };
  });
  return (
    <div className="relative ml-5 flex min-h-screen w-full flex-col items-center bg-gray-14">
      <header className="flex w-full flex-row items-center justify-between bg-white px-6 py-4 transition-all ease-linear ">
        <section className="flex flex-row items-center gap-2">
          <Image
            alt=""
            src={user?.picture ?? defaut_avatar}
            className="h-12 w-12 rounded-full"
            height={48}
            width={48}
            priority
          />
          <div className="flex flex-col justify-center">
            <div className="flex flex-row items-center gap-1">
              <span className="font-semibold">{user?.name}</span>
              <span className="text-sm leading-6 text-gray-21">-</span>
              <span className="text-sm leading-6 text-gray-21">
                {leave_request?.created_at}
              </span>
            </div>
            {/*<span className="text-sm leading-6 text-gray-21">
              {leave_request?.note ?? ""}
  </span>*/}
          </div>
        </section>
      </header>
      <hr className="mb-6 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
      <main className="mb-20 mt-6 flex h-fit w-full max-w-[80%] flex-col justify-center shadow-md">
        <header className="flex h-fit w-full flex-row items-center justify-between rounded-t-md bg-gray-23 px-6 py-4">
          <h1 className="text-xl text-white">TimeOffRequests</h1>
          {leave_request && (
            <section className="flex flex-row items-center gap-3">
              <ApproveButton
                request={leave_request}
                className="hover:border-white"
              />
              <DenyButton id={Number(leave_request_id)} />
            </section>
          )}
        </header>
        <section className="flex w-full flex-col gap-12 bg-white px-14 py-8 ">
          <div className="flex h-max w-full flex-row items-center gap-6">
            <Image
              alt=""
              src={user?.picture ?? defaut_avatar}
              className="h-20 w-20 rounded-full"
              height={48}
              width={48}
              priority
            />
            <div className="-mb-2 flex w-full flex-col gap-2">
              <span className="text-xl font-semibold text-gray-27">
                {user?.name}
              </span>
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-2">
                  <CalendarView date={leave_request?.start_at ?? new Date()} />
                  <TbArrowBigRightFilled className="text-3xl text-gray-21" />
                  <CalendarView date={leave_request?.end_at ?? new Date()} />
                </div>
                <div className="-mt-6 flex flex-col items-start justify-start">
                  <span className="text-lg text-gray-27">
                    {leave_request?.total_duration} hours of {category?.name}
                  </span>
                  <span className="text-sm text-gray-21">
                    Balance on date of request: {leave_request?.balance}{" "}
                    {category?.track_time_unit}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {leave_request?.note && (
            <div className="relative rounded-md bg-gray-17 px-8 py-4">
              {leave_request?.note}
              <BiSolidUpArrow className="absolute -top-4 left-7 text-2xl text-gray-17" />
            </div>
          )}
          <div className="flex flex-row items-start gap-12">
            <Calendar
              start_at={leave_request?.start_at ?? new Date()}
              end_at={leave_request?.end_at ?? new Date()}
            />
            <div className="flex flex-col gap-4">
              <span className="text-xl text-gray-27">
                Who else will be out?
              </span>
              <span className="-mt-3 text-lg font-semibold text-fabric-600">
                Approved
              </span>
              <div className="flex flex-col flex-wrap gap-2">
                {accepted_leave_requests_data &&
                accepted_leave_requests_data?.length > 0 ? (
                  accepted_leave_requests_data?.map((request, i) => (
                    <div
                      className="flex w-fit flex-col gap-0"
                      key={"accepted_leave_requests_data" + i}
                    >
                      <span className="text-sm text-gray-27 ">
                        {request.username}
                      </span>
                      <div className="flex flex-row items-center gap-4">
                        <Image
                          alt=""
                          src={request?.user_picture ?? defaut_avatar}
                          className="h-12 w-12 rounded-full"
                          height={48}
                          width={48}
                          priority
                        />
                        <div className="flex flex-row items-center gap-2">
                          <CalendarView date={request.start_at} />
                          <TbArrowBigRightFilled className="text-3xl text-gray-21" />
                          <CalendarView date={request.end_at} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <Player
                    src="https://lottie.host/85fb7313-2848-45c2-bdb9-2b729f57afc2/AwfmWMtW8n.json"
                    className="h-40 w-40"
                    loop
                    autoplay
                  />
                )}
              </div>
            </div>
          </div>
        </section>
        {/*<hr className="h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
        <footer className="flex w-full flex-row items-center justify-between rounded-b-md bg-gray-14  px-12 py-8 transition-all ease-linear">
          <TextFeildGeneric
            name="comment"
            label=""
            placeholder="Add a comment.."
          />
                </footer>*/}
      </main>
      <Link
        href={`/inbox/TimeOffRequests`}
        className="absolute -top-9 left-0 flex cursor-pointer flex-row items-center gap-1.5 text-sm text-gray-21 hover:text-color5-500 hover:underline"
      >
        <CgArrowLeft />
        <span>Time Off Requests</span>
      </Link>
    </div>
  );
}
