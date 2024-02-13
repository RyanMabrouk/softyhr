"use client";
import React from "react";
import FolderBox from "./FolderBox";
import MiniLoader from "../../components/Loader/miniLoader/MiniLoader";
import { v4 as uuidv4 } from "uuid";
import GetFoldersByIDs from "@/actions/files/getFolders";
import { useQuery } from "@tanstack/react-query";
import getData from "@/api/getData";
import useFoldersIds from "@/hooks/useFoldersIds";
import RoleGuard from "@/app/_ui/RoleGuard";

export default function TableSideBarFolderBox({ setCheckAll }: any) {
  const { data: allFolders, isPending: isPending } = useQuery({
    queryKey: ["folders"],
    queryFn: () =>
      getData("folders", {
        org: true,
        column: "*,files(*)",
      }),
  });
  const { wantedFoldersIds } = useFoldersIds();
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
              ?.sort((a: any, b: any) => a?.id - b?.id)
              .map((fold: any) => (
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
            ?.sort((a: any, b: any) => a?.id - b?.id)
            .map((fold: any) => (
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
