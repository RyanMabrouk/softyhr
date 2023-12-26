"use client";
import React, { createContext, useState } from "react";
const toggleFormDisplay = createContext({});
export default toggleFormDisplay;
export function ToggleFormDisplayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggleDisplay, setToggleDisplay] = useState(false);
  return (
    <toggleFormDisplay.Provider value={{ toggleDisplay, setToggleDisplay }}>
      {children}
    </toggleFormDisplay.Provider>
  );
}
