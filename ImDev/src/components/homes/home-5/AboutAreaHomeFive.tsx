
import React from 'react';

import about_img from "@/assets/img/home-05/about/about-img.jpg";
import Image from 'next/image';


const AboutAreaHomeFive = () => {
  return (
    <>
      <div className="tp-about-5-area coffe-bg pt-140 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-about-5-title-wrap text-xl-end text-center">
                <div className="tp-about-5-title-box text-center p-relative">
                  <span className="tp-about-5-subtitle tp-split-text tp-split-in-right">
                    GET TO <br /> X <br /> KNOW ME</span>
                    <h2 className="tp-section-title-5 fs-140 tp-split-text tp-split-in-right">
                      Fashion<span className="d-none d-md-inline-block">
                        <Image src={about_img} alt="image-here" /></span>
                      <br />for passion and <em>life style</em>
                    </h2>
                    <p>Working as a creative & outsource your fashion design project & get it quickly done and delivered remotely online.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      );
};

      export default AboutAreaHomeFive;