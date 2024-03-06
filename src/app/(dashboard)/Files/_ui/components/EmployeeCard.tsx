"use client";
import React from "react";
import default_avatar from "/public/default_avatar.png";
import Image from "next/image";

export function EmployeeCard({
  name,
  picture,
}: {
  name: string;
  picture: string;
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      {picture ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={picture} alt="" className="h-8 w-8 rounded-full  " />
      ) : (
        <Image src={default_avatar} alt="" className="h-8 w-8 rounded-full  " />
      )}
      <p className="line-clamp-1 ">{name}</p>
    </div>
  );
}
