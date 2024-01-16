import React, { createContext, useState } from "react";
export type dateRangeContextType = Partial<{
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
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
