import React from "react";
import { FaUsers } from "react-icons/fa";

type TopContentTableCandidateProps = {
  totalPages: number;
};

function TopContentTableCandidate({
  totalPages,
}: TopContentTableCandidateProps) {
  return (
    <div className="mt-2 flex flex-row items-center gap-2">
      <FaUsers className="text-xl font-semibold" fill="#686868" />
      {totalPages} candidats
    </div>
  );
}

export default TopContentTableCandidate;
