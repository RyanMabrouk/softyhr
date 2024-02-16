"use client";
import React from "react";
import companyLogo from "/public/cropped (2).jpg";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CAREER_PATH } from "@/constants/LayoutRoute";
import { Navigation } from "swiper/modules";
import ApplySectionSkeleton from "./components/ApplySection/ApplySectionSkeleton";
import DescriptionSkeleton from "./components/Description/DescriptionSkeleton";
import Description from "./components/Description/Description";
import ApplySection from "./components/ApplySection/ApplySection";
import useHiring from "@/hooks/Hiring/useHiring";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import AppliymentForm from "./components/AppliymentForm/AppliymentForm";
import useHiringGuest from "@/hooks/Hiring/useHiringGuest";

function Page({ params: { career_id } }: { params: { career_id: string } }) {
  const {
    Hiring: { data, isPending, error },
  } = useHiringGuest(
    { id: career_id, "Job Status": "Open" }
  );

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
          <div className="flex w-full flex-col items-start justify-center gap-[0.5rem]">
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
              <div className="w-full py-4">
                <div className="flex flex-col items-start justify-center gap-[1rem] border-b border-gray-32 pb-8">
                  <h1 className="text-3xl text-color-primary-8">
                    {data[0]?.job_information?.["Posting Title"]}
                  </h1>
                  <h1 className="text-sm text-gray-15">
                    {data[0]?.job_information?.["Departement"] +
                      " · " +
                     ( data[0]?.job_information?.["Job Location"] || "Remote")}
                  </h1>
                </div>
                <Swiper
                  allowTouchMove={false}
                  style={{ width: "100% !important" }}
                  navigation={{
                    prevEl: ".btn_swiper_arrow_left",
                    nextEl: ".btn_swiper_arrow_right",
                  }}
                  modules={[Navigation]}
                  className="w-full"
                >
                  <SwiperSlide>
                    <Description job={data[0]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <AppliymentForm
                      SuccessMessage="Application submitted successfuly !"
                      SubmittingButtonText="Submitting Application..."
                      ButtonText="Submit Application"
                      job={data[0]}
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
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
