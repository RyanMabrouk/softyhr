import React from "react";
import Image from "next/image";
import logo from "/public/logo.svg";
import { Form } from "./Form";
import Skeleton from "../_ui/Skeleton";
import { WhatsMyDomainBtn } from "./WhatsMyDomainBtn";

export function GetDomainName() {
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
        <div className="mx-auto flex flex-col items-center gap-2 text-gray-20">
          <div className=" mx-0 my-[11px] text-xl font-medium leading-[26px] text-gray-20">
            Enter your BambooHR Domain to login.
          </div>
          <Form>
            <WhatsMyDomainBtn />
          </Form>
        </div>
      </main>
    </Skeleton>
  );
}
