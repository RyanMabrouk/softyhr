import getSession from "@/actions/getSession";
import { redirect } from "next/navigation";
import React from "react";
import { FlipEffectContainer } from "./FlipEffectContainer";
import getCurrentorg from "@/api/getCurrentOrg";
import default_company_logo from "/public/cropped (2).jpg";
import Skeleton from "./_ui/Skeleton";
import Image from "next/image";
import { SubmitBtn } from "../signup/SubmitBtn";
import { IoIosMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import Link from "next/link";
import login from "@/actions/auth/login";
import { ShowPasswordToggleProvider } from "./_context/showPasswordToggle";

export default async function Page() {
  const session = await getSession();
  if (session) redirect("/");
  const org = await getCurrentorg();
  return (
    <div className="relative box-border flex  h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-sm bg-[linear-gradient(-180deg,#eee,#fbfbfb)] pb-[3px] text-left shadow-[0_8px_14px_3px_#000]">
      {org ? <LoginPage /> : <FlipEffectContainer />}
    </div>
  );
}
function LoginPage() {
  return (
    <Skeleton>
      <main className="flex w-full min-w-[37.5rem] flex-col items-center justify-center gap-8 bg-white pb-16 pt-12">
        <Image src={default_company_logo} alt="" />
        <form
          className="flex h-full w-full flex-col items-start justify-between gap-4 px-28"
          action={login}
        >
          <Input name="email" placeholder="Email" type="email">
            <IoIosMail className="h-7 w-7 font-bold text-gray-400 group-focus-within:text-color-green-5" />
          </Input>
          <ShowPasswordToggleProvider>
            <Input name="password" type="password" placeholder="Password">
              <IoKey className="h-7 w-7 font-bold text-gray-400 group-focus-within:text-color-green-5" />
            </Input>
            <div className="text-gray-21 -mt-2 mb-2 flex w-full flex-row justify-between gap-2 font-normal no-underline">
              <Link
                className="cursor-pointer hover:text-color-green hover:underline"
                href="#"
              >
                Forgot Password?
              </Link>
              <button
                type="button"
                className="cursor-pointer hover:text-color-green hover:underline"
              >
                Show Password
              </button>
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

function Input({
  className,
  type,
  name,
  placeholder = "",
  children,
}: {
  className?: string;
  type: string;
  name: string;
  placeholder?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="group relative flex h-12 w-full flex-row items-center justify-between border  border-gray-300 bg-[#f4f4f4] transition-all duration-200 ease-in-out focus-within:shadow-[0px_0px_4px_1px_#84bf41] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500">
      <span className="flex h-full w-12 items-center justify-center px-1">
        {children}
      </span>
      <input
        data-placeholder-trigger="keydown"
        type={type}
        name={name}
        className={`h-full w-full px-2 pb-1 text-lg placeholder-gray-400 placeholder:text-lg placeholder:font-light  focus:outline-none ${className}`}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
