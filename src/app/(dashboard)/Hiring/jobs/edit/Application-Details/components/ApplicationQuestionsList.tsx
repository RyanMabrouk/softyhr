import React, { useContext } from "react";
import AppQuestion from "./AppQuestion";
import {
  ApplicationDefaultQuestions,
  ApplicationDefaultQuestionsType,
} from "@/constants/Hiring/Hiring";
import { StepsContext } from "../../../add/context/StepsContext";
import useHiring from "@/hooks/Hiring/useHiring";
import { useSearchParams } from "next/navigation";
import { EditApplicationContext } from "../context/EditApplicationDetailsContext";

function ApplicationQuestionsList() {
  const { ApplicationDetails } = useContext(EditApplicationContext);
    const params = useSearchParams();
    const id = params?.get("id");
    const {
      Hiring: { data: Hiring_data, isPending: Hiring_isPending },
    } = useHiring({ id });
  return (
    <div className="flex w-full flex-col items-start justify-center gap-[1rem]">
      <h1 className="text-black">Application Questions</h1>
      <div className="grid w-full grid-cols-3">
        {ApplicationDefaultQuestions?.map(
          (question: ApplicationDefaultQuestionsType, index: number) => {
            const value =Hiring_data?.[0]?.Application_Details?.[question?.name] || ApplicationDetails?.values?.[question?.name];
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
