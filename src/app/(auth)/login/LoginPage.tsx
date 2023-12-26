import React from "react";
import default_company_logo from "/public/cropped (2).jpg";
import Skeleton from "./_ui/Skeleton";
import Image from "next/image";
import { SubmitBtn } from "../signup/ui/SubmitBtn";
import { IoIosMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import login from "@/actions/auth/login";
import { ShowPasswordToggleProvider } from "./_context/showPasswordToggle";
import { Input } from "./_ui/Input";
import ShowPasswordBtn from "./showPasswordBtn";
import ForgotPasswordBtn from "./ForgotPasswordBtn";

export function LoginPage() {
  return (
    <Skeleton>
      <main className="flex w-full min-w-[37.5rem] flex-col items-center justify-center gap-8 bg-white pb-16 pt-12">
        <Image src={default_company_logo} alt="" />
        <form
          className="flex h-full w-full flex-col items-start justify-between gap-4 px-28"
          action={login}
        >
          <ShowPasswordToggleProvider>
            <Input name="email" placeholder="Email" type="email">
              <IoIosMail className="h-7 w-7 font-bold text-gray-400 group-focus-within:text-color-green-5" />
            </Input>
            <Input name="password" type="password" placeholder="Password">
              <IoKey className="h-7 w-7 font-bold text-gray-400 group-focus-within:text-color-green-5" />
            </Input>
            <div className="-mt-2 mb-2 flex w-full flex-row justify-between gap-2 font-normal text-gray-21 no-underline">
              <ForgotPasswordBtn />
              <ShowPasswordBtn />
            </div>
          </ShowPasswordToggleProvider>
          <SubmitBtn className=" !h-11 !rounded-md !bg-fabric-700 !px-[auto] hover:!bg-fabric-600 ">
            continue
          </SubmitBtn>
        </form>
      </main>
    </Skeleton>
  );
}
