import React, { createContext, useContext, useState } from "react";
type TotalDurationContextType = Partial<{
  totalDuration: number;
  setTotalDuration: React.Dispatch<React.SetStateAction<number>>;
}>;
const TotalDurationContext = createContext({});
export default function TotalDurationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [totalDuration, setTotalDuration] = useState(null);
  return (
    <TotalDurationContext.Provider value={{ totalDuration, setTotalDuration }}>
      {children}
    </TotalDurationContext.Provider>
  );
}
export function useTotalDurationContext() {
  const { totalDuration, setTotalDuration } =
    useContext<TotalDurationContextType>(TotalDurationContext);
  return { totalDuration, setTotalDuration };
}
