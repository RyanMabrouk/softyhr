import React from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
export default function InsightGeneric({
  tip,
  position,
}: {
  tip: string;
  position?: "top" | "bottom" | "left" | "right";
}) {
  const positions = {
    top: "tooltip-top",
    bottom: "tooltip-bottom",
    left: "tooltip-left",
    right: "tooltip-right",
  };
  return (
    <div
      className={`tooltip flex items-center justify-center ${positions[position ?? "top"]}`}
      data-tip={tip}
    >
      <BsQuestionCircleFill className="cursor-pointer text-gray-34 hover:text-gray-20" />
    </div>
  );
}
