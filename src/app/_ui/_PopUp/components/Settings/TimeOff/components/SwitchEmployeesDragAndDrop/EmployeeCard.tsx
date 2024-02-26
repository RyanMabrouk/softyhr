"use client";
import React from "react";
import { capitalizeFirstLetter } from "@/helpers/string.helpers";
import { drag } from "@/helpers/dragAndDrop.helpers";

export function EmployeeCard({
  name,
  current_name,
  user_id,
}: {
  name: string;
  current_name: string;
  user_id: string;
}) {
  return (
    <div
      className="group grid cursor-pointer grid-cols-2 grid-rows-1 items-center justify-between gap-1 overflow-ellipsis border-b border-b-gray-18 bg-white px-1.5 py-1.5 hover:bg-color-primary-0"
      id={user_id}
      draggable
      onDragStart={(e) => drag(e)}
    >
      <span className="line-clamp-1 overflow-ellipsis text-[1.025rem] group-hover:text-fabric-700">
        {capitalizeFirstLetter(name)}
      </span>
      <span className="ml-0.5 line-clamp-1 overflow-ellipsis text-right text-sm capitalize text-gray-21 opacity-80">
        {current_name}
      </span>
    </div>
  );
}
