"use client";
import { DaysAgo } from "@/helpers/date.helpers";
import { Avatar } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { BiSolidCommentAdd } from "react-icons/bi";
import avatar from "/public/avatar.png";
import AddComment from "./AddComment";

interface CommentCardPropsType {
  PictureUrl: string;
  UserName: string;
  Created_at: string;
  Comment_content: string;
  ShowReply?: boolean;
  reply_id?: string;
  Candidate_id?: string;
  className?: string;
}

function CommentCard({
  PictureUrl = "",
  UserName = "",
  Created_at = "",
  Comment_content = "",
  className,
}: CommentCardPropsType) {
  return (
    <>
      <div
        className={`flex shadow-sm border border-gray-14 w-full items-start justify-start gap-[1rem] rounded-lg bg-white pb-1 p-2 pt-4 ${className}`}
      >
        <Avatar
          size={20}
          icon={
            <Image
              alt={UserName}
              width={100}
              height={100}
              src={PictureUrl || avatar}
            />
          }
        />
        <div className="flex flex-col items-start justify-center">
          <h1 className="font-base text-sm text-color5-500 duration-200 ease-linear hover:underline group-hover:!text-color-primary-8">
            {UserName}
          </h1>
          <div className="flex items-start justify-center">
            <h1 className="text-sm text-gray-33 ">{DaysAgo(Created_at)}</h1>
          </div>
          <h1 className="py-2 text-base">{Comment_content}</h1>
        </div>
      </div>
    </>
  );
}

export default CommentCard;
