import React from "react";
import default_company_logo from "/public/cropped (2).jpg";
import Skeleton from "./_ui/Skeleton";
import Image from "next/image";
import { IoIosMail } from "react-icons/io";
import { Input } from "./_ui/Input";
import ToggleBackBtn from "./ToggleBackBtn";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { SubmitBtn } from "../../_ui/SubmitBtn";
export function ResetPasswordPage() {
  return (
    <Skeleton>
      <main className="flex w-full max-w-[37.5rem] flex-col items-center justify-center gap-8 bg-white pb-12 pt-8">
        <Image src={default_company_logo} alt="" priority />
        <ResetPasswordForm>
          <h1 className="mb-0 mt-2 text-center text-[1.1rem] font-normal leading-8 text-gray-20">
            Enter your email address and we'll send you a link to reset your
            password.
          </h1>
          <hr className="h-[2px] w-full" />
          <Input name="email" placeholder="Email Address" type="email">
            <IoIosMail className="h-7 w-7 font-bold text-gray-400 group-focus-within:text-color-primary-5" />
          </Input>
          <div className="-mt-2 mb-2 flex w-full flex-row items-center gap-3 font-normal text-gray-21 no-underline">
            <SubmitBtn className="!max-w-[8rem]">send email</SubmitBtn>
            <ToggleBackBtn />
          </div>
        </ResetPasswordForm>
      </main>
    </Skeleton>
  );
}
