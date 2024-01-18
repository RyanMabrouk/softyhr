"use client";
import React, { useContext } from "react";
import { StepsContext } from "../provider/StepsProvider";
import { useRouter } from "next/navigation";
import AppQuestion from "./components/AppQuestion";

export default function Page() {
  const { ApplicationDetails, InformationJob } = useContext(StepsContext);
  const router = useRouter();
  const { done } = InformationJob;
  //if (!done) router.push("/Hiring/jobs/add/Information-Job");
  //else {
  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  return (
    <div className="h-[10rem] w-full">
      <AppQuestion />
      <button type="submit">next step</button>
    </div>
  );
  //}
}
