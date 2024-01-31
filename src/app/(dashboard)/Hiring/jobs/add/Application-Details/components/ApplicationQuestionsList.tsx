import React, { useContext } from "react";
import AppQuestion from "./AppQuestion";
import {
  ApplicationDefaultQuestions,
  ApplicationDefaultQuestionsType,
} from "@/constants/Hiring/Hiring";
import { StepsContext } from "../../context/StepsProvider";

function ApplicationQuestionsList() {
  const { ApplicationDetails } = useContext(StepsContext);
  return (
    <div className="flex w-full flex-col items-start justify-center gap-[1rem]">
      <h1 className="text-black">Application Questions</h1>
      <div className="grid w-full grid-cols-3">
        {ApplicationDefaultQuestions?.map(
          (question: ApplicationDefaultQuestionsType, index: number) => {
            const value = ApplicationDetails?.values?.[question?.name];
            return (
              <AppQuestion
                key={index}
                type={question?.type}
                show={value?.AddToAppliement || question?.AddToAppliement}
                name={question?.name}
                required={value?.required || question?.required}
              />
            );
          },
        )}
      </div>
    </div>
  );
}

export default ApplicationQuestionsList;
