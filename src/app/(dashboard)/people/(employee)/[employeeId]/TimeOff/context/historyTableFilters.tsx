"use client";
import { database_leave_request_status_type } from "@/types/database.tables.types";
import { createContext, useState } from "react";
const historyTableFilters = createContext({});
export default historyTableFilters;
export type historyTableFiltersContextType = Partial<{
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  year: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  toggleView: boolean;
  setToggleView: React.Dispatch<React.SetStateAction<boolean>>;
  status: database_leave_request_status_type | "";
  setStatus: React.Dispatch<
    React.SetStateAction<database_leave_request_status_type>
  >;
}>;
export function HistoryTableFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [toggleView, setToggleView] = useState(false);
  return (
    <historyTableFilters.Provider
      value={{
        type,
        setType,
        year,
        setYear,
        toggleView,
        setToggleView,
        status,
        setStatus,
      }}
    >
      {children}
    </historyTableFilters.Provider>
  );
}
