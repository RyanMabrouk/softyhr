"use client";
import React, { useContext } from "react";
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds";
import { StepsContext } from "../provider/StepsProvider";
import useData from "@/hooks/useData";

function Page() {
  const { ApplicationDetails } = useContext(StepsContext);
  const { settings: data } = useData();
  return (
    <div className="flex h-full w-full flex-col items-start justify-start">
      <FiledsChamps
        FieldsArray={data?.data["Hiring"]["Fields"]}
        champ={"hiring"}
      ></FiledsChamps>
    </div>
  );
}

export default Page;
