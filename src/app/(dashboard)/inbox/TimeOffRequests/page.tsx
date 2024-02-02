"use client";
import Image from "next/image";
import React from "react";
import defaut_avatar from "/public/default_avatar.png";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
export default function Page() {
  const data = [
    {
      id: 1,
      name: "John Doe",
      date: "12/12/2014",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    },
    {
      id: 2,
      name: "John Doe",
      date: "12/12/2014",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    },
    {
      id: 3,
      name: "John Doe",
      date: "12/12/2014",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    },
    {
      id: 4,
      name: "John Doe",
      date: "12/12/2014",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    },
    {
      id: 5,
      name: "John Doe",
      date: "12/12/2014",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    },
    {
      id: 6,
      name: "John Doe",
      date: "12/12/2014",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    },
    {
      id: 7,
      name: "John Doe",
      date: "12/12/2014",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    },
    {
      id: 8,
      name: "John Doe",
      date: "12/12/2014",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    },
    {
      id: 9,
      name: "John Doe",
      date: "12/12/2014",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    },
  ];
  return (
    <div className="ml-5 flex h-full w-full flex-col justify-center">
      {data.map((e) => (
        <Card {...e} key={"card" + e.id} />
      ))}
    </div>
  );
}
function Card({
  id,
  name,
  date,
  description,
  picture,
}: {
  id: number;
  name: string;
  date: string;
  description: string;
  picture?: string;
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
          />
          <div className="flex flex-col justify-center">
            <div className="flex flex-row items-center gap-1">
              <span className="font-semibold">{name}</span>
              <span className="text-sm leading-6 text-gray-21">-</span>
              <span className="text-sm leading-6 text-gray-21">{date}</span>
            </div>
            <span className="text-sm leading-6 text-gray-21">
              {description}
            </span>
          </div>
        </section>
        <section className="flex flex-row items-center gap-3">
          <div className="hidden cursor-pointer rounded-md border border-fabric-700 px-2 py-1 text-center font-semibold text-fabric-700 transition-all ease-linear hover:bg-fabric-700 hover:text-white group-hover:block">
            Approve
          </div>
          <div className="hidden cursor-pointer rounded-md border border-fabric-700 px-2 py-1 text-center font-semibold text-gray-23 transition-all ease-linear hover:bg-gray-23 hover:text-white group-hover:block">
            Deny
          </div>
          <IoIosArrowForward className="text-xl text-gray-21 group-hover:hidden" />
        </section>
      </Link>
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
    </>
  );
}
