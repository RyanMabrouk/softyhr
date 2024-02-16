import getComment from "@/api/Hiring/getComment";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
export default function useComment(
  match?: {
    [key: string]: string | number | boolean | null | string[] | undefined;
  },
  column?: string,
  page?: number,
  rowsPerPage?: number,
  filter?: string | null,
) {
  const querykey: any = ["candidate_comments"];
  if (match && match.job_id) {
    querykey.push(match.job_id);
  }
  if (page != undefined) {
    querykey.push(page);
  }
  if (filter) {
    querykey.push(filter);
  }
  const {
    data: candidates,
    isPending,
    error,
    isFetched,
    isPlaceholderData,
  } = useQuery({
    queryKey: querykey,
    queryFn: () =>
      page != undefined && rowsPerPage != undefined
        ? getComment("candidate_comments", {
            match: match,
            column,
            StartPage: (page - 1) * rowsPerPage,
            EndPage: page * rowsPerPage,
          })
        : getComment("candidate_comments", {
            match: match,
            column,
          }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
  return {
    comments: {
      data: candidates?.data,
      error: candidates?.error,
      isPending: isPending,
      isFetched: isFetched,
      meta: candidates?.meta,
      isPlaceholderData,
    },
  };
}
