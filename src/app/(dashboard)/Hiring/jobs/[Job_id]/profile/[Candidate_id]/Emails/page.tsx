"use client";
import Emaileditor from "@/app/(dashboard)/people/components/Fileds/EmailEditor/EmailEditor";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useRef } from "react";
import { FaPlusCircle } from "react-icons/fa";

function Page() {
  const params = useParams();
  const pathname = usePathname();
  const { Candidate_id } = params;
  const emailEditorRef = useRef<any>(null);

  return (
    <div className="">
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
      <div>
        *,candidate_emails(created_at,email_object,profiles("Basic
        Information",picture),candidates("First Name","Last Name"))
      </div>
    </div>
  );
}

export default Page;
