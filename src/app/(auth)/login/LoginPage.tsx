import React from "react";
import default_company_logo from "/public/cropped (2).jpg";
import Skeleton from "./_ui/Skeleton";
import Image from "next/image";
import { IoIosMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import { ShowPasswordToggleProvider } from "./_context/showPasswordToggle";
import { Input } from "./_ui/Input";
import ShowPasswordBtn from "./showPasswordBtn";
import ForgotPasswordBtn from "./ForgotPasswordBtn";
import { LoginPageForm } from "./LoginPageForm";
import { SubmitBtn } from "./_ui/SubmitBtn";
export function LoginPage() {
  return (
    <Skeleton>
      <main className="flex w-full min-w-[37.5rem] flex-col items-center justify-center gap-8 bg-white pb-16 pt-12">
        <Image src={default_company_logo} alt="" priority />
        <LoginPageForm>
          <ShowPasswordToggleProvider>
            <Input name="email" placeholder="Email" type="email">
              <IoIosMail className="h-7 w-7 font-bold text-gray-400 group-focus-within:text-color-primary-5" />
            </Input>
            <Input name="password" type="password" placeholder="Password">
              <IoKey className="h-7 w-7 font-bold text-gray-400 group-focus-within:text-color-primary-5" />
            </Input>
            <div className="-mt-2 mb-2 flex w-full flex-row justify-between gap-2 font-normal text-gray-21 no-underline">
              <ForgotPasswordBtn />
              <ShowPasswordBtn />
            </div>
          </ShowPasswordToggleProvider>
          <SubmitBtn>continue</SubmitBtn>
        </LoginPageForm>
      </main>
    </Skeleton>
  );
}
