
'use client'

import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick'; 
import start_icon from '@/assets/img/new-img/text-slider/shape-2.png';


const text_slide_data = [
  `Brand promotion`,
  `Commercial`,
  `Family Shoots`,
  `Event`,
  `Fashion`,
  `Interior photography`,

  `Brand promotion`,
  `Commercial`,
  `Family Shoots`,
  `Event`,
  `Fashion`,
  `Interior photography`,
]


declare global {
  interface Window {
    Swiper: any;
  }
}


// slider setting 
const slider_setting = {
  speed: 20000,
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



const TextSlideHomeFive = () => {


  return (
    <>
      <div className="tp-text-slider-4-area tp-text-slider-5-style black-bg-5 fix">
        <div className="tp-text-slider-4-wrap"> 
          <Slider
            {...slider_setting}
            className="swiper-container tp-text-slider-4-active">
            {text_slide_data.map((item, i) => (
              <div key={i} className="tp-text-slider-4-item d-flex align-items-center">
                <span>{item}</span>
                <Image src={start_icon} alt="image-here" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default TextSlideHomeFive;