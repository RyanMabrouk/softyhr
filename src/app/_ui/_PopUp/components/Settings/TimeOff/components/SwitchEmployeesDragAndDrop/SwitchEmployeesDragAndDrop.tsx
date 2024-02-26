"use client";
import React from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { SearchContextProvider } from "./context/SearchContext";
import { AvailableEmployees } from "./AvailableEmployees";
import { SelectedEmployees } from "./SelectedEmployees";
import { PiUploadSimple } from "react-icons/pi";
export type usersWithoutCurrentId = {
  user_id: string;
  name: string;
  current_name: string;
  current_id: number | null;
};
export function SwitchEmployeesDragAndDrop({
  children,
  setEmployees,
  setSelectedEmployees,
  employees,
  selectedEmployees,
}: {
  children?: React.ReactNode;
  setEmployees: React.Dispatch<React.SetStateAction<usersWithoutCurrentId[]>>;
  setSelectedEmployees: React.Dispatch<
    React.SetStateAction<usersWithoutCurrentId[]>
  >;
  employees: usersWithoutCurrentId[];
  selectedEmployees: usersWithoutCurrentId[];
}) {
  // Handle Drag and Drop
  function dropSelected(ev: React.DragEvent<HTMLElement>) {
    ev.preventDefault();
    if (ev.currentTarget.className.includes("dropzone")) {
      const id = ev.dataTransfer.getData("text/plain");
      setEmployees((prev) => {
        const employee = selectedEmployees.find((e) => e.user_id === id);
        if (employee) {
          return [...prev, employee];
        }
        return prev;
      });
      setSelectedEmployees((prev) => prev.filter((e) => e.user_id !== id));
    }
  }
  function dropNonSelected(ev: React.DragEvent<HTMLElement>) {
    ev.preventDefault();
    if (ev.currentTarget.className.includes("dropzone")) {
      const id = ev.dataTransfer.getData("text/plain");
      setSelectedEmployees((prev) => {
        const employee = employees.find((e) => e.user_id === id);
        if (employee) {
          return [...prev, employee];
        }
        return prev;
      });
      setEmployees((prev) => prev.filter((e) => e.user_id !== id));
    }
  }
  return (
    <main className="flex h-full w-full flex-col gap-6">
      <section className="flex h-full w-full flex-1 flex-row items-center justify-center gap-4">
        <SearchContextProvider>
          <AvailableEmployees
            employees={employees}
            dropSelected={dropSelected}
          />
        </SearchContextProvider>
        <div className="flex min-h-full grow flex-col items-center justify-center gap-1">
          <div
            role="button"
            onClick={() => {
              setSelectedEmployees([...employees, ...selectedEmployees]);
              setEmployees([]);
            }}
          >
            <MdKeyboardDoubleArrowRight className="h-9 w-9 cursor-pointer rounded-md border border-gray-18 px-1 py-0.5 text-gray-21 shadow-sm transition-all ease-linear hover:bg-gray-22 hover:shadow-md" />
          </div>
          <div
            role="button"
            onClick={() => {
              setEmployees([...employees, ...selectedEmployees]);
              setSelectedEmployees([]);
            }}
          >
            <MdKeyboardDoubleArrowLeft className="h-9 w-9 cursor-pointer rounded-md border border-gray-18 px-1 py-0.5 text-gray-21 shadow-sm transition-all ease-linear hover:bg-gray-22 hover:shadow-md" />
          </div>
        </div>
        <SelectedEmployees
          selectedEmployees={selectedEmployees}
          dropNonSelected={dropNonSelected}
        />
      </section>
      <p className="-mt-3 flex flex-row items-center gap-1.5 text-sm text-gray-26">
        <PiUploadSimple />
        <span>Drag and drop to select employees</span>
      </p>
      {children}
    </main>
  );
}
