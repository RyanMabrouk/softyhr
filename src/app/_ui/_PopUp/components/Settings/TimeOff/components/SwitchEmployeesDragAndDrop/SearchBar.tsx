"use client";
import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useSearch } from "./context/SearchContext";

export function SearchBar() {
  const { setSearch, Search } = useSearch();
  return (
    <div className="group flex flex-row gap-1 rounded-t-sm border-2 border-transparent bg-white px-1.5 py-1.5 transition-all ease-linear focus-within:border-fabric-700">
      <IoSearchSharp className="z-10 h-7 w-7 text-gray-15 group-focus-within:text-fabric-700" />
      <input
        value={Search}
        onChange={(e) => setSearch && setSearch(e.target.value)}
        type="search"
        className="w-fit max-w-[80%] focus:outline-none"
        placeholder="Search…"
        size={30}
      />
    </div>
  );
}
