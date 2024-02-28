import React from "react";
import { Footer } from "./_ui/Footer";
import NotFoundPage from "/public/NotFound/NotFound.png";
import NotFoundPanda from "/public/NotFound/NotFoundPanda.png";
import Image from "next/image";
import { Button } from "./_ui/Button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start">
      <div className="mt-[2rem] flex h-full w-11/12 flex-col items-center justify-start gap-[5rem]">
        <div className="flex w-full items-center justify-start gap-[1.2rem] border-b border-gray-18 pb-4">
          <div className="flex items-end justify-center gap-[1.2rem]">
            <Image
              className="h-[3.5rem] w-[3.5rem]"
              alt="not found"
              src={NotFoundPage}
            />
            <p className="text-4xl font-bold text-color-primary-8 ">
              Page Not Found
            </p>
            <p className="font-base text-lg text-gray-15">(404 Error)</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[1.6rem]">
          <Image alt="not found" src={NotFoundPanda} className="" />
          <p className="text-4xl font-bold text-color-primary-8 ">
            Wandered a bit too far, have we?
          </p>
          <p className="font-base text-lg text-gray-15">
            Let's find another way around.
          </p>
          <Link
            className="text-bold rounded bg-color-primary-8 p-2 px-5 text-white duration-300 ease-in-out hover:!bg-color-primary-3 "
            href="/home"
          >
            Go Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
