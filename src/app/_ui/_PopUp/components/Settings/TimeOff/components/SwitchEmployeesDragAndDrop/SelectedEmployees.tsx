"use client";
import React from "react";
import { PiUsersThreeFill } from "react-icons/pi";
import { EmployeeCard } from "./EmployeeCard";
import { allowDrop } from "@/helpers/dragAndDrop.helpers";
import { usersWithoutCurrentId } from "./SwitchEmployeesDragAndDrop";

export function SelectedEmployees({
  selectedEmployees,
  dropNonSelected,
}: {
  selectedEmployees: usersWithoutCurrentId[];
  dropNonSelected: (e: React.DragEvent<HTMLElement>) => void;
}) {
  return (
    <section className="flex min-h-full w-fit flex-col gap-1">
      <header className="font-semibold">Selected Employees</header>
      <main
        className="dropzone flex h-80 w-72 flex-col gap-1 overflow-y-auto rounded-sm border border-gray-18 bg-gray-28"
        onDrop={(e) => {
          dropNonSelected(e);
        }}
        onDragOver={(e) => allowDrop(e)}
      >
        {selectedEmployees?.map((employee) => (
          <EmployeeCard key={employee.user_id} {...employee} />
        ))}
        {selectedEmployees?.length === 0 && (
          <div className="my-auto flex w-full flex-col items-center justify-center text-center text-gray-21">
            <PiUsersThreeFill className="h-10 w-10" />
            <span className="text-xl">
              You haven't added any employees yet.
            </span>
          </div>
        )}
      </main>
    </section>
  );
}
