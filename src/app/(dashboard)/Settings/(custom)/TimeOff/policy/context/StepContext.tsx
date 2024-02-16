"use client";
import { createContext, useState } from "react";
const StepContext = createContext({});
export default StepContext;
export type StepContextContextType = Partial<{
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}>;
export function StepContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(1);
  return (
    <StepContext.Provider
      value={{
        step,
        setStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}
