
import React from 'react';
import Image from 'next/image';

import service_img_1 from  "@/assets/img/new-img/about/ab-4-1-shape.png";
import service_img_2 from  "@/assets/img/new-img/about/ab-4-1.jpg";
import service_img_3 from  "@/assets/img/new-img/about/ab-4-2.jpg";

interface DataType {
  subtitle: string;
  title: string;
  description: string;
  info: string;
  success_data: {
      count: number;
      text: string;
  }[];
}

const service_content: DataType = {
  subtitle: 'ABOUT ME',
  title: 'EMMA MITCHELL',
  description: `I have expanded in comparison for faced here with an open form in a state of phase transition.`,
  info: `Photography was always my passion and my dream job. It's even difficult for me to call it a job, as I consider my profession as a hobby of my life. New people, catching their mood being part of the happiest momentы of their life. Kale chips subway tile before direct trade cliched hammock kinfolk deep photography.`,
  success_data: [
    {
      count: 17,
      text: 'Years',
    },
    {
      count: 100,
      text: 'People',
    },
  ]

}
const {
  subtitle,
  title,
  description,
  info,
  success_data
} = service_content

const ServiceAreaHomeFour = () => {


  return (
    <>
      <div className="tp-about-4-area black-bg-6 pt-150 pb-200">
        <div className="container container-1320">
          <div className="tp-about-4-border">
            <div className="row align-items-end">
              <div className="col-xl-2">
                <div className="tp-about-4-subtitle-box">
                  <span className="tp-section-subtitle-5"><i>{subtitle}</i></span>
                </div>
              </div>
              <div className="col-xl-7 col-lg-8 col-md-8">
                <div className="tp-about-4-title-box">
                  <h2 className="tp-section-title-5 mb-20 tp_text_invert">{title}</h2>
                  <p className="tp_text_invert">{description}</p>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-4 d-none d-md-block">
                <div className="tp-about-4-shape text-end">
                  <Image src={service_img_1} alt="image-here" />
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-7 col-md-6">
              <div className="tp-about-4-thumb-box">
                <div className="row align-items-center">
                  <div className="col-xl-4 col-lg-4 col-md-4">
                    <div className="tp-about-4-thumb">
                      <Image src={service_img_2} alt="image-here" data-speed="0.9" />
                    </div>
                  </div>
                  <div className="col-xl-8 col-md-8 col-md-8">
                    <div className="tp-about-4-thumb text-end">
                      <Image src={service_img_3} alt="image-here" data-speed="1.1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6">
              <div className="tp-about-4-content-wrap">
                <div className="tp-about-4-content">
                  <p>{info}</p>
                </div>
                <div className="tp-about-4-funfact d-flex justify-content-between align-items-center p-relative">
                  <span className="border-line"></span>
                  {success_data.map((item, i) => (
                    <span key={i}>
                      <i>{item.text}</i>
                      <em>{item.count}<span>+</span></em>
                    </span>
                  ))} 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceAreaHomeFour;