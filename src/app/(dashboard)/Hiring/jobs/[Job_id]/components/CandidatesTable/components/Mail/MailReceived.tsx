import { DaysAgo } from "@/helpers/date.helpers";
import { CandidateType } from "@/types/candidate.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoIosMail } from "react-icons/io";

function MailReceived({ candidate }: { candidate: CandidateType }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-start justify-center">
      <h1 className="text-base font-medium">
        {candidate?.user_emails?.sort(
          (a: any, b: any) => a.created_at - b.created_at,
        )?.[0]?.email_object || ""}
      </h1>
      <div className="flex items-center justify-start gap-1">
        <div className="flex h-[1rem] items-center justify-center gap-1 rounded-sm bg-gray-14 px-1">
          <IoIosMail className="text-base text-gray-15" />
          <h1 className="text-sm text-gray-13">Received</h1>
        </div>
        <h1 className="font-base text-sm text-gray-15">
          {DaysAgo(
            candidate?.user_emails?.sort(
              (a: any, b: any) => a.created_at - b.created_at,
            )?.[0]?.created_at || "",
          )}
        </h1>
        <Link
          href={{
            pathname,
            query: {
              popup:"SEND_MAIL",
              id: candidate?.id
            }
          }}
          className="cursor-pointer text-color5-500 transition-all duration-300 ease-linear hover:underline"
        >
          Reply Now
        </Link>
      </div>
    </div>
  );
}

export default MailReceived;
