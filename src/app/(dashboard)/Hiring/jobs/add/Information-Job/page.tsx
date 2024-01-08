"use client";
import React, { useContext } from "react";
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds";
import { StepsContext } from "../provider/StepsProvider";
import useData from "@/hooks/useData";

function Page() {
  const { ApplicationDetails } = useContext(StepsContext);
  const { settings: data } = useData();
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-[1.5rem]">
      <FiledsChamps
        FieldsArray={data?.data[0]["Hiring"]["Fields"]}
        champ={"hiring"}
      ></FiledsChamps>
    </div>
  );
}

export default Page;
