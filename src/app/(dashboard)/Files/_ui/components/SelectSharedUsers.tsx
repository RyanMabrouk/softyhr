"use client";
import useProfiles from "@/hooks/useProfiles";
import React, { useState, useEffect } from "react";
import default_avatar from "/public/default_avatar.png";
import { InputGeneric } from "@/app/_ui/InputGeneric";
import { database_profile_type } from "@/types/database.tables.types";
import Image from "next/image";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function SelectSharedUsers({
  disabled,
  onSelect,
  selectedShared,
}: {
  selectedShared: database_profile_type[];
  disabled: boolean;
  onSelect: (user: database_profile_type) => void;
}) {
  const {
    profiles: { data, isPending },
  } = useProfiles();
  const [isTyping, setIsTyping] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleOptionClick = (user: database_profile_type) => {
    //setDropdownOpen(false);
    //setIsTyping("");
    if (
      !selectedShared.some(
        (e: database_profile_type) => e.user_id === user.user_id,
      )
    ) {
      onSelect(user);
    }
  };
  useEffect(() => {
    if (isTyping !== "" && !isDropdownOpen) setDropdownOpen(true);
    else if (isTyping === "" && isDropdownOpen) setDropdownOpen(false);
  }, [isTyping, isDropdownOpen]);

  return (
    <div className="relative w-full">
      <div className="relative w-fit">
        <InputGeneric
          className=" !w-[30rem] !max-w-[30rem] disabled:cursor-not-allowed disabled:bg-white"
          name="search"
          placeholder="Enter names here.."
          setValueInParent={setIsTyping}
          value={isTyping}
          disabled={!disabled}
        />
        {isDropdownOpen && !isPending && (
          <button
            className="absolute inset-y-0 right-2 hover:opacity-70"
            type="button"
            onClick={() => setIsTyping("")}
          >
            <IoMdCloseCircleOutline className={"text-lg"} />
          </button>
        )}
      </div>

      {isDropdownOpen && !isPending && (
        <div className="shadow-green absolute  z-50 mt-[0.1rem]  w-80 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="h-52 overflow-y-scroll py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {data
              ?.filter(
                (user: any) =>
                  user?.["Basic Information"]?.["First name"]
                    .toUpperCase()
                    .includes(isTyping.toUpperCase()) &&
                  !selectedShared.some((e: any) => e.user_id === user.user_id),
              )
              .map((user: any) => (
                <div
                  key={user.user_id}
                  onClick={() => {
                    handleOptionClick(user);
                  }}
                  className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-all duration-150 ease-linear hover:bg-color-primary-8 hover:text-white `}
                  role="menuitem"
                >
                  {user.picture ? (
                    // dont switch to next/image here !!
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.picture}
                      alt=""
                      className="h-9 w-9 rounded-full  "
                    />
                  ) : (
                    <Image
                      src={default_avatar}
                      alt=""
                      className="h-9 w-9 rounded-full  "
                    />
                  )}
                  <span className="font-semibold">
                    {`${user?.["Basic Information"]?.["First name"]}     ${user?.["Basic Information"]?.["Last name"]} `}
                  </span>{" "}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
