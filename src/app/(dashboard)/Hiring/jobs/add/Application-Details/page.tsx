"use client";
import React, { useContext } from "react";
import { StepsContext } from "../provider/StepsProvider";

function page() {
  const { ApplicationDetails } = useContext(StepsContext);
  console.log(ApplicationDetails);
  return <div>page</div>;
}

export default page;
