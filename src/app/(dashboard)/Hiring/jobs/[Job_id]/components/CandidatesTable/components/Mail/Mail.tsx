import { MenuLinksGeneric } from "@/app/_ui/MenuLinksGeneric";
import React from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { IoIosMail, IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";

function Mail() {
  const pathname = usePathname();
  return (
    <MenuLinksGeneric
      id="Hiring_mail"
      options={[
        {
          name: "Update Status...",
          link: {
            pathname: pathname,
            query: {
              popup: "CHANGE_DEFAULT_HOURS_PER_DAY",
            },
          },
        },
        {
          name: "Move Candidate...",
          link: {
            pathname: pathname,
            query: {
              popup: "CHANGE_DEFAULT_HOURS_PER_DAY",
            },
          },
        },
        {
          name: "Delete Candidate...",
          link: {
            pathname: pathname,
            query: {
              popup: "CHANGE_DEFAULT_HOURS_PER_DAY",
            },
          },
        },
      ]}
    >
      <div
        id="timeoff_settings"
        className="flex cursor-pointer flex-row items-center justify-center gap-1 border border-gray-25 px-2 py-1.5 shadow-sm transition-all ease-linear hover:shadow-md"
      >
        <IoIosMail className="h-5 w-5 text-gray-25" />
        <VscTriangleDown className="h-3 w-3 text-gray-25" />
      </div>
    </MenuLinksGeneric>
  );
}

export default Mail;


/*
"use client";
import Emaileditor from "@/app/(dashboard)/people/components/Fileds/EmailEditor/EmailEditor";
import Loader from "@/app/_ui/Loader/Loader";
import useCandidate from "@/hooks/Hiring/useCandidate";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useRef } from "react";
import { FaPlusCircle } from "react-icons/fa";
import EmailCard from "./components/EmailCard";
import { AnyARecord } from "dns";

function Page() {
  const params = useParams();
  const pathname = usePathname();
  const { Candidate_id, Job_id } = params;
  const {
    candidates: { data, isPending, meta, isPlaceholderData },
  } = useCandidate(
    { job_id: Job_id, id: Candidate_id },
    1,
    1,
    "All",
    "*,candidate_emails(*),user_emails(*)",
  );

  return (
    <div className="">
      {isPending ? (
        <Loader />
      ) : (
        <div className="flex h-full w-full flex-col items-start justify-center">
          <Link
            href={{
              pathname: pathname,
              query: {
                popup: "SEND_MAIL",
                id: Candidate_id,
              },
            }}
            className="focus-within:shadow-green flex items-center justify-center gap-[0.5rem] rounded-sm border border-color-primary-8 px-4 py-1 text-color-primary-8  duration-200 ease-in-out hover:!border-color-primary-7 hover:!text-color-primary-7"
          >
            <FaPlusCircle />
            Send Mail
          </Link>
          <div className="flex w-10/12 flex-col items-start justify-center">
            {[...data[0]?.candidate_emails, ...data[0]?.user_emails]
              ?.sort(
                (a: any, b: any) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime(),
              )
              ?.map((email: any) => {
                return <EmailCard email={email} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;

*/