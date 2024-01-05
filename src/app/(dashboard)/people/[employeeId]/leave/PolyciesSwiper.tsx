"use client";
import React, { useState } from "react";
import { FaBusinessTime } from "react-icons/fa";
import { MdOutlineSick } from "react-icons/md";
import { LuPalmtree } from "react-icons/lu";
import CustomSwiper from "@/app/_ui/swiper";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Policy } from "./Policy";

export function PolyciesSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const plicies = [
    {
      icon: <LuPalmtree className="h-9 w-9 text-fabric-700" />,
      hours_scheduled: 0,
      hours_available: 0,
      name: "Vacation Policy",
      title: "Vacation",
    },
    {
      icon: <MdOutlineSick className="h-9 w-9 text-fabric-700" />,
      hours_scheduled: 0,
      hours_available: 0,
      name: "Sick Leave Policy",
      title: "Sick",
    },
    {
      icon: <FaBusinessTime className="h-9 w-9 text-fabric-700" />,
      hours_scheduled: 0,
      hours_available: 0,
      name: "Personal Leave Policy",
      title: "Personal",
    },
    {
      icon: <MdOutlineSick className="h-9 w-9 text-fabric-700" />,
      hours_scheduled: 0,
      hours_available: 0,
      name: "Sick Leave Policy",
      title: "Sick",
    },
    {
      icon: <FaBusinessTime className="h-9 w-9 text-fabric-700" />,
      hours_scheduled: 0,
      hours_available: 0,
      name: "Personal Leave Policy",
      title: "Personal",
    },
  ];
  return (
    <section className="relative mx-auto block w-full max-w-[57.5vw] px-12 ">
      <div className="btn_swiper_arrow_left absolute -left-5 top-[40%] cursor-pointer ">
        <FaArrowLeft
          className="border-gray-26 h-10 w-10 border p-2 text-gray-25"
          hidden={activeIndex === 0}
        />
      </div>
      <div
        className="btn_swiper_arrow_right absolute -right-5 top-[40%] cursor-pointer"
        hidden={activeIndex === plicies?.length - 3}
      >
        <FaArrowRight className="border-gray-26 h-10 w-10 border p-2 text-gray-25" />
      </div>
      <CustomSwiper
        setActiveIndex={setActiveIndex}
        navigation={{
          prevEl: ".btn_swiper_arrow_left",
          nextEl: ".btn_swiper_arrow_right",
        }}
        slidesPerView={3}
        slides={plicies?.map((policy, i) => (
          <Policy key={policy.name + i} {...policy} />
        ))}
      />
    </section>
  );
}
