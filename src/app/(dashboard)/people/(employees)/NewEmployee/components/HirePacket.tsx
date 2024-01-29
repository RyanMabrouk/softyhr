import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { BiSolidCommentDetail } from "react-icons/bi";
import UserSection from "../../../components/UserSection";
import Form from "./form/Form";

interface HirePacketPropsType {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function HirePacket({ checked, setChecked }: HirePacketPropsType) {
  return (
    <div className="flex w-full items-center justify-start border-b border-t border-gray-18 bg-gray-14 px-4 py-4">
      <div className="flex flex-col items-start justify-center gap-[1rem]">
        <div className="flex items-start justify-center gap-[1rem]">
          <BiSolidCommentDetail className="mt-1 text-3xl text-color-primary-8" />
          <div className="flex flex-col items-start justify-center gap-3">
            <h1 className="text-lg font-semibold text-gray-29">
              Make everyone's life a little bit easier and send a new hire
              packet.
            </h1>
            <h1 className="font-light text-gray-15">
              Your new employee will be able to enter their own personal
              information, sign paperwork, see their team, and more.
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 bg-gray-14 pb-2 ">
          <Checkbox
            checked={checked}
            onChange={(e: any) => {
              setChecked(e.target.checked);
            }}
            color="success"
          />
          <h1 className="text-gray- font-medium text-gray-29">
            Send this new employee a new hire packet
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HirePacket;
