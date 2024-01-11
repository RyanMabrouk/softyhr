"use client";
import React, { useContext } from "react";
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds";
import { StepsContext } from "../provider/StepsProvider";
import useData from "@/hooks/useData";
import submitForm from "@/api/test";

function Page() {
  const { InformationJob } = useContext(StepsContext);
  const { settings: data } = useData();
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-[1.5rem]">
      <form
        className="flex flex-col items-start justify-start gap-[1rem]"
        action={async (formdata: FormData) => await submitForm(formdata)}
      >
        <FiledsChamps
          FieldsArray={data?.data[0]["Hiring"]["Fields"]}
          champ={"hiring"}
          user={{ hiring: { ...InformationJob?.values } }}
        ></FiledsChamps>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Page;
