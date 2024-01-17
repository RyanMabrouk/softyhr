"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const FilesSelectComponent = ({ onSelect, options }: any) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  //
  //
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();

  function handleChange(term: any) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("sortBy", term);
    } else {
      params.delete("sortBy");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  //
  //

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
    setSelectedLabel(option.label);
    setDropdownOpen(false);
    handleChange(option.value);
    // onSelect(option.value);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block">
      <div
        onClick={handleDropdownToggle}
        className={`  flex w-44 cursor-pointer items-center justify-between rounded-sm border border-gray-300 pl-2  ${
          isDropdownOpen ? "shadow-green  " : ""
        }`}
      >
        <span className="text-sm font-medium text-gray-27">
          {selectedLabel ? selectedLabel : "Select an option"}
        </span>
        <div className="bg-gray-200 px-1.5 py-2 ">
          <IoMdArrowDropdown fill="#444" />
        </div>
      </div>
      {isDropdownOpen && (
        <div className="shadow-green absolute mt-[0.1rem]  w-44 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5">
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

export default FilesSelectComponent;
