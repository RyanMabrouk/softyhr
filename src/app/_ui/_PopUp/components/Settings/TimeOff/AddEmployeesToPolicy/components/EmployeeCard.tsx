"use client";
import React from "react";
import { capitalizeFirstLetter } from "@/helpers/string.helpers";
import { drag } from "@/helpers/dragAndDrop.helpers";

export function EmployeeCard({
  name,
  current_policy_name,
  user_id,
}: {
  name: string;
  current_policy_name: string;
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
      <span className="line-clamp-1 text-right ml-0.5 capitalize opacity-80 overflow-ellipsis text-sm text-gray-21">
        {current_policy_name}
      </span>
    </div>
  );
}
