"use client";
import React, { createContext, useContext, useState } from "react";
export type checkedContextType = Partial<{
  checkAll: boolean;
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>>;
}>;
const checkedContext = createContext({});
export function CheckedContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checkAll, setCheckAll] = useState(false);
  return (
    <checkedContext.Provider value={{ checkAll, setCheckAll }}>
      {children}
    </checkedContext.Provider>
  );
}
export default function useCheckAllContext() {
  const { checkAll, setCheckAll } =
    useContext<checkedContextType>(checkedContext);
  return { checkAll, setCheckAll };
}
