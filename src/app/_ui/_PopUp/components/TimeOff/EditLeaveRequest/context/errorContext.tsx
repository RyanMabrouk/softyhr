import React, { createContext, useState } from "react";
type formerror = {
  [key: string]: string;
};
export type errorContextType = Partial<{
  formError: formerror | null;
  setFormError: React.Dispatch<React.SetStateAction<formerror | null>>;
}>;
export const errorContext = createContext({});
export default function ErrorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formError, setFormError] = useState<formerror | null>(null);
  return (
    <errorContext.Provider value={{ formError, setFormError }}>
      {children}
    </errorContext.Provider>
  );
}
