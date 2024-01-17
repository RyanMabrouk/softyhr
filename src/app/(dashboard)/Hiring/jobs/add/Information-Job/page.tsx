"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds";
import { StepsContext } from "../provider/StepsProvider";
import useData from "@/hooks/useData";
import Input from "@/app/(dashboard)/people/components/Fileds/Input/Input";
import AdditionnalInputs from "./AdditionnalInputs";
import ReactQuill  from 'react-quill';

function Page() {
  const { InformationJob } = useContext(StepsContext);
  const { settings: { data, isPending} } = useData();
  const [value, setValue] = useState("");
  const quillRef = useRef();

  useEffect(() => {
    console.log(quillRef.current);
  }, [quillRef]);

  return (  
    <div className="flex h-full w-full flex-col items-start justify-start gap-[1.5rem]">
    { isPending?
        <h1>Loading...</h1>    
    :<form className="flex flex-col items-start justify-start gap-[1rem]">
        <FiledsChamps
          FieldsArray={data[0]["Hiring"]["Fields"]}
          champ={"hiring"}
          user={{ hiring: { ...InformationJob?.values } }}
        ></FiledsChamps>
        <AdditionnalInputs/>
        <button type="submit">submit</button>
      </form>}
    </div>
  );
}

export default Page;
