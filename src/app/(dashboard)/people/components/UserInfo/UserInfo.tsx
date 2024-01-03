import React from "react";
import { CiMail } from "react-icons/ci";
import { BsSignpostFill } from "react-icons/bs";
import { MdOutlineHomeWork, MdPhoneAndroid } from "react-icons/md";
import {
  FaFacebookSquare,
  FaHashtag,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { FaMapLocation } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

function UserInfo() {
  return (
    <div className="flex flex-col  items-start justify-center gap-[0.5rem] bg-gray-14 pb-[100%]">
      <div className="mt-10 flex flex-col gap-[1rem] px-6">
        <div className=" flex flex-col items-start  justify-center gap-[0.5rem]">
          <div className="flex items-center justify-start gap-[1rem] whitespace-nowrap text-sm text-gray-15">
            <MdOutlineHomeWork fill="gray" />
            <span className="text-sm"> 801-724-6600 Poste 123</span>
          </div>
          <div className="flex items-center justify-start gap-[1rem] whitespace-nowrap text-gray-15">
            <MdPhoneAndroid fill="gray" />
            <span className="text-sm">801-724-6600</span>
          </div>
          <div className="flex items-center justify-start gap-[1rem] whitespace-nowrap text-gray-15">
            <CiMail fill="gray" />
            <span className="text-sm">4754-5444-7556</span>
          </div>
        </div>
        <div className="flex items-center justify-start gap-[1rem] whitespace-nowrap text-gray-15">
          <FaLinkedin fill="gray" />
          <FaTwitter fill="gray" />
          <FaFacebookSquare fill="gray" />
          <FaPinterest fill="gray" />
          <FaTwitter fill="gray" />
        </div>
        <div className="h-px w-full  self-center bg-gray-16" />
        <div className=" flex flex-col gap-[0.3rem]">
          <h1 className="text-sm text-color-primary-7">Date d'embauche</h1>
          <h1 className="text-500 text-sm font-bold text-gray-15">
            2 déc. 2020
          </h1>
          <h1 className="text-sm font-medium text-gray-13">3y - 19d</h1>
        </div>
        <div className="h-px w-full  self-center bg-gray-16" />
        <div className="flex flex-col items-start justify-center gap-[0.5rem]">
          <div className="flex items-center justify-start gap-[1REM] text-gray-15">
            <FaHashtag fill="gray" />
            <span>5</span>
          </div>
          <div className="flex items-center justify-start gap-[1REM] text-sm font-normal text-gray-15">
            <BsSignpostFill fill="gray" />
            <span>Full-Time</span>
          </div>
          <div className="flex items-center justify-start gap-[1REM] text-sm  font-normal text-gray-15">
            <IoIosPeople fill="gray" />
            <span>Operations</span>
          </div>
          <div className="flex items-center justify-start gap-[1REM] text-sm font-normal text-gray-15">
            <FaMapLocation fill="gray" />
            <span>Amérique du Nord</span>
          </div>
          <div className="flex items-center justify-start gap-[1REM] text-sm  font-normal text-gray-15">
            <IoLocationSharp fill="gray" />
            <span>Lindon, Utah</span>
          </div>
          <div className="flex items-center justify-start gap-[1REM] text-sm  font-normal text-gray-15">
            <CiClock2 fill="gray" />
            <span>1:43 AM local time</span>
          </div>
        </div>
        <div className="h-px w-full  self-center bg-gray-16" />
        <div className="flex flex-col items-start justify-center gap-[0.5rem]">
          <h1 className="text-sm text-color-primary-7">Rapports directs</h1>
          <div className="flex items-center justify-start gap-[1rem]">
            <CgProfile fill="gray" />
            <h1 className="cursor-pointer text-sm font-normal text-gray-15 underline-offset-1 hover:underline">
              maja andev
            </h1>
          </div>
          <div className="flex items-center justify-start gap-[1rem]">
            <CgProfile fill="gray" />
            <h1 className="cursor-pointer text-sm font-normal text-gray-15 underline-offset-1 hover:underline">
              maja andev
            </h1>
          </div>
          <div className="flex items-center justify-start gap-[1rem]">
            <CgProfile fill="gray" />
            <h1 className="cursor-pointer text-sm font-normal text-gray-15 underline-offset-1 hover:underline">
              maja andev
            </h1>
          </div>
          <div className="flex items-center justify-start gap-[1rem]">
            <CgProfile fill="gray" />
            <h1 className="cursor-pointer text-sm font-normal text-gray-15 underline-offset-1 hover:underline">
              maja andev
            </h1>
          </div>
          <div className="flex items-center justify-start gap-[1rem]">
            <CgProfile fill="gray" />
            <h1 className="cursor-pointer text-sm font-normal text-gray-15 underline-offset-1 hover:underline">
              maja andev
            </h1>
          </div>
        </div>
      </div>
      <div className="h-full"></div>
    </div>
  );
}

export default UserInfo;
