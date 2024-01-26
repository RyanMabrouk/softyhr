"use client";
import React, { useContext } from "react";
import { StepsContext } from "../context/StepsProvider";
import { useRouter } from "next/navigation";
import AppQuestion from "./components/AppQuestion";
import ApplicationQuestionsList from "./components/ApplicationQuestionsList";
import AdditionalQuestions from "./components/AdditionalQuestions";
import AskGovermentJob from "./components/AskGovermentJob";

export default function Page() {
  const { ApplicationDetails, InformationJob } = useContext(StepsContext);
  const router = useRouter();
  const { done } = InformationJob;
  if (!done) router.push("/Hiring/jobs/add/Information-Job");
  else {
    const modules = {
      toolbar: {
        container: "#toolbar",
      },
    };

    return (
      <div className="flex w-full flex-col items-start justify-center gap-[2rem] ">
        <ApplicationQuestionsList />
        <AdditionalQuestions />
        <AskGovermentJob />
      </div>
    );
  }
}
