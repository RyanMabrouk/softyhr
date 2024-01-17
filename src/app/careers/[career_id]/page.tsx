"use client";
import React from "react";
import companyLogo from "/public/cropped (2).jpg";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CAREER_PATH } from "@/constants/LayoutRoute";
import useData from "@/hooks/useData";
import ApplySectionSkeleton from "./components/ApplySection/ApplySectionSkeleton";
import DescriptionSkeleton from "./components/Description/DescriptionSkeleton";
import Description from "./components/Description/Description";
import ApplySection from "./components/ApplySection/ApplySection";

function Page({ params: { career_id } }: { params: { career_id: string } }) {
  const {
    Hiring: { data, isPending },
  } = useData();
  return (
    <div className=" flex h-screen w-[99dvw] items-start justify-center gap-[2rem] py-8 pt-8">
      <div className="flex w-2/4 flex-col items-center justify-center gap-[2rem] py-4">
        <div className="self-start">
          <Image
            className="cursor-pointer self-start"
            alt="company logo"
            src={companyLogo}
          />
        </div>
        <div className="shadow-popup relative  flex w-full flex-col items-start justify-center bg-white p-10">
          <div className="mb-6 flex w-full flex-col items-start justify-center gap-[0.5rem]">
            <Link
              href={CAREER_PATH}
              className="flex items-center justify-center gap-[0.5rem] text-sm text-gray-15"
            >
              <FaArrowLeftLong fontSize="0.7rem" />
              <h1 className="hover:underline">Job Opening</h1>
            </Link>
            {isPending ? (
              <DescriptionSkeleton />
            ) : (
              <Description job={data[0]} />
            )}
          </div>
          <div className="absolute bottom-0 right-0 h-[0.2rem] w-full bg-gradient-to-r from-color-primary-1 to-color-primary-3" />
        </div>
      </div>
      {isPending ? <ApplySectionSkeleton /> : <ApplySection job={data[0]} />}
    </div>
  );
}

export default Page;
