"use client";

import useProfiles from "@/hooks/useProfiles";
import React, { useState, useEffect, useRef } from "react";

const SelectSharedUsers = ({ disabled, onSelect, selectedShared }: any) => {
  const {
    profiles: { data, isPending },
  } = useProfiles();

  const [isTyping, setIsTyping] = useState("");

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
    setDropdownOpen(false);
    setIsTyping("");
    if (!selectedShared.includes(option)) onSelect?.(option);
  };

  const handleDropdownToggle = () => {
    if (isTyping !== "") setDropdownOpen(true);
  };

  return (
    <div className={`relative inline-block  `}>
      <div className="flex cursor-pointer items-center justify-between rounded-sm">
        <input
          type="text"
          value={isTyping}
          onChange={(e) => {
            setIsTyping(e.target.value);
            handleDropdownToggle();
          }}
          disabled={!disabled}
          className="w-80 border border-stone-400 px-2 py-1 outline-1 transition-all duration-300 focus:outline-color1-300 "
        ></input>
      </div>
      {isDropdownOpen && !isPending && (
        <div className="shadow-green absolute  z-50 mt-[0.1rem]  w-80 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            ref={dropdownRef}
            className="h-52 overflow-y-scroll py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {data
              // ?.filter(
              //   (user: any) => !user.files_ids.includes(selectedShared.user_id),
              // )
              ?.filter((user: any) =>
                user?.["Basic Information"]?.["First name"]
                  .toUpperCase()
                  .includes(isTyping.toUpperCase()),
              )
              .map((user: any) => (
                <div
                  key={user.user_id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleOptionClick(user);
                  }}
                  className={` flex cursor-pointer items-center gap-4 px-4 py-2 text-sm text-gray-700 transition-all duration-150 hover:bg-color-primary-8 hover:text-white ${
                    selectedOption === user.user_id
                      ? "bg-color-primary-8 text-white"
                      : ""
                  }`}
                  role="menuitem"
                >
                  {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={
                        user?.picture
                          ? user?.picture
                          : "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg"
                      }
                      alt="user picture"
                      className="h-8 w-8 rounded-full object-cover "
                    />
                  }
                  {`${user?.["Basic Information"]?.["First name"]}     ${user?.["Basic Information"]?.["Last name"]} `}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectSharedUsers;
