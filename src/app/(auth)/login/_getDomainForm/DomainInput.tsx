import React from "react";
import { AiOutlineLink } from "react-icons/ai";

export function DomainInput() {
  return (
    <div className="group relative flex h-10 w-full flex-row items-center justify-between border  border-gray-300 bg-[#f4f4f4] transition-all duration-200 ease-in-out focus-within:shadow-[0px_0px_4px_1px_#84bf41] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500">
      <span className="flex h-full w-12 items-center justify-center px-1">
        <AiOutlineLink className="h-7 w-7 font-bold text-gray-400 group-focus-within:text-color-primary-5" />
      </span>
      <input
        placeholder="companydomain"
        className="h-full w-full px-2 pb-1 text-lg placeholder-gray-400 placeholder:text-lg placeholder:font-light  focus:outline-none"
        type="text"
        name="companydomain"
        data-placeholder-trigger="keydown"
        autoComplete="off"
        aria-label="companydomain"
        required
      />
    </div>
  );
}
