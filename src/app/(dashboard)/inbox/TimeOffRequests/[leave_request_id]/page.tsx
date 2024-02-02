"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import defaut_avatar from "/public/default_avatar.png";
import { ApproveButton } from "../ApproveButton";
import { DenyButton } from "../DenyButton";
export default function Page() {
  const { leave_request_id } = useParams();
  const user = {
    name: "John Doe",
    picture: null,
  };
  const leave_request = {
    id: leave_request_id,
    user_id: 1,
    date: "2022-01-01T00:00:00Z",
    note: "I need a day off",
  };
  return (
    <div className="ml-5 flex min-h-screen w-full flex-col items-center border border-red-500 bg-gray-14">
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
                {leave_request.date}
              </span>
            </div>
            <span className="text-sm leading-6 text-gray-21">
              {leave_request.note ?? ""}
            </span>
          </div>
        </section>
      </header>
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
      <main className="flex h-full w-full max-w-[80%] justify-center border border-red-500 pt-6">
        <header className="flex h-fit w-full flex-row items-center justify-between rounded-t-md bg-gray-23 px-6 py-4">
          <h1 className="text-xl text-white">TimeOffRequests</h1>
          <section className="flex flex-row items-center gap-3">
            <ApproveButton id={Number(leave_request_id)} />
            <DenyButton id={Number(leave_request_id)} />
          </section>
        </header>
        <section className="min-h-full bg-white"></section>
      </main>
    </div>
  );
}
