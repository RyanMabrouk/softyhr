"use client";
import React, { createContext, useState } from "react";
export type ShowPasswordToggleType = Partial<{
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}>;
const showPasswordToggle = createContext({});
export default showPasswordToggle;
export function ShowPasswordToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <showPasswordToggle.Provider value={{ showPassword, setShowPassword }}>
      {children}
    </showPasswordToggle.Provider>
  );
}
