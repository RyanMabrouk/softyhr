import React, { createContext, useState } from "react";
export type dateRangeContextType = Partial<{
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}>;
export const dateRangeContext = createContext({});
export default function DateRangeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <dateRangeContext.Provider
      value={{ startDate, setStartDate, endDate, setEndDate }}
    >
      {children}
    </dateRangeContext.Provider>
  );
}
