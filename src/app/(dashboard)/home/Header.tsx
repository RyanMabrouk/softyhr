"use client";
import useData from "@/hooks/useData";
import Image from "next/image";
import React from "react";
import avatar from "/public/default_avatar.png";
import Link from "next/link";
export default function Header() {
  const {
    user_profile: { data: user },
  } = useData();
  const full_name =
    user?.["Basic Information"]?.["First name"] +
    " " +
    user?.["Basic Information"]?.["Last name"];
  return (
    <div className="mx-auto flex w-full max-w-[80rem] flex-row items-center gap-3">
      <Image
        src={user?.picture ?? avatar}
        alt="user-name"
        priority
        width={80}
        height={80}
        className="h-14 w-14 cursor-pointer rounded-full border border-white bg-gray-6 object-cover text-white"
      />
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-bold text-white">{full_name}</div>
        <Link
          className="-mt-1 text-sm font-medium text-white"
          href={{
            pathname: `/people/${user?.user_id}/personnal`,
          }}
        >
          View my info
        </Link>
      </div>
    </div>
  );
}
