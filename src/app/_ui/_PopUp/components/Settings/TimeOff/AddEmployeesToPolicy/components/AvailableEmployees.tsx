"use client";
import React from "react";
import { useSearch } from "../context/SearchContext";
import { usersWithoutCurrentPolicy } from "../AddEmployeesToPolicy";
import { EmployeeCard } from "./EmployeeCard";
import { SearchBar } from "./SearchBar";
import { allowDrop } from "@/helpers/dragAndDrop.helpers";

export function AvailableEmployees({
  employees,
  dropSelected,
}: {
  employees: usersWithoutCurrentPolicy[];
  dropSelected: (e: React.DragEvent<HTMLElement>) => void;
}) {
  const { Search } = useSearch();
  return (
    <section className="flex min-h-full w-fit flex-col gap-1">
      <header className="font-semibold">Available Employees</header>
      <main
        className="dropzone relative flex h-80 w-72 flex-col rounded-sm border border-gray-18 bg-gray-28"
        onDrop={(e) => dropSelected(e)}
        onDragOver={(e) => allowDrop(e)}
      >
        <SearchBar />
        <div className="h-full w-full overflow-y-scroll border-t border-t-gray-18">
          {employees
            ?.filter((employee) =>
              Search ? employee.name.includes(Search) : true,
            )
            .map((employee) => (
              <EmployeeCard key={employee.user_id} {...employee} />
            ))}
        </div>
      </main>
    </section>
  );
}
