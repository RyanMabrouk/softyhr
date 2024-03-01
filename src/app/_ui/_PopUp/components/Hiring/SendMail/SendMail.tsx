"use client";
import React, { useContext, useState } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import Loader from "@/app/_ui/Loader/Loader";
import useCandidateFullName from "@/hooks/Hiring/useCandidateFullName";
import { GrSend } from "react-icons/gr";
import { CgClose } from "react-icons/cg";
import ChangesSection from "@/app/(dashboard)/people/components/ChangesSection/ChangesSection";
import { sendMail } from "@/api/sendEmail";
import useToast from "@/hooks/useToast";
import Emaileditor from "@/app/(dashboard)/people/components/Fileds/EmailEditor/EmailEditor";
import postData from "@/api/postData";
import useUserProfile from "@/hooks/useUserProfile";
import MailProvider, {
  MailContext,
  MailContextType,
} from "./context/MailContext";
import { useQueryClient } from "@tanstack/react-query";
import AddAttachments from "./components/AddAtachments";

function Component() {
  const Searchparams = useSearchParams();
  const id = Searchparams.get("id");
  const pathname = usePathname();
  const params = useParams();
  const { Candidate_id, Job_id } = params;
  const Router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const { toast } = useToast();
  const { FullName, isPending, data } = useCandidateFullName(id);
  const {
    profiles: { data: user_data, error },
  } = useUserProfile();

  const { Mail } = useContext<MailContextType>(MailContext);
    console.log(Mail);
  console.log(data);
  const queryClient = useQueryClient();
  const SendMailHandler = async () => {
    const response = await sendMail(
      data?.Email,
      Mail?.email_object,
      Mail?.email_html,
    );
    if (response?.Status == "failed"){
      toast.error(response?.message || "Something Went Wrong");
      Router.push(pathname);
      return;
      }
    const { error } = await postData("candidate_emails", [
      {
        email: data?.Email,
        email_object: Mail?.email_object,
        user_sender: user_data?.data?.[0]?.user_id,
        candidate_receiver: id,
      },
    ]);
    if (response?.Status == "success" && !error) {
      toast.success(response?.message);
      Router.push(pathname);
      queryClient.invalidateQueries({ queryKey: ["Mails"] });
      queryClient.invalidateQueries({ queryKey: ["Candidates"] });
    } else toast.error(response?.message || "Something Went Wrong");
  };
  return (
    <>
      {!show ? (
        <>
          {isPending ? (
            <Loader />
          ) : (
            <div className="z-50 mt-10 flex flex-col gap-2 self-start">
              <div className="z-50 flex flex-col items-center justify-center gap-2">
                <div className="flex w-11/12 flex-row items-center justify-between">
                  <div className="flex gap-3 pb-2 text-2xl font-normal text-fabric-700">
                    <GrSend className="text-4xl text-color-primary-8" />
                    <h1>{`Send Mail To ${FullName}`}</h1>
                  </div>
                  <div
                    onClick={() => {
                      Router.push(pathname);
                    }}
                  >
                    <CgClose className="cursor-pointer text-3xl text-gray-15" />
                  </div>
                </div>
              </div>
              <form
                action={SendMailHandler}
                className={`shadow-popup rounded-sm bg-white`}
              >
                <button onClick={() => setShow(true)}>Add Attachement</button>
                <div className="h-[80vh] w-[100vw] bg-white px-4">
                  <Emaileditor />
                </div>
                <ChangesSection
                  OnCancelLink={`/Hiring/jobs/${Job_id}/profile/${Candidate_id}/Emails`}
                  PendingSubmitTxt="Sending..."
                  SubmitTxt="Send Email"
                />
              </form>
            </div>
          )}
        </>
      ) : (
        <AddAttachments setShow={setShow}/>
      )}
    </>
  );
}

export default function SendMail() {
  return (
    <MailProvider>
      <Component />
    </MailProvider>
  );
}
