"use client";

import React, { useState, useEffect, useRef } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

const FilesSelectArrowDown = ({ onSelect, options }: any) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option.label);
    setDropdownOpen(false);
    // handleChange(option.value);
    onSelect?.(option.value);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div
      className={`relative inline-block  ${
        isDropdownOpen ? "shadow-green  " : ""
      }`}
    >
      <div
        onClick={handleDropdownToggle}
        className="flex cursor-pointer items-center justify-between rounded-sm"
      >
        <button
          onClick={(event) => {
            event.stopPropagation();
            handleDropdownToggle();
          }}
          className=" border border-transparent  p-1 transition-all ease-linear hover:border-stone-400 "
        >
          <TiArrowSortedDown className="text-gray-29" />
        </button>
      </div>
      {isDropdownOpen && (
        <div className="shadow-green absolute  z-50 mt-[0.1rem]  w-44 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            ref={dropdownRef}
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map(
              (
                option: {
                  value: string;
                  label:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | React.PromiseLikeOfReactNode
                    | null
                    | undefined;
                },
                index: React.Key | null | undefined,
              ) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={` block cursor-pointer px-4 py-2 text-sm text-gray-700 transition-all duration-150 hover:bg-color-primary-8 hover:text-white ${
                    selectedOption === option.value
                      ? "bg-color-primary-8 text-white"
                      : ""
                  }`}
                  role="menuitem"
                >
                  {option.label}
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesSelectArrowDown;
