import getData from "@/api/getData";
import getHiring from "@/api/getHiring";
import { useQuery } from "@tanstack/react-query";

export default function useHiring(
  match?: {
    [key: string]: string | number | boolean | null | string[] | undefined;
  },
  page?: number,
  rowsPerPage?: number,
  filter?: string | null,
) {
  const querykey: any = ["Hiring"];
  if (page != undefined) {
    querykey.push(page);
  }
  if (filter) {
    querykey.push(filter);
  }
  if(match){
    querykey.push(match);
  }
  console.log(match, page, rowsPerPage, filter);
  const {
    data: Hiring,
    isPlaceholderData,
    isPending,
  } = useQuery({
    queryKey: querykey,
    queryFn: () =>
      page != undefined && rowsPerPage != undefined
        ? getHiring("Hiring", {
            match: match,
            StartPage: (page - 1)* rowsPerPage,
            EndPage: (page ) * rowsPerPage,
            column:"*,candidates(id,created_at)",
            filter,
          })
        : getHiring("Hiring", {
            match: match,
            filter,
          }),
  });
  return {
    Hiring: {
      data: Hiring?.data,
      error: Hiring?.error,
      isPending: isPending,
      isPlaceholderData,
      meta: Hiring?.meta,
    },
  };
}
