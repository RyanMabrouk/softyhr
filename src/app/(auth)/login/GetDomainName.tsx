import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/logo.svg";
import { Form } from "./Form";
import Skeleton from "./_ui/Skeleton";

export function GetDomainName({
  setToggleDisplay,
}: {
  setToggleDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Skeleton>
      <main className="flex w-full min-w-[37.5rem] flex-col items-center justify-center gap-6 bg-white pb-16 pt-12">
        <Image
          src={logo}
          alt=""
          className="h-12 w-60"
          width={260}
          height={130}
          priority
        />
        <div className="text-gray-20 mx-auto flex flex-col items-center gap-2">
          <div className=" text-gray-20 mx-0 my-[11px] text-xl font-medium leading-[26px]">
            Enter your BambooHR Domain to login.
          </div>
          <Form>
            <button
              onClick={() => setToggleDisplay((old) => !old)}
              type="button"
              className="text-gray-21 font-normal hover:text-color-green hover:underline"
            >
              What's my domain?
            </button>
          </Form>
        </div>
      </main>
    </Skeleton>
  );
}
