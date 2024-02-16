import React from "react";
import Image from "next/image";
import logo from "/public/logo.svg";
import whats_my_domain from "/public/login/whats-my-domain.png";
import Skeleton from "../_ui/Skeleton";
import { ToggleBackBtn } from "./ToggleBackBtn";

export function WhereIsMyDomain() {
  return (
    <Skeleton>
      <main className="flex w-full min-w-[37.5rem] flex-col items-center justify-center gap-6 bg-white px-16 pb-16 pt-12 text-center">
        <Image
          src={logo}
          alt=""
          className="h-12 w-60"
          width={260}
          height={130}
          priority
        />
        <p className="mx-0 my-[11px] text-2xl leading-[26px] text-gray-20">
          What's my SoftyHR domain?
        </p>
        <Image src={whats_my_domain} alt="" />
        <p className="prose mx-0 mb-5 mt-[15px] text-[1rem] leading-[22px] text-gray-20">
          Take a look at the address bar when you are logged in to SoftyHR (or
          ask a colleague, since you are not logged in). The text just before
          .softyhr.com is your domain.
        </p>
        <ToggleBackBtn />
      </main>
    </Skeleton>
  );
}
