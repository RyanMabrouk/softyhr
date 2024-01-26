import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";

export default function useCandidate(match?: {
  [key: string]: string | number | boolean | null | string[] | undefined;
}) {
  const {
    data: candidates,
    isPending,
    error,
    isFetched,
  } = useQuery({
    queryKey: ["Candidates", match?.job_id],
    queryFn: () =>
      getData("candidates", {
        org: true,
        match: match,
      }),
  });
  return {
    candidates: {
      data: candidates?.data,
      error: candidates?.error,
      isPending: isPending,
      isFetched: isFetched,
    },
  };
}
