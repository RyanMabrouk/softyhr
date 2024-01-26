"use client";
import { createContext, useState } from "react";
const ToggleVisivilityContext = createContext({});
export default ToggleVisivilityContext;
export type ToggleVisivilityContextContextType = Partial<{
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}>;
export function ToggleVisivilityContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggle, setToggle] = useState(false);
  return (
    <ToggleVisivilityContext.Provider value={{ toggle, setToggle }}>
      {children}
    </ToggleVisivilityContext.Provider>
  );
}
