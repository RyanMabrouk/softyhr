"use client";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiUsersThreeFill } from "react-icons/pi";
import { EmployeeCard } from "./EmployeeCard";

export function EmployeesContainer({
  handleRemove,
  users,
  emptyMsg,
}: {
  handleRemove: (user_id: string) => void;
  users: {
    user_id: string;
    picture: string;
    name: string;
  }[];
  emptyMsg?: string;
}) {
  return (
    <>
      <hr />
      <div className=" flex h-40 w-full flex-col items-start justify-start  gap-1.5 overflow-y-auto overflow-x-hidden rounded-md bg-white py-2">
        {users?.map((user) => (
          <div
            key={"user" + user.user_id}
            className={`flex  w-[12rem] cursor-pointer  items-center justify-between  rounded-md px-3 py-1 text-sm text-gray-700 transition-all duration-150 hover:bg-white   `}
          >
            <EmployeeCard name={user.name} picture={user.picture} />
            <button
              className="hover:opacity-70"
              type="button"
              onClick={() => handleRemove(user.user_id)}
            >
              <IoMdCloseCircleOutline className={"text-lg"} />
            </button>
          </div>
        ))}
        {emptyMsg && users?.length === 0 && (
          <div className="my-auto flex w-full flex-col items-center justify-center text-center text-gray-21">
            <PiUsersThreeFill className="h-10 w-10" />
            <span className="text-xl">{emptyMsg}</span>
          </div>
        )}
      </div>
      <hr className="mb-4 " />
    </>
  );
}
