import React from "react";
import { Job_locationElementType } from "./AdditionnalInputs";
import { IoIosCheckbox } from "react-icons/io";
import { IconType } from "react-icons/lib";

interface LocationCardPropsType {
  label: string;
  Icon: IconType;
  show: boolean;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  selected: boolean;
  description?: string;
}

function LocationCard({
  label,
  show,
  Icon,
  setLocation,
  setShow,
  selected,
  description,
}: LocationCardPropsType) {
  return (
    <div
      onClick={() => {
        setLocation(label);
        setShow && setShow(show);
      }}
      className={
        "group relative flex max-w-[26rem] cursor-pointer items-center gap-[1rem] overflow-hidden rounded-sm border border-gray-15 p-4 px-6 duration-150 ease-in-out hover:scale-[1.03] " +
        (selected
          ? " shadow-green !border-color-primary-8"
          : "hover:!border-gray-11") +
        (description ? " justify-start" : " justify-center")
      }
    >
      <Icon
        className={
          " text-gray-14 " +
          (selected ? " !text-color-primary-8 " : " !text-gray-15 ") +
          (description ? "!text-6xl" : "!text-3xl")
        }
      />
      <div
        className={
          "flex flex-col items-center justify-center " + description
            ? " gap-3"
            : ""
        }
      >
        <h1
          className={
            selected ? " capitalize !text-color-primary-8" : "capitalize"
          }
        >
          {label}
        </h1>
        <h1 className="font-ligth text-sm text-gray-29">{description}</h1>
      </div>
      <IoIosCheckbox
        className={
          "absolute -bottom-1 -right-1 text-xl text-white duration-200 ease-in-out group-hover:!opacity-100 " +
          (selected
            ? " !text-color-primary-8 opacity-100"
            : " !text-gray-15 opacity-0")
        }
      />
    </div>
  );
}

export default LocationCard;
