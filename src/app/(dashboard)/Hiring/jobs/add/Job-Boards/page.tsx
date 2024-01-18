"use client";
import React, { memo, useContext } from "react";
import { StepsContext } from "../provider/StepsProvider";
import { useRouter } from "next/navigation";

function Page() {
  const { ApplicationDetails, InformationJob } = useContext(StepsContext);
  const router = useRouter();
  const { done: ApplicationDetails_done } = ApplicationDetails;
  const { done: InformationJob_done } = InformationJob;
  if (!ApplicationDetails_done && !InformationJob_done)
    router.push("/Hiring/jobs/add/Information-Job");
  else if (!ApplicationDetails_done)
    router.push("/Hiring/jobs/add/Application-Details");
  else {
    return (
      <div className="flex h-full w-full flex-col items-start justify-start gap-[1.5rem]">
        {false ? (
          <h1>Loading...</h1>
        ) : (
          <form className="flex flex-col items-start justify-start gap-[1rem]">
            <button type="submit">submit</button>
          </form>
        )}
      </div>
    );
  }
}

export default memo(Page);
