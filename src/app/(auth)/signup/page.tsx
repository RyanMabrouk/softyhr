import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "/public/logo.svg";
import background_img from "/public/signup/signup_bg_img.png";
import { Form } from "./Form";
import getSession from "@/api/getSession";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await getSession();
  if (session) redirect("/");
  return (
    <div className=" relative flex h-screen w-screen flex-col overflow-x-hidden scroll-smooth">
      <nav className="sticky top-0 z-50 flex h-[5rem] w-full flex-row items-center justify-between bg-white px-8 py-4">
        <Link href="/">
          <Image
            src={logo}
            alt=""
            className="h-44 w-44"
            width={180}
            height={180}
            priority
          />
        </Link>
        <Link
          href="login"
          className="h-fit w-fit space-x-2 rounded-2xl border-2 border-solid border-color1-400 px-6 py-2 text-center  font-bold leading-[15px] tracking-[1px] text-color-primary-4 transition-all duration-150 ease-linear  hover:border-color-primary-4 hover:bg-color-primary-4 hover:text-white"
        >
          Log In
        </Link>
      </nav>
      <main className="relative h-full w-full">
        <div className="absolute inset-0 z-10 flex h-full w-full items-start justify-center gap-3 pt-[5vh] backdrop-blur-[1px] backdrop-brightness-[0.5] transition-all duration-300 ease-linear ">
          <Form />
        </div>
        <Image
          src={background_img}
          alt=""
          className=" h-full w-full object-cover object-[top_center] blur-[2px] backdrop-filter"
          placeholder="blur"
          quality={100}
          priority
          //fill
          sizes="100vw"
        />
      </main>
      <footer className="z-10 h-[10rem] w-full bg-gray-11 py-5 text-center text-white">
        © 2023 Softy HR LLC. All Rights Reserved. SoftyHR® is a registered
        trademark of Softylines LLC
      </footer>
    </div>
  );
}
