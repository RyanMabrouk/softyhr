"use client";
import React, { useState } from "react";
import FolderBox from "./FolderBox";
import useData from "@/hooks/useData";
import MiniLoader from "../../components/Loader/miniLoader/MiniLoader";
import { v4 as uuidv4 } from "uuid";
import GetFoldersByIDs from "@/actions/files/getFolders";
import { useQuery } from "@tanstack/react-query";
import getData from "@/api/getData";
import GetFilesByIDs from "@/actions/files/getFiles";
import getFoldersIds from "@/actions/files/useFoldersIds";
import useFoldersIds from "@/actions/files/useFoldersIds";

export default function TableSideBarFolderBox({ setCheckAll }: any) {
  const { data: allFolders, isPending: isPending } = useQuery({
    queryKey: ["folders"],
    queryFn: () =>
      getData("folders", {
        org: true,
        column: "*,files(*)",
      }),
  });

  const {
    user_profile: { data: cur_user, isPending: isPending_user },
  } = useData();

  const role = cur_user?.role;

  const { wantedFoldersIds } = useFoldersIds();

  const { data: { data: wantedFolders } = {} } = useQuery({
    queryKey: ["folders", wantedFoldersIds],
    queryFn: async () => await GetFoldersByIDs(wantedFoldersIds),
  });

  if (role === "admin")
    return (
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
    );
  else if (role === "employee") {
    return (
      <div className="flex flex-col gap-1 ">
        {isPending_user ? (
          <MiniLoader />
        ) : (
          wantedFolders
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
    );
  }
}
