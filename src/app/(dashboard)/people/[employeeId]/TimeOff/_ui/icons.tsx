import React from "react";
import { FaBusinessTime } from "react-icons/fa";
import { LuPalmtree } from "react-icons/lu";
import { MdOutlineSick } from "react-icons/md";
import { IoBandage } from "react-icons/io5";
import { IoCalendar } from "react-icons/io5";
import { FaPlaneUp } from "react-icons/fa6";
import { RiHealthBookFill } from "react-icons/ri";
import { FaUniversity } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { FaBabyCarriage } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { ImHammer2 } from "react-icons/im";
import { FaMedal } from "react-icons/fa6";
type icons_type = {
  [key: string]: (className: string) => JSX.Element;
};
const icons: icons_type = {
  default: (className: string) => <FaBusinessTime className={className} />,
  palm: (className: string) => <LuPalmtree className={className} />,
  sick: (className: string) => <MdOutlineSick className={className} />,
  bandage: (className: string) => <IoBandage className={className} />,
  calender: (className: string) => <IoCalendar className={className} />,
  plane: (className: string) => <FaPlaneUp className={className} />,
  health: (className: string) => <RiHealthBookFill className={className} />,
  education: (className: string) => <FaUniversity className={className} />,
  home: (className: string) => <IoHomeSharp className={className} />,
  baby: (className: string) => <FaBabyCarriage className={className} />,
  cake: (className: string) => <FaBirthdayCake className={className} />,
  hammer: (className: string) => <ImHammer2 className={className} />,
  medal: (className: string) => <FaMedal className={className} />,
};
export default icons;
