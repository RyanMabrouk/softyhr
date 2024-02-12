"use client";
import Emaileditor from "@/app/(dashboard)/people/components/Fileds/EmailEditor/EmailEditor";
import Loader from "@/app/_ui/Loader/Loader";
import useCandidate from "@/hooks/Hiring/useCandidate";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useRef } from "react";
import { FaPlusCircle } from "react-icons/fa";
import ReplyEmailCard from "./components/ReplyEmailCard";
import { AnyARecord } from "dns";
import SendEmailCard from "./components/SendEmailCard";

function Page() {
  const params = useParams();
  const pathname = usePathname();
  const { Candidate_id, Job_id } = params;
  const {
    candidates: { data, isPending, meta, isPlaceholderData },
  } = useCandidate(
    { job_id: Job_id, id: Candidate_id },
    1,
    6,
    "All",
    '*,candidate_emails(created_at,email_object,profiles("Basic Information",picture),candidates("First Name","Last Name")),user_emails(created_at,email_object,candidate_sender,profiles("Basic Information",picture),candidates("First Name","Last Name"))',
    
    );

  return (
    <div className="flex h-full w-full items-start justify-center">
      <div className="flex w-8/12 flex-col items-start justify-start py-4">
        {isPending ? (
          <Loader />
        ) : (
          <div className="flex h-full w-full flex-col items-start justify-start">
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
              New Mail
            </Link>
            <div className="flex w-full flex-col items-start justify-center gap-[1rem] py-4">
              {[...data[0]?.candidate_emails, ...data[0]?.user_emails]
                ?.sort(
                  (a: any, b: any) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
                )
                ?.map((email: any) => {
                  console.log(email);
                  if (email?.candidate_sender)
                    return (
                      <>
                        <ReplyEmailCard key={email?.id} email={email} />
                        <div className="h-[1px] w-full bg-gray-18" />
                      </>
                    );
                  else
                    return (
                      <>
                        <SendEmailCard key={email?.id} email={email} />
                        <div className="h-[1px] w-full bg-gray-18" />
                      </>
                    );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
