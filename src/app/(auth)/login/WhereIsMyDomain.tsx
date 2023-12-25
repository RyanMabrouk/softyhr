import React from "react";
import Image from "next/image";
import logo from "/public/logo.svg";
import { Button } from "../signup/ui/Button";
import whats_my_domain from "/public/login/whats-my-domain.png";
import Skeleton from "./_ui/Skeleton";

export function WhereIsMyDomain({
  setToggleDisplay,
}: {
  setToggleDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
        <p className="text-gray-20 mx-0 my-[11px] text-2xl leading-[26px]">
          What's my SoftyHR domain?
        </p>
        <Image src={whats_my_domain} alt="" />
        <p className="text-gray-20 prose mx-0 mb-5 mt-[15px] text-[1rem] leading-[22px]">
          Take a look at the address bar when you are logged in to SoftyHR (or
          ask a colleague, since you are not logged in). The text just before
          .softyhr.com is your domain.
        </p>
        <Button
          className=" !h-11 !max-w-[8rem] !rounded-md !bg-fabric-700 !px-[auto] hover:!bg-fabric-600 "
          onClick={() => setToggleDisplay((old) => !old)}
        >
          Great, thanks!
        </Button>
      </main>
    </Skeleton>
  );
}
