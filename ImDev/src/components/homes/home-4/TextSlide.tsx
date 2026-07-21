"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import slider_img from "@/assets/img/new-img/text-slider/shape-1.png";

const text_data = [
  `Brand promotion`,
  `Commercial`,
  `Family Shoots`,
  `Event`,
  `Fashion`,
  `Interior photography`,
];

// slider setting 
const slider_setting = {
  speed: 4000,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: true,
  initialSlide: 1,
  arrows: false,
  buttons: false,
  pauseOnFocus: false,
  pauseOnHover: true,
};


const TextSlide = () => {
  return (
    <>
      <div className="tp-text-slider-4-area black-bg-6 fix">
        <div className="tp-text-slider-4-wrap">
          <Slider
            {...slider_setting}
            className="swiper-container tp-text-slider-4-active"
          >
            {text_data.map((t, i) => (
              <div
                key={i}
                className="tp-text-slider-4-item d-flex align-items-center"
              >
                <span>{t}</span>
                <Image src={slider_img} alt="image-here" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default TextSlide;
