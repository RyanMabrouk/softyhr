import React from "react";
import { IconType } from "react-icons/lib";
export type ViewProps = {
  label: string;
  Icon: IconType;
  setValueInParent?: React.Dispatch<React.SetStateAction<string>>;
  valueInParent: string;
  discription?: string;
  className?: string;
};
export function ViewCard({
  label,
  Icon,
  discription,
  setValueInParent,
  valueInParent,
  className,
}: ViewProps) {
  const selected = valueInParent == label;
  return (
    <div
      onClick={() => {
        setValueInParent && setValueInParent(String(label));
      }}
      className={`group relative  flex min-h-28 w-[25rem] cursor-pointer  items-start  justify-start gap-1 overflow-hidden rounded-t-md bg-transparent px-4 py-4  transition-all duration-150 ease-in-out  ${
        selected ? " bg-white " : "hover:-translate-y-1 hover:scale-[1.03]"
      } ${className}`}
    >
      <Icon
        className={` h-8 w-20 self-start justify-self-start text-gray-15  ${selected ? " [&_*]:!text-fabric-700" : "group-hover:text-fabric-700"}`}
      />
      <div className="flex flex-col justify-center gap-0.5 overflow-hidden text-ellipsis">
        <h1
          className={`line-clamp-1 font-semibold capitalize opacity-90  ${selected ? "  !text-fabric-700" : " text-gray-21 group-hover:text-fabric-700"}`}
        >
          {label}
        </h1>
        <p className="text-sm text-gray-21 opacity-90">{discription}</p>
      </div>
    </div>
  );
}
