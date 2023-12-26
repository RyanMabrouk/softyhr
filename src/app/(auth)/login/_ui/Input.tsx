"use client";
import React, { useContext } from "react";
import showPasswordToggle from "../_context/showPasswordToggle";
export function Input({
  className,
  type,
  name,
  placeholder = "",
  children,
  setValueInParent,
}: {
  className?: string;
  type: string;
  name: string;
  placeholder?: string;
  children?: React.ReactNode;
  setValueInParent?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { showPassword }: any = useContext(showPasswordToggle);
  return (
    <div className="group relative flex h-12 w-full flex-row items-center justify-between rounded-sm border  border-gray-300 bg-[#f4f4f4] transition-all duration-200 ease-in-out focus-within:shadow-[0px_0px_4px_1px_#84bf41] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500">
      <span className="flex h-full w-12 items-center justify-center px-1">
        {children}
      </span>
      <input
        data-placeholder-trigger="keydown"
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        className={`h-full w-full rounded-sm px-2 pb-1 text-lg placeholder-gray-400 placeholder:text-lg placeholder:font-light  focus:outline-none ${className}`}
        onChange={(e) => setValueInParent && setValueInParent(e.target.value)}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
