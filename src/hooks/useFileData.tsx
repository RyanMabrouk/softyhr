import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";

export default function useFileData(fileId: any) {
  //--------------------Files--------------------
  const { data: file, isPending: isPending } = useQuery({
    queryKey: ["files", fileId],
    queryFn: () =>
      getData("files", {
        match: { id: fileId },
        org: true,
      }),
  });
  return {
    file: {
      data: file?.data,
      error: file?.error,
      isPending: isPending,
    },
  };
}
