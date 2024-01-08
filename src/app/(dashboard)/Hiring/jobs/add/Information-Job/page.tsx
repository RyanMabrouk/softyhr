"use client";
import React, { useContext } from "react";
import { StepsContext } from "../provider/StepsProvider";

function page() {
  const { ApplicationDetails, Update_ApplicationDetails } = useContext(StepsContext);


  return (
    <div
      onClick={() => {
        Update_ApplicationDetails({ done: true });
      }}
    >
      click me!!!
    </div>
  );
}

export default page;
