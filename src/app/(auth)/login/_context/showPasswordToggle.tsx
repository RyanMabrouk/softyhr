"use client";
import React, { createContext, useState } from "react";
const showPasswordToggle = createContext({});
export default showPasswordToggle;
export function ShowPasswordToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <showPasswordToggle.Provider value={{ showPassword, setShowPassword }}>
      {children}
    </showPasswordToggle.Provider>
  );
}
