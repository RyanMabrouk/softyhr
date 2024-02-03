  import getData from "@/api/getData";
  import getHiring from "@/api/getHiring";
  import { useQuery } from "@tanstack/react-query";

  export type MultipleValue = string | number | boolean | null | string[] | undefined;


  type QueryKeyType = string | number | MultipleValue

  export default function useHiring(
    match?: {
    [key:string]: MultipleValue
    },
    page?: number,
    rowsPerPage?: number,
    filter?: string | null,
  ) {
    const queryKey: any = ["Hiring", page, filter, match].filter(Boolean) as QueryKeyType;
    const {
      data: Hiring,
      isPlaceholderData,
      isPending,
    } = useQuery({
      queryKey: queryKey,
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
