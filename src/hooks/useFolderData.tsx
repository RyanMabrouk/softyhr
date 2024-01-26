import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";

export default function useFolderData(folderId: any) {
  //--------------------Folders--------------------
  const { data: folder, isPending } = useQuery({
    queryKey: ["folders", folderId],
    queryFn: () =>
      getData("folders", {
        match: { id: folderId },
        org: true,
        column: "*,files(*)",
      }),
  });
  return {
    folder: {
      data: folder?.data,
      error: folder?.error,
      isPending: isPending,
    },
  };
}
