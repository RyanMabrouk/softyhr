"use client";
import { createContext, useContext, useState } from "react";
const SearchContext = createContext({});
type SearchContextContextType = Partial<{
  Search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}>;
export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [Search, setSearch] = useState("");
  return (
    <SearchContext.Provider
      value={{
        Search,
        setSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const { Search, setSearch } =
    useContext<SearchContextContextType>(SearchContext);
  console.log("🚀 ~ useSearch ~ Search:", Search);

  return {
    Search,
    setSearch,
  };
};
