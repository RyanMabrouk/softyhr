"use client";
import { popups } from "@/constants/popupComponents";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
// @ts-ignore
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function PopUp() {
  const searchParams = useSearchParams();
  const PopUp = searchParams.get("popup") || "";
  const pathname = usePathname();
  const Router = useRouter();
  const Component = popups[PopUp.toUpperCase()];
  const queryClient = useQueryClient();
  return (
    PopUp && (
      <div className="fixed top-0 z-30 flex h-screen w-screen items-center justify-center">
        <div
          className="absolute z-40 h-full w-full bg-gray-14"
          onClick={() => {
            queryClient.setQueryData(["fileIds"], []);
            Router.push(pathname);
          }}
        />
        <DndProvider backend={HTML5Backend}>
          <Component />
        </DndProvider>
      </div>
    )
  );
}

export default PopUp;
