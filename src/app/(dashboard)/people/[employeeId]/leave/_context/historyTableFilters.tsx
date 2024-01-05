"use client";
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
}>;

export function HistoryTableFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [toggleView, setToggleView] = useState(false);
  return (
    <historyTableFilters.Provider
      value={{ type, setType, year, setYear, toggleView, setToggleView }}
    >
      {children}
    </historyTableFilters.Provider>
  );
}
