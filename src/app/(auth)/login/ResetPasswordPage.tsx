import React from "react";
import default_company_logo from "/public/cropped (2).jpg";
import Skeleton from "./_ui/Skeleton";
import Image from "next/image";
import { SubmitBtn } from "../signup/ui/SubmitBtn";
import { IoIosMail } from "react-icons/io";
import { Input } from "./_ui/Input";
import ToggleBackBtn from "./ToggleBackBtn";
import resetPassword from "@/actions/auth/resetPassword";
export function ResetPasswordPage() {
  return (
    <Skeleton>
      <main className="flex w-full max-w-[37.5rem] flex-col items-center justify-center gap-8 bg-white pb-12 pt-8">
        <Image src={default_company_logo} alt="" />
        <form
          className="flex h-full w-full flex-col items-start justify-between gap-6 px-28"
          action={resetPassword}
        >
          <h1 className="mb-0 mt-2 text-center text-[1.1rem] font-normal leading-8 text-gray-20">
            Enter your email address and we'll send you a link to reset your
            password.
          </h1>
          <hr className="h-[2px] w-full" />
          <Input name="email" placeholder="Email Address" type="email">
            <IoIosMail className="h-7 w-7 font-bold text-gray-400 group-focus-within:text-color-green-5" />
          </Input>
          <div className="-mt-2 mb-2 flex w-full flex-row items-center gap-3 font-normal text-gray-21 no-underline">
            <SubmitBtn className="!h-11 !max-w-[8rem] !rounded-md !bg-fabric-700 !px-[auto] hover:!bg-fabric-600 ">
              send email
            </SubmitBtn>
            <ToggleBackBtn />
          </div>
        </form>
      </main>
    </Skeleton>
  );
}
