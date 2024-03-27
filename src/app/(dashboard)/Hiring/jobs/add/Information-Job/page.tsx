"use client";
import React, { memo, useContext } from "react";
import { StepsContext } from "../context/StepsContext";
import useData from "@/hooks/useData";
import AdditionnalInputs from "./components/AdditionnalInputs";
import FiledsChamps from "@/app/(dashboard)/people/components/sections/FiledsChamps";

function Page() {
  const { InformationJob } = useContext(StepsContext);
  const {
    settings: { data, isPending },
  } = useData();

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-[1.5rem] pb-12">
      {isPending ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col items-start justify-start gap-[1rem]">
          <FiledsChamps
            FieldsArray={data?.[0]["Hiring"]["Fields"]}
            champ={"hiring"}
            user={{ hiring: { ...InformationJob?.values } }}
          ></FiledsChamps>
          <AdditionnalInputs
            LocationValue={InformationJob?.values?.["Job Location"]}
            Job_locationValue={InformationJob?.values?.Location}
          />
        </div>
      )}
    </div>
  );
}

export default memo(Page);
