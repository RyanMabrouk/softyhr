"use client";

import FileSettingsButton from "@/app/(dashboard)/Files/_ui/components/FileSettingsButton";
import React, { useState, useEffect, useRef } from "react";
import PeopleCheckBox from "./PeopleCheckBox";

const OrgChartSelect = ({ onSelect, options }: any) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");

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
    setSelectedLabel(option.label);
    setDropdownOpen(false);
    onSelect?.(option.value);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prevIsOpen) => !prevIsOpen);
  };
  function handleMouseLeave(): void {
    setDropdownOpen(false);
  }

  return (
    <div className="relative inline-block  ">
      <div
        onClick={handleDropdownToggle}
        className="flex cursor-pointer items-center justify-between rounded-sm"
      >
        <button
          onClick={(event) => {
            event.stopPropagation();
            handleDropdownToggle();
          }}
          className=" p-1 transition-all duration-300  "
        >
          <FileSettingsButton hover={false} />
        </button>
      </div>
      {isDropdownOpen && (
        <div
          className="shadow-green absolute -left-[7.5rem] z-20   w-44 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          onMouseLeave={handleMouseLeave}
        >
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
                    | null
                    | undefined;
                },
                index: React.Key | null | undefined,
              ) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={` flex cursor-pointer items-center  gap-2 px-4 py-2 text-sm text-gray-700 transition-all duration-150 hover:bg-color-primary-8 hover:text-white `}
                  role="menuitem"
                >
                  <PeopleCheckBox />
                  <p className="mb-1">{option.label}</p>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgChartSelect;
