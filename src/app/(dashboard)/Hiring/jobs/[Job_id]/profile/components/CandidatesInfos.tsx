import React from "react";
import RatingSection from "./RatingSection";
import { CandidateType } from "@/types/candidate.types";
import DetailsCard from "../[Candidate_id]/Candidate-info/Components/DetailsCard";
import { VisibleDetailsCandidate } from "@/constants/Hiring/CandidateRoutes.constants";

function CandidatesInfos({
  candidates_data,
}: {
  candidates_data: CandidateType[];
}) {
  return (
    <div className="relative flex h-full w-4/12 flex-col items-start justify-center gap-[6rem] bg-gray-14 pb-[60%]">
      <div className="z-20 flex h-[13rem] w-full justify-center  bg-gradient-to-r from-color-primary-7  to-color-primary-9 transition-all duration-300 ">
        <RatingSection />
      </div>
      <div className="h-full  w-full ">
        <div className="flex w-full flex-col items-start justify-center px-6">
          {Object?.entries(
            {
              ...candidates_data[0]?.metadata,
              Email: candidates_data[0]?.Email,
            } || {},
          )?.map((object,index:number) => {
            return (
              VisibleDetailsCandidate.includes(object[0]) && (
                <DetailsCard
                  key={index}
                  label={object[0]}
                  className="border-b border-gray-18"
                  Component={
                    <h1 className="font-base">{object[1] || "---"}</h1>
                  }
                />
              )
            );
          })}
          <DetailsCard
            label={"Talent Pools"}
            Component={<h1 className="font-base">{"No Talent Pool."}</h1>}
          />
        </div>
      </div>
    </div>
  );
}

export default CandidatesInfos;
