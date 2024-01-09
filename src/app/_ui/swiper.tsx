// import Swiper core and required modules
"use client";
import React, { FormEventHandler } from "react";
import { Pagination, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { NavigationOptions, SwiperOptions } from "swiper/types";
export default function CustomSwiper(props: {
  slides: any;
  initialSlide?: number;
  slidesPerView?: number;
  centeredSlides?: boolean;
  loop?: boolean;
  navigation?: boolean | NavigationOptions | undefined;
  pagination?: boolean;
  allowTouchMove?: boolean;
  onSlideChange?: () => void;
  breakpoints?: {
    [width: number]: SwiperOptions;
    [ratio: string]: SwiperOptions;
  };
  setActiveIndex?: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Swiper
      // install Swiper modules
      modules={[Virtual, Pagination, Navigation]}
      spaceBetween={25}
      slidesPerView={props.slidesPerView ?? 1}
      centeredSlides={props.centeredSlides}
      initialSlide={props.initialSlide ?? 0} //virtual
      loop={props.loop}
      slidesPerGroupSkip={3}
      navigation={props.navigation}
      pagination={props.pagination ? { clickable: true } : false}
      onSwiper={(swiper) => {
        swiper.updateSize();
        swiper.update();
      }}
      onSlideChange={props.onSlideChange ?? undefined}
      onRealIndexChange={(element) =>
        props.setActiveIndex ? props.setActiveIndex(element.activeIndex) : null
      }
      breakpoints={props.breakpoints}
      allowTouchMove={props.allowTouchMove}
      //centeredSlidesBounds={true}
      observer={true}
    >
      {props.slides.map((slide: any, index: number) => (
        <SwiperSlide
          key={"slide" + index}
          className="h-fit w-fit max-w-[20rem]"
        >
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
