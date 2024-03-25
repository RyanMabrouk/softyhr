"use client";
import React, { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";

export function SelectAllBtn({
  activeRoute,
  permissions,
  setPermessions,
}: {
  activeRoute:
    | { label: string; icon: React.ReactNode; permissions: string[] }
    | undefined;
  permissions: string[];
  setPermessions: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [open, setOpen] = useState(false);
  const handleSetAllToEdit = () => {
    const routeReadPerms = activeRoute?.permissions.filter((e) =>
      e.includes("read:"),
    );
    setPermessions((old) => [
      ...old.filter((e) => !routeReadPerms?.includes(e)),
      ...(activeRoute?.permissions?.filter((e) => e.includes("edit:")) ?? []),
    ]);
    setOpen((old) => !old);
  };
  const handleSetAllToView = () => {
    const routeEditPerms = activeRoute?.permissions.filter((e) =>
      e.includes("edit:"),
    );
    setPermessions((old) => [
      ...old.filter((e) => !routeEditPerms?.includes(e)),
      ...(activeRoute?.permissions?.filter((e) => e.includes("read:")) ?? []),
    ]);
    setOpen((old) => !old);
  };
  const handleSetAllToNoAccess = () => {
    setPermessions((old) =>
      old.filter((e) => !activeRoute?.permissions.includes(e)),
    );
    setOpen((old) => !old);
  };
  return (
    <div className="relative flex flex-col items-end justify-end">
      <button
        type="button"
        className="relative flex w-full cursor-pointer flex-row items-center gap-1 text-right text-color5-500 transition-all ease-linear hover:text-fabric-700 hover:underline"
        onClick={() => setOpen((old) => !old)}
      >
        <span className="-mb-1 ml-auto text-right">
          {`All Fields are set to ${
            !activeRoute?.permissions.some((e) => permissions.includes(e))
              ? "No Access"
              : permissions.every((e) => e.includes("edit:")) &&
                  activeRoute?.permissions.filter((e) => e.includes("edit:"))
                    .length === permissions.length
                ? "Edit"
                : permissions.every((e) => e.includes("read:")) &&
                    activeRoute?.permissions.filter((e) => e.includes("read:"))
                      .length === permissions.length
                  ? "View Only"
                  : "-Select-"
          }`}
        </span>
        <VscTriangleDown className="h-3 w-3" />
      </button>
      <span className="text-sm text-gray-21">{`Set all fields to No Access to hide the ${activeRoute?.label} tab.`}</span>
      {open && (
        <div className="shadow-green absolute  right-0 top-[60%] flex  h-fit flex-col rounded-sm bg-white">
          {activeRoute?.permissions.some((e) => e.includes("edit:")) && (
            <button
              type="button"
              className="py-2 pl-3 pr-20 text-left text-sm text-gray-27 transition-all ease-linear hover:bg-fabric-700 hover:text-white"
              onClick={handleSetAllToEdit}
            >
              Edit
            </button>
          )}
          <button
            type="button"
            className="py-2 pl-3 pr-20 text-left text-sm text-gray-27 transition-all ease-linear hover:bg-fabric-700 hover:text-white"
            onClick={handleSetAllToView}
          >
            View Only
          </button>
          <button
            type="button"
            className="py-2 pl-3 pr-20 text-left text-sm text-gray-27 transition-all ease-linear hover:bg-fabric-700 hover:text-white"
            onClick={handleSetAllToNoAccess}
          >
            No Access
          </button>
        </div>
      )}
    </div>
  );
}
