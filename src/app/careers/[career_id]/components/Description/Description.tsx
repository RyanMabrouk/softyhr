"use client";
import { Hiring_type } from "@/types/database.tables.types";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface DescriptionPropsType {
  job: Hiring_type;
}

function Description({ job }: DescriptionPropsType) {
  const TextRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
     if(TextRef.current) TextRef.current.innerHTML = job?.job_information?.["Job Description"] || "";
  },[])
  return (
                     
      <div className="py-4"  ref={TextRef}>
      </div>
    
  );
}

export default Description;
