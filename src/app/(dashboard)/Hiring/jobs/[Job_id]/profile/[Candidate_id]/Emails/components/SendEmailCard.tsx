import Image from "next/image";
import React from "react";
import avatar from "/public/avatar.png";
import EmailDetail from "./EmailDetail";
import { DaysAgo, monthsAgo } from "@/helpers/date.helpers";
import { Avatar } from "antd";

interface EmailCardPropsType {
  email: any;
}

function SendEmailCard({ email }: EmailCardPropsType) {
  return (
    <div className="flex w-full rounded-md cursor-pointer items-start justify-start py-4 px-4  gap-[1rem] duration-200 ease-linear hover:!bg-gray-14">
      <Avatar
        size={40}
        icon={
          <Image
            alt=""
            width={100}
            height={100}
            src={email?.profiles?.picture || avatar}
          />
        }
      />
      <div className="flex w-full flex-col items-start justify-center gap-1">
        <div className="flex w-full items-start justify-start gap-1">
          <EmailDetail
            name="From"
            description={`${email?.profiles?.["Basic Information"]?.["First name"]} ${email?.profiles?.["Basic Information"]?.["Last name"]}`}
          />
          <h1 className="whitespace-nowrap text-sm text-gray-29 ">
            {DaysAgo(email?.created_at) || ""}
          </h1>
        </div>
        <EmailDetail
          name="To"
          description={`${email?.candidates?.["First Name"]} ${email?.candidates?.["Last Name"]}`}
        />
        <EmailDetail name="Subject" description={email?.email_object} />
        <EmailDetail
          name="Status"
          description={monthsAgo(email?.created_at) || ""}
        />
      </div>
    </div>
  );
}

export default SendEmailCard;
