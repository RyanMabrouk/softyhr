"use client";
import React, { useContext } from "react";
import { StepsContext } from "../provider/StepsProvider";

function Page() {
  const { ApplicationDetails } = useContext(StepsContext);
  return <div>page</div>;
}

export default Page;
