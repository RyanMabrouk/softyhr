"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
type OptionType = {
  value: number;
  label: string;
};
const FilesSelectComponent = ({ isThereFile, onSelect, options }: any) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState("");

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const notDisabled = searchParams.has("popup") ? isThereFile : true;

  function handleChange(term: number | null) {
    if (!searchParams.has("popup")) {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("sortBy", String(term));
      } else {
        params.delete("sortBy");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  }

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

  const handleOptionClick = (option: OptionType) => {
    setSelectedOption(option.value);
    setSelectedLabel(option.label);
    setDropdownOpen(false);
    handleChange(option.value);
    if (onSelect) onSelect(option.value);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const ClearSelectHandler = () => {
    setSelectedOption(null);
    setSelectedLabel("");
    handleChange(null);
    setDropdownOpen(false);
    if (onSelect) onSelect("");
  };
  return (
    <div className="relative inline-block w-fit min-w-44">
      <div
        onClick={handleDropdownToggle}
        className={` relative flex cursor-pointer items-center justify-between rounded-sm border border-gray-300 bg-white pl-2  ${
          isDropdownOpen ? "shadow-green  " : ""
        }`}
      >
        <span className="line-clamp-1 max-w-[70%] break-all text-sm font-medium text-gray-27 ">
          {selectedLabel ? selectedLabel : "-Select an option-"}
        </span>
        <div
          onClick={ClearSelectHandler}
          className="absolute right-8 top-[0.45rem] cursor-pointer"
        >
          <MdOutlineClose className="text-lg text-gray-15" />
        </div>
        <div className="bg-gray-200 px-1.5 py-2 ">
          <IoMdArrowDropdown fill="#444" />
        </div>
      </div>
      {isDropdownOpen && notDisabled && (
        <div
          ref={dropdownRef}
          className="shadow-green absolute z-50 mt-[0.1rem] max-h-80 origin-top-right  overflow-y-auto rounded-sm bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {options
            .sort((a: OptionType, b: OptionType) => {
              const aLabel = a.label?.toString();
              return aLabel?.localeCompare(aLabel);
            })
            .map((option: OptionType, index: React.Key | null | undefined) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className={` line-clamp-1 cursor-pointer break-all px-3 py-1.5 text-sm leading-6 text-gray-700 transition-all duration-150 hover:bg-fabric-700 hover:text-white ${
                  selectedOption === option.value
                    ? "bg-fabric-700 text-white"
                    : ""
                }`}
                role="menuitem"
              >
                {option.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FilesSelectComponent;
