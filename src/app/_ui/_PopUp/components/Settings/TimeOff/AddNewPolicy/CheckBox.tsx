import React from "react";
import { IconType } from "react-icons/lib";
import { IoIosCheckbox } from "react-icons/io";
interface CheckBoxPropsType {
  label: string;
  Icon: IconType;
  value: string | number;
  setValueInParent: React.Dispatch<React.SetStateAction<any>>;
  valueInParent: string;
  discription?: string;
  className?: string;
}
export function CheckBox({
  label,
  Icon,
  discription,
  value,
  setValueInParent,
  valueInParent,
  className,
}: CheckBoxPropsType) {
  const selected = valueInParent == value;
  return (
    <div
      onClick={() => {
        setValueInParent(String(value));
      }}
      className={`group relative flex w-[19rem] cursor-pointer items-start justify-start gap-1 overflow-hidden rounded-md border border-gray-33 px-4 py-4 duration-150 ease-in-out hover:scale-[1.03] ${
        selected ? " shadow-green !border-fabric-700" : "hover:!border-gray-11"
      } ${className}`}
    >
      <Icon
        className={` w-fit self-start justify-self-start ${
          selected ? " [&_*]:!text-fabric-700" : ""
        }`}
      />
      <div className="flex flex-col justify-center gap-0.5 overflow-hidden text-ellipsis">
        <h1
          className={`line-clamp-1 text-sm font-semibold capitalize opacity-90 ${selected ? "  !text-fabric-700" : " text-gray-21"}`}
        >
          {label}
        </h1>
        <p className="text-[0.8rem] text-gray-21 opacity-90">{discription}</p>
      </div>
      <IoIosCheckbox
        className={
          "absolute -bottom-1 -right-1 h-6 w-6 rounded-md text-xl text-white duration-200 ease-linear group-hover:!opacity-100 " +
          (selected
            ? " !text-fabric-700 opacity-100"
            : " !text-gray-15 opacity-0")
        }
      />
    </div>
  );
}
