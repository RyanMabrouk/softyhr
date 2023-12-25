import Link from "next/link";
import React from "react";

export default function Skeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-w-[40rem] flex-col">
      {children}
      <hr
        style={{
          background: "linear-gradient(90deg, #c0e94f 0%, #82af13 100%)",
        }}
        className="h-[3px] w-full"
      />
      <footer className=" flex w-full flex-row justify-between  px-1 py-3">
        <div className="text-gray-21 flex flex-row gap-2 text-sm font-light no-underline">
          <Link
            href="#"
            className="cursor-pointer hover:text-color-green hover:underline"
          >
            Terms of Service
          </Link>
          <strong className="-mt-2 text-center text-lg">.</strong>
          <Link
            href="#"
            className="cursor-pointer hover:text-color-green hover:underline"
          >
            Terms of Service
          </Link>
        </div>
        <Link className="relative font-bold" href={"/"}>
          <span className="mr-2">SoftyHR</span>
          <span className="absolute right-0 top-0 text-[0.5rem]">®</span>
        </Link>
      </footer>
    </div>
  );
}