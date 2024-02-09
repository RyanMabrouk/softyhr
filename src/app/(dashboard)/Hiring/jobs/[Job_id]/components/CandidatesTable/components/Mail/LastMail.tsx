import { CandidateType } from "@/types/candidate.types";
import React from "react";
import MailSended from "./MailSended";
import MailReceived from "./MailReceived";

function LastMail({ candidate }: { candidate: CandidateType }) {
  const last_email_candidate = candidate?.candidate_emails?.sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )?.[0];
  const last_email_user = candidate?.user_emails?.sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )?.[0];
  console.log(candidate?.id);
  console.log(
    candidate?.candidate_emails?.sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() + new Date(a.created_at).getTime(),
    ),
  );
  console.log(
    candidate?.user_emails?.sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() + new Date(a.created_at).getTime(),
    ),
  );
  console.log(last_email_user?.created_at > last_email_candidate?.created_at ||
    new Date(last_email_user?.created_at).getTime() >
      new Date(last_email_candidate?.created_at).getTime());
      console.log(last_email_user, last_email_candidate);
  if (
    last_email_user &&
    last_email_user.candidate_sender === candidate?.id &&
    (last_email_user?.created_at > last_email_candidate?.created_at ||
      new Date(last_email_user.created_at).getTime() >
        new Date(last_email_candidate.created_at).getTime())
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
