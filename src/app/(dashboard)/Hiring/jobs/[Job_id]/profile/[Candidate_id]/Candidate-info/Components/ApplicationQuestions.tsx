import { ObjectOfStrings } from "@/app/(dashboard)/Hiring/jobs/add/context/StepsContext";
import useHiring from "@/hooks/Hiring/useHiring";
import { CandidateType } from "@/types/candidate.types";
import { useParams } from "next/navigation";
import React from "react";
import DetailsCard from "./DetailsCard";
import { Empty } from "antd";

interface ApplicationQuestionsPropsType {
  candidate: CandidateType;
}

function ApplicationQuestions({ candidate }: ApplicationQuestionsPropsType) {
  let index = 0;
  return (
    <div className="mt-[3rem] flex w-full flex-col items-start justify-center gap-[0.54rem]">
      <h1 className="font-base text-2xl">Application Questions for this Job</h1>
      {candidate?.Questions ? (
        <div className="flex flex-col items-start justify-center gap-[0.4rem]">
          {Object?.entries(candidate?.Questions || {})?.map((Question) => {
            index++;
            return (
              <DetailsCard
                key={index}
                LabelclassName="!text-color-primary-7 !text-base !font-base"
                label={`${index}. ${Question?.[0]}`}
                Component={<h1 className="text-base">{Question?.[1]}</h1>}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-full w-full items-center justify-center rounded-md bg-gray-14 py-8 pt-4">
          <Empty description="No Questions Available." />
        </div>
      )}
    </div>
  );
}

export default ApplicationQuestions;
