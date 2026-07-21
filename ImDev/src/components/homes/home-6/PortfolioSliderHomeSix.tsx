
'use client';

import Link from 'next/link';
import WebGL from '@/assets/plugins/webgl';
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Mousewheel } from 'swiper/modules';
import { addEvents, slideNextTransitionStart, slidePrevTransitionStart } from '@/utils/webgl-slider';


interface DataType {
  id: number;
  title: string;
  brand: string;
}

const slider_data:DataType[] = [
  {
    id: 1,
    title: 'Silkvision',
    brand: 'Branding',
  },
  {
    id: 2,
    title: 'Top Paddock',
    brand: 'Branding',
  },
  {
    id: 3,
    title: 'Romain Avalle',
    brand: 'Branding',
  },
  {
    id: 4,
    title: 'Band Some',
    brand: 'Branding',
  },

]


const PortfolioSliderHomeSix = () => {

  const webGLContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (webGLContainerRef.current) {
      var vertex = 'varying vec2 vUv; void main() {  vUv = uv;  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );	}';
	   	var fragment = `
			varying vec2 vUv;
		
			uniform sampler2D currentImage;
			uniform sampler2D nextImage;
			uniform sampler2D disp;
			uniform float dispFactor;
			uniform float effectFactor;
			uniform vec4 resolution;
		
			void main() {
		
				vec2 uv = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
		
				vec4 disp = texture2D(disp, uv);
				vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
				vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
				vec4 _currentImage = texture2D(currentImage, distortedPosition);
				vec4 _nextImage = texture2D(nextImage, distortedPosition2);
				vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);
		
				gl_FragColor = finalTexture; }
		
			`;

      const webGL = new WebGL( {
        vertex: vertex,
			  fragment: fragment,
      });

      // Instantiate WebGL
      addEvents(webGL)
      // Append renderer element to container
      webGLContainerRef.current.appendChild(webGL.renderer.domElement);

      // Clean up function
      return () => {
        // Stop WebGL rendering
        webGL.stop();
      };
    }
  }, []);

  return (
    <>

        <div id="showcase-slider-main" className="showcase-slider-main">
          <div className="port-showcase-slider-spaces p-relative">
            <div className="port-showcase-slider-wrap tp-slider-parallax fix" id="showcase-slider-holder" data-pattern-img="/assets/img/webgl/1.jpg">
              <div className="swiper-container parallax-slider-active p-relative" id="showcase-slider">
                <Swiper
                  direction="horizontal"
                  slidesPerView="auto"
                  touchStartPreventDefault={false}
                  speed={1000}
                  effect="fade"
                  loop={true}                 
                  mousewheel={true}
                  simulateTouch={true}
                  navigation={{
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev',
                  }}
                  pagination={{
                    el: '.tp-slider-dot',
                    clickable: true,
                  }}
                  modules={[Navigation, Pagination, Autoplay, Mousewheel]}
                  onSlidePrevTransitionStart={slidePrevTransitionStart}
                  onSlideNextTransitionStart={slideNextTransitionStart}
                  id="trigger-slides"
                >

                  {slider_data.map((item, i) => (
                    <SwiperSlide key={i}>
                      <div className={`slide-wrap ${i === 0 ? 'active' : ''}`} data-slide={i}></div>
                      <div className="container">
                        <div className="row">
                          <div className="col-xl-12">
                            <div className="port-showcase-slider-item">
                              <div className="port-showcase-slider-content text-center">
                                <div className="port-showcase-slider-title">
                                  <div>
                                    <span><Link href="/portfolio-details-3">{item.title}</Link></span>
                                  </div>
                                </div>
                                <div className="port-showcase-slider-subtitle">
                                  <div>
                                    <span>{item.brand}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                  <div className="port-showcase-slider-link d-none d-sm-flex">
                    <Link href="/portfolio-details-3">
                      <span>
                        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 5L5 0L0 5" fill="white" />
                          <path d="M10 7L5 12L0 7" fill="white" />
                        </svg>
                      </span>
                      <span>All Projects</span>
                    </Link>
                  </div>

                  <div className="tp-slider-dot"></div>
                  <div className="port-showcase-slider-social d-flex align-items-center d-none d-sm-flex">
                    <a className="tp-hover-btn-item tp-hover-btn tp-magnetic-item not-hide-cursor" href="#">Fb</a>
                    <a className="tp-hover-btn-item tp-hover-btn tp-magnetic-item not-hide-cursor" href="#">In</a>
                    <a className="tp-hover-btn-item tp-hover-btn tp-magnetic-item not-hide-cursor" href="#">Be</a>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>



          <div id="canvas-slider" className="canvas-slider" ref={webGLContainerRef}>
            <div className="slider-img" data-slide="0">
              <img className="slide-img" src="assets/img/home-60/slider/slider-1.jpg" alt="image-here" />
            </div>
            <div className="slider-img" data-slide="1">
              <img className="slide-img" src="assets/img/home-60/slider/slider-2.jpg" alt="image-here" />
            </div>
            <div className="slider-img" data-slide="2">
              <img className="slide-img" src="assets/img/home-60/slider/slider-3.jpg" alt="image-here" />
            </div>
            <div className="slider-img" data-slide="3">
              <img className="slide-img" src="assets/img/home-60/slider/slider-4.jpg" alt="image-here" />
            </div>
          </div>
        </div>

    </>
  );
};

export default PortfolioSliderHomeSix;