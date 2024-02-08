import { DaysAgo } from "@/helpers/date.helpers";
import { CandidateType } from "@/types/candidate.types";
import React from "react";

function MailSended({ candidate }: { candidate: CandidateType }) {
  return (
    <div className="flex flex-col items-start justify-center">
      <h1 className="text-base font-medium">
        {candidate?.candidate_emails?.sort(
          (a: any, b: any) => a.created_at - b.created_at,
        )?.[0]?.email_object || ""}
      </h1>
      <h1 className="font-base text-sm text-gray-15">
        {candidate?.candidate_emails?.length > 0
          ? "sent " +
            DaysAgo(
              candidate?.candidate_emails?.sort(
                (a: any, b: any) => a.created_at - b.created_at,
              )?.[0]?.created_at || "",
            )
          : " No Mail Sent Yet."}
      </h1>
    </div>
  );
}

export default MailSended;
