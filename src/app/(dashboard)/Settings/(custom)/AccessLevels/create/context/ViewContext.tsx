"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
const ViewContext = createContext({});
export default ViewContext;
type ViewContextContextType = Partial<{
  View: string;
  setView: Dispatch<SetStateAction<string>>;
}>;
export function ViewContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [View, setView] = useState(<></>);
  return (
    <ViewContext.Provider value={{ View, setView }}>
      {children}
    </ViewContext.Provider>
  );
}
export const useViewContext = () => {
  const context = useContext<ViewContextContextType>(ViewContext);
  if (context === undefined) {
    throw new Error("useViewContext must be used within a ViewContextProvider");
  }
  return context;
};
