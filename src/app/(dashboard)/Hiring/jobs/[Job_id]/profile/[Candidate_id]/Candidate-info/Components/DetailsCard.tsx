import React, { ReactNode } from "react";

interface DetailsCardPropsType {
  label: string;
  Component: JSX.Element;
  LabelclassName?: string;
  className?: string;
}

function DetailsCard({
  label,
  Component,
  LabelclassName,
  className,
}: DetailsCardPropsType) {
  return (
    <div
      className={`flex w-3/5 flex-col items-start justify-start gap-2 py-3 pl-2 ${className}`}
    >
      <h1
        className={`whitespace-nowrap text-sm text-gray-29 ${LabelclassName}`}
      >
        {label}
      </h1>
      {Component}
    </div>
  );
}

export default DetailsCard;
