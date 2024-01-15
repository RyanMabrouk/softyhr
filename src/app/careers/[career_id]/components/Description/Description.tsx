"use client";
import { Hiring_type } from "@/types/database.tables.types";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface DescriptionPropsType {
  job: Hiring_type;
}


function Description({ job }: DescriptionPropsType) {
  const TextRef = useRef(null);
  useEffect(()=>{
     if(TextRef.current) TextRef.current.innerHTML = job?.job_information?.["Job Description"] || "";
  },[])
  return (
    <div className="w-full py-4">
      <div className="flex flex-col pb-8 items-start justify-center gap-[1rem]">
        <h1 className="text-3xl text-color-primary-8">
          {job?.job_information?.["Posting Title"]}
        </h1>
        <h1 className="text-sm text-gray-15">
          {job?.job_information?.["Departement"]+" · "+job?.job_information?.["Job Location"]}
        </h1>
      </div>
      <div className="py-4 border-t border-gray-32"  ref={TextRef}>
      </div>
    </div>
  );
}

export default Description;
