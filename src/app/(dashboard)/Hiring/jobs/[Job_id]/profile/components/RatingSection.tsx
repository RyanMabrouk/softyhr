import React from "react";
import RatingGeneric from "../../components/CandidatesTable/components/RatingGeneric";
import { useParams } from "next/navigation";
import { FaMessage } from "react-icons/fa6";
import HireStatus from "../../components/CandidatesTable/components/HireStatus";
import useCandidate from "@/hooks/useCandidate";
import useHiring from "@/hooks/useHiring";

function RatingSection() {
  const Params = useParams();
  const { Candidate_id, Job_id } = Params;
  const {
    candidates: { data: candidates_data, isPending: candidates_isPending },
  } = useCandidate({ id: Candidate_id });
  const {
    Hiring: { data: Hiring_data, isPending: Hiring_isPending },
  } = useHiring({ id: Job_id });
  console.log(candidates_data);
  return (
    <div className="border-gray-36 flex flex-col items-center justify-center gap-3 rounded-md border-4 bg-white p-4 shadow-lg">
      {Hiring_isPending || candidates_isPending ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <RatingGeneric
            size="large"
            sx={{
              fontSize: "3rem",
            }}
            DefaultValue={4}
            id={String(Candidate_id)}
            tableName="candidates"
          />
          <div className="flex w-full items-center justify-center gap-2 border-b border-gray-18 pb-4">
            <div className="flex cursor-pointer items-center justify-center rounded-md border border-gray-15 p-2 px-3 shadow-md duration-200 ease-linear hover:!shadow-xl">
              <FaMessage className="text-2xl !text-gray-11" />
            </div>
            <div className="flex cursor-pointer items-center justify-center rounded-md border border-gray-15 p-2 px-3 shadow-md duration-200 ease-linear hover:!shadow-xl">
              <FaMessage className="text-2xl !text-gray-11" />
            </div>
          </div>
          <h1 className="">{`Set by Maja Andev 22 days ago:`}</h1>
          <HireStatus Hiring={Hiring_data[0]} candidate={candidates_data[0]} />
        </>
      )}
    </div>
  );
}

export default RatingSection;
