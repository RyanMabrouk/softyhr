"use client";
import React from "react";
import FolderBox from "./FolderBox";
import MiniLoader from "../../_ui/components/Loader/miniLoader/MiniLoader";
import { v4 as uuidv4 } from "uuid";
import GetFoldersByIDs from "@/actions/files/getFolders";
import { useQuery } from "@tanstack/react-query";
import useFoldersIds from "@/hooks/files/useFoldersIds";
import RoleGuard from "@/app/_ui/RoleGuard";
import { useAllFolders } from "../../../../../hooks/files/useAllFolders";

export default function TableSideBarFolderBox({
  setCheckAll,
}: {
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  const { wantedFoldersIds } = useFoldersIds();
  const { data: allFolders, isPending: isPending } = useAllFolders();
  const { data: { data: wantedFolders } = {} } = useQuery({
    queryKey: ["folders", wantedFoldersIds],
    queryFn: async () => await GetFoldersByIDs(wantedFoldersIds),
    enabled: wantedFoldersIds.length > 0,
  });
  return (
    <>
      <RoleGuard
        permissions={[
          "upload:files",
          "read:files",
          "delete:files",
          "share:files",
        ]}
      >
        <div className="flex flex-col gap-1 ">
          {isPending ? (
            <MiniLoader />
          ) : (
            allFolders?.data
              ?.sort((a, b) => a?.id - b?.id)
              .map((fold) => (
                <FolderBox
                  key={uuidv4()}
                  setCheckAll={setCheckAll}
                  folder={fold}
                />
              ))
          )}
        </div>
      </RoleGuard>
      <RoleGuard permissions={["upload:files", "access:employee_files"]}>
        <div className="flex flex-col gap-1 ">
          {wantedFolders
            ?.sort((a, b) => a?.id - b?.id)
            .map((fold) => (
              <FolderBox
                key={uuidv4()}
                setCheckAll={setCheckAll}
                folder={fold}
              />
            ))}
        </div>
      </RoleGuard>
    </>
  );
}
