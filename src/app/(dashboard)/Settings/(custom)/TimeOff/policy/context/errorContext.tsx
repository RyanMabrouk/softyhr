"use client";
import { formerror } from "@/app/(auth)/signup/Form";
import { createContext, useState } from "react";
const ErrorContext = createContext({});
export default ErrorContext;
export type ErrorContextContextType = Partial<{
  error: formerror | null;
  setError: React.Dispatch<React.SetStateAction<formerror | null>>;
}>;
export function ErrorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [error, setError] = useState<formerror | null>(null);
  return (
    <ErrorContext.Provider
      value={{
        error,
        setError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}
