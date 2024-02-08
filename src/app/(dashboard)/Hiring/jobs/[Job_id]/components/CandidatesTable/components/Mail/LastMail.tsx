import { CandidateType } from "@/types/candidate.types";
import React from "react";
import MailSended from "./MailSended";
import MailReceived from "./MailReceived";

function LastMail({ candidate }: { candidate: CandidateType }) {
  const last_email_candidate = candidate?.candidate_emails?.sort(
    (a: any, b: any) => b.created_at - a.created_at,
  )?.[0];
  const last_email_user = candidate?.user_emails?.sort(
    (a: any, b: any) => b.created_at - a.created_at,
  )?.[0];
     if (
       last_email_user &&
       last_email_user.candidate_sender === candidate?.id &&
       (last_email_user?.created_at > last_email_candidate?.created_at ||
         !last_email_candidate?.created_at)
     ) {
       return <MailReceived candidate={candidate} />;
     } else if (
       last_email_candidate &&
       last_email_candidate.candidate_receiver === candidate?.id
     ) {
       return <MailSended candidate={candidate} />;
     } else return <h1 className="text-gray-15">No Mails Yet.</h1>;
}

export default LastMail;
