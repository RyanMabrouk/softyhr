import React from "react";
import { Job_locationElementType } from "./AdditionnalInputs";
import { IoIosCheckbox } from "react-icons/io";
import { IconType } from "react-icons";

interface LocationCardPropsType {
  label: string;
  Icon: IconType;
  show: boolean;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  selected: boolean;
}

function LocationCard({
  label,
  show,
  Icon,
  setLocation,
  setShow,
  selected,
}: LocationCardPropsType) {
  return (
    <div
      onClick={() => {
        setLocation(label);
        setShow(show);
      }}
      className={
        "items-centerjustify-start group relative flex cursor-pointer  gap-[1rem] overflow-hidden border border-gray-15 p-4 px-8 duration-150 ease-in-out hover:scale-[1.03] " +
        (selected
          ? " shadow-green !border-color-primary-8"
          : "hover:!border-gray-11")
      }
    >
      <Icon
        className={
          "text-xl text-gray-14 " +
          (selected ? " !text-color-primary-8" : " !text-gray-15")
        }
      />
      <h1
        className={
          selected ? " capitalize !text-color-primary-8" : "capitalize"
        }
      >
        {label}
      </h1>
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
