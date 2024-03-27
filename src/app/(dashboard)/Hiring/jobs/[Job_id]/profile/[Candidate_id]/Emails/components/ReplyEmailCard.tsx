import Image from "next/image";
import React from "react";
import avatar from "/public/avatar.png";
import EmailDetail from "./EmailDetail";
import { DaysAgo, monthsAgo } from "@/helpers/date.helpers";
import { Avatar } from "antd";

interface EmailCardPropsType {
  email: any;
}

function ReplyEmailCard({ email }: EmailCardPropsType) {
  return (
    <div className="flex w-full cursor-pointer items-start justify-start gap-[1rem] rounded-md px-4 py-4 duration-200 ease-linear hover:!bg-gray-14">
      <Avatar
        size={40}
        icon={<Image alt="" width={100} height={100} src={avatar} />}
      />
      <div className="flex flex-col items-start justify-center gap-1">
        <div className="ظ٦بعمم flex items-start justify-start gap-1">
          <EmailDetail
            name="From"
            description={`${email?.candidates?.["First Name"]} ${email?.candidates?.["Last Name"]}`}
          />
          <h1 className="whitespace-nowrap text-sm text-gray-29 ">
            {DaysAgo(email?.created_at) || ""}
          </h1>
        </div>
        <EmailDetail
          name="To"
          description={`${email?.profiles?.["Basic Information"]?.["First name"]} ${email?.profiles?.["Basic Information"]?.["Last name"]}`}
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

export default ReplyEmailCard;
