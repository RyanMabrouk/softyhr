"use client";
import getCandidate from "@/api/Hiring/getCandidates";
import { useQuery } from "@tanstack/react-query";
export default function useCandidateFullName(CandidateId: string | null) {
  const { data: profile, isPending } = useQuery({
    queryKey: [CandidateId],
    queryFn: () =>
      getCandidate("candidates", {
        match: { id: CandidateId },
        column: 'id,"First Name","Last Name",Email,email_history,metadata',
      }),
  });
  const FullName = `${profile?.data?.[0]?.["First Name"]} ${profile?.data?.[0]?.["Last Name"]}`;
  return { FullName, data: profile?.data?.[0], isPending };
}
