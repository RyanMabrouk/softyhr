"use client";
import { createContext, useState } from "react";
const toggleDateSortContext = createContext({});

export default toggleDateSortContext;

export type toggleDateSortContextType = Partial<{
  toggleSort: boolean;
  setToggleSort: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export function ToggleDateSortContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggleSort, setToggleSort] = useState(false);
  return (
    <toggleDateSortContext.Provider value={{ toggleSort, setToggleSort }}>
      {children}
    </toggleDateSortContext.Provider>
  );
}
