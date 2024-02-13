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
  const params = useParams();
  const { Job_id } = params;
  const {
    Hiring: { data },
  } = useHiring({ id: Job_id }, "Application_Details");
  let index = 0;
  return (
    <div className="flex w-full flex-col items-start justify-center gap-[0.54rem]">
      <h1 className="font-base text-2xl">Application Questions for this Job</h1>
      {data[0]?.Application_Details?.Questions?.length > 0 ? (
        <div className="flex flex-col items-start justify-center gap-[0.4rem]">
          {Object.entries(candidate?.Questions || {})?.map((Question) => {
            if (data[0]?.Application_Details?.Questions.includes(Question[0])) {
              index++;
              return (
                <DetailsCard
                  key={index}
                  LabelclassName="!text-color-primary-7 !text-base !font-base"
                  label={`${index}. ${Question[0]}`}
                  Component={<h1 className="text-base">{Question[1]}</h1>}
                />
              );
            }
          })}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Empty description="No Questions Available." />
        </div>
      )}
    </div>
  );
}

export default ApplicationQuestions;
