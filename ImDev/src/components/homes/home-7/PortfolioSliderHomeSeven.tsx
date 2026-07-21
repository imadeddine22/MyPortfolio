
'use client';
 
import Link from 'next/link';
import React, { useContext } from 'react';
import Image, { StaticImageData } from 'next/image';

import portfolio_img_1 from '@/assets/img/home-07/slider-1-2.jpg';
import portfolio_img_2 from '@/assets/img/home-07/slider-1-3.jpg';
import portfolio_img_3 from '@/assets/img/home-07/slider-1-4.jpg';
import portfolio_img_4 from '@/assets/img/home-07/slider-1-5.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Mousewheel } from 'swiper/modules';
import { AppContext } from '@/context/app-context';
 

interface DataType {
  id: number;
  img: StaticImageData;
  title: string;
  subtitle: string;
}
const portfolio_data: DataType[] = [
  {
    id: 1,
    img: portfolio_img_1,
    title: 'Top Paddock',
    subtitle: 'Branding',
  },
  {
    id: 2,
    img: portfolio_img_2,
    title: 'Album cover',
    subtitle: 'Branding',
  },
  {
    id: 3,
    img: portfolio_img_3,
    title: 'The Smiths',
    subtitle: 'Branding',
  },
  {
    id: 4,
    img: portfolio_img_4,
    title: 'Siyantika  Glory',
    subtitle: 'Branding',
  },
]

const PortfolioSliderHomeSeven = () => {

  const {handleMouseEnter,handleMouseLeave} = useContext(AppContext);


  return (
    <>
      <div className="portfolio-slider-2-area black-bg-5 fix">
        <div className="portfolio-slider-2-wrap p-relative">
          <div className="portfolio-slider-2-wrap-box">
            <Swiper
              spaceBetween={80}
              slidesPerView={3}
              centeredSlides={true}
              loop={true}
              mousewheel={true}
              modules={[Scrollbar, Mousewheel]}
              keyboard={{
                enabled: true,
              }}
              scrollbar={{
                el: ".tp-scrollbar",
              }}
              breakpoints={{
                '1400': {
                  slidesPerView: 2,
                },
                '1200': {
                  slidesPerView: 2,
                },
                '992': {
                  slidesPerView: 1,
                  centeredSlides: false,
                },
                '768': {
                  slidesPerView: 1,
                },
                '576': {
                  slidesPerView: 1,
                },
                '0': {
                  slidesPerView: 1,
                },

              }}
              className="swiper-container portfolio-slider-2-active">
              {portfolio_data.map((item, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <div className="portfolio-slider-2-item p-relative not-hide-cursor"
                    data-cursor="View<br>Demo" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

                    <Link className="cursor-hide" href="/portfolio-details-2">
                      <div className="portfolio-slider-2-thumb">
                        <Image src={item.img} alt="image-here" />
                      </div>
                      <div className="portfolio-slider-2-content text-center">
                        <div className="portfolio-slider-2-title">
                          <div>
                            <span>{item.title}</span>
                          </div>
                        </div>
                        <div className="portfolio-slider-2-subtitle">
                          <div>
                            <span>{item.subtitle}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="tp-scrollbar"></div>
          <div className="port-showcase-slider-link d-none d-sm-block">
            <Link href="/portfolio-details-2">
              <span>
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 5L5 0L0 5" fill="white" />
                  <path d="M10 7L5 12L0 7" fill="white" />
                </svg>
              </span>
              <span>All Projects</span>
            </Link>
          </div>
          <div className="port-showcase-slider-social d-flex align-items-center d-none d-sm-flex">
            <a className="tp-hover-btn-item tp-hover-btn tp-magnetic-item not-hide-cursor" href="#">Fb</a>
            <a className="tp-hover-btn-item tp-hover-btn tp-magnetic-item not-hide-cursor" href="#">In</a>
            <a className="tp-hover-btn-item tp-hover-btn tp-magnetic-item not-hide-cursor" href="#">Be</a>
          </div>
        </div>
      </div>

    </>
  );
};

export default PortfolioSliderHomeSeven;