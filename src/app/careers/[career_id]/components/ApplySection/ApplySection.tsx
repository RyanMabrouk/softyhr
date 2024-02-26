"use client";
import { HiringInfos, HiringInfosType } from "@/constants/Hiring/Hiring";
import { GetJobUrl } from "@/helpers/Hiring/GetJobUrl.helper";
import { Hiring_type } from "@/types/database.tables.types";
import React, { useEffect, useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin, FaTwitter } from "react-icons/fa6";

interface ApplySectionPropsType {
  job: Hiring_type;
}

interface ButtonsType {
  label: string;
  className: string;
}

function ApplySection({ job }: ApplySectionPropsType) {
  const [CurrentBtn, setCurrentBtn] = useState<string>("Apply for This job");
  const Buttons = [
    {
      label: "Apply for This job",
      className:
        "btn_swiper_arrow_right w-full cursor-pointer hover:!bg-color-primary-7 ease duration-200 rounded-sm py-2 bg-color-primary-8 text-white text-lg ",
    },
    {
      label: "◀ View Job Description",
      className:
        "btn_swiper_arrow_left w-full cursor-pointer hover:!bg-color-primary-7 ease duration-200 rounded-sm py-2 bg-color-primary-8 text-white text-lg ",
    },
  ];
  const [jobUrl, setJobUrl] = useState<string | null>(null); 

  useEffect(() => {
    const fetchJobUrl = async () => {
      try {
        const url = await GetJobUrl(String(job?.id));
        setJobUrl(String(url));
      } catch (error) {
        console.error("Error fetching job URL:", error);
      }
    };
    fetchJobUrl(); 
  }, [job?.id]);

  return (
    <>
      <div className="flex w-1/5 flex-col items-start justify-center">
        <div className="shadow-popup mt-20 flex  w-full flex-col  items-start justify-start gap-[1rem] bg-white px-8 py-4">
          {Buttons?.map(({ label, className }: ButtonsType) => {
            const isSelected = CurrentBtn === label ? "" : " hidden ";
            return (
              <button
                key={label}
                onClick={() =>
                  setCurrentBtn(
                    label == "Apply for This job"
                      ? "◀ View Job Description"
                      : "Apply for This job",
                  )
                }
                className={className + isSelected}
              >
                {label}
              </button>
            );
          })}
          <div className="flex w-full flex-col items-start justify-center gap-[0.3rem] border-t border-gray-32 py-4">
            <span className="text-sm text-gray-15">Link To This Job</span>
            <input
              readOnly
              value={jobUrl || ""}
              className="focus:focus-within:shadow-green h-[2rem] w-full rounded-sm border border-gray-19 px-2 outline-none duration-150  ease-in-out  focus:!border-color-primary-3 "
            />
          </div>
          <div className="flex items-start justify-center gap-[1rem]">
            <div className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center border border-gray-15 duration-150 ease-in-out hover:bg-gray-14">
              <FaLinkedin fill="gray" />
            </div>
            <div className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center border border-gray-15 duration-150 ease-in-out hover:bg-gray-14">
              <FaTwitter fill="gray" />
            </div>
            <div className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center border border-gray-15 duration-150 ease-in-out hover:bg-gray-14">
              <FaFacebookSquare fill="gray" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex w-full flex-col items-start justify-center gap-[1rem]">
          {HiringInfos?.map(
            ({ name, label }: HiringInfosType, index: number) => (
              <div
                key={index}
                className="flex w-full flex-col items-start justify-center gap-[0.3rem] border-b border-gray-32 pb-4"
              >
                <h1 className="text-sm text-gray-15">{label}</h1>
                <h1 className="">{String(job?.job_information?.[name]) || label=="Location" && "Remote"}</h1>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
}

export default ApplySection;
