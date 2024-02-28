"use client";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import HirePacket from "./components/HirePacket";
import Form from "./components/form/Form";
function Page() {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div className="flex h-full w-full items-start justify-center">
      <div className="w-9/12">
        <div className="mt-14 flex h-full w-full flex-col items-start justify-center gap-[2rem]">
          <div className="flex w-full items-center justify-between gap-[4rem]">
            <div className="flex items-center justify-start gap-3">
              <FaUserCircle className="text-5xl text-color-primary-8" />
              <h1 className="text-2xl font-semibold text-color-primary-8">
                New employee
              </h1>
            </div>
            <p className="font-medium cursor-pointer text-gray-15 hover:text-color-primary-8 hover:underline">
              Customize Add Employee Form
            </p>
          </div>
          <div className="w-full">
            <HirePacket checked={checked} setChecked={setChecked} />
          </div>
          <div>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
