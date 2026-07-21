'use client';
import Link from 'next/link'; 
import Image from 'next/image';
import React from 'react';
import circle_img from "@/assets/img/footer/footer-circle-img.png";
import service_shape_1 from "@/assets/img/portfolio/shape-1.png";
import service_shape_2 from "@/assets/img/portfolio/shape-2.png";
import service_star_icon from "@/assets/img/portfolio/star.png";
import StrategyIcno from '@/svg/home-3/StrategyIcno';
import LeadershipIcon from '@/svg/home-3/LeadershipIcon';
import DevelopmentIcon from '@/svg/home-3/DevelopmentIcon';

interface DataType {
  subtitle: string;
  title: React.JSX.Element;
  sm_info: React.JSX.Element;
  btn_text: React.JSX.Element;
  service_data: {
    id: number;
    icon: JSX.Element;
    title: React.JSX.Element;
    sm_des: React.JSX.Element;
    tag_1: string;
    tag_2: string;
  }[];
}


const service_content: DataType = {
  subtitle: "OUR PROCESS",
  title: <>How I <br /> Carry Out My Projects</>,
  sm_info: <>I provide end-to-end web development services <br /> from frontend to backend & deployment.</>,
  btn_text: <>Call me to discuss your next project <span>Call Now</span></>,
  service_data: [
    {
      id: 1,
      icon: <StrategyIcno />,
      title: <>Project <br /> Planning</>,
      sm_des: <>Understanding requirements, defining scope, and creating a clear roadmap for development.</>,
      tag_1: "Requirements Analysis",
      tag_2: "Tech Stack Selection",
    },
    {
      id: 2,
      icon: <DevelopmentIcon />,
      title: <>Front-End <br /> Development</>,
      sm_des: <>Building responsive and modern interfaces with React, Next.js, and TailwindCSS.</>,
      tag_1: "Responsive UI",
      tag_2: "Next.js / React",
    },
    {
      id: 3,
      icon: <LeadershipIcon />,
      title: <>Back-End <br /> Development</>,
      sm_des: <>Creating scalable APIs and databases using Node.js, Express, and PostgreSQL/MongoDB.</>,
      tag_1: "API Development",
      tag_2: "Database Integration",
    },
  ]
}


const { subtitle, title, sm_info, btn_text, service_data } = service_content

const ServiceAreaHomeThree = ({ style }: any) => {
  return (
    <>
      <div id="service" className={`tp-service-3__area services-panel-area tp-service-3__overlay-bg ${style ? 'sv-iiner__customize' : ''} black-bg-2 pt-150 pb-125 z-index-1`}>

        <div className="tp-service-3__circle-img">
          <span className="text-img">
            <Image src={circle_img} alt="image-here" />
          </span>
          <div className="shape d-none d-lg-block">
            <svg width="260" height="70" viewBox="0 0 260 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M68.7285 34.1352C48.3941 10.6976 13.8796 0.514191 0 0.514191C93.4783 0.514191 276.081 -0.642708 258.863 0.514191C236.79 1.99739 217.224 6.94161 191.137 34.1352C140.468 93.9609 98.3272 68.2507 68.7285 34.1352Z" fill="currentcolor" />
            </svg>
          </div>
        </div>

        <div className="tp-service-3__shape-1">
          <Image src={service_shape_1} alt="image-here" />
        </div>
        <div className="tp-service-3__shape-2 d-none d-lg-block">
          <Image src={service_shape_2} alt="image-here" />
        </div>
        <div className="tp-service-3__shape-3">
          <Image data-speed="1.2" src={service_star_icon} alt="image-here" />
        </div>
        
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="tp-service-3__title-box services-panel-pin">
                <span className="tp-section-subtitle-3 tp_title_anim">{subtitle}</span>
                <h3 className="tp-section-title-3 tp_title_anim">{title}</h3>
                <p className="tp_title_anim">{sm_info}</p>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="tp-service-3__right-wrap">

                {service_data.map((item, i) => (
                  <div key={i} className="tp-service-3__item d-flex align-items-start mb-25 services-panel">
                    <div className="tp-service-3__icon">
                      <span>
                        {item.icon}
                      </span>
                    </div>
                    <div className="tp-service-3__content">
                      <h3 className="tp-service-3__content-title">
                        <Link href="/service-details">{item.title}</Link>
                      </h3>
                      <p>{item.sm_des}</p>
                      <div className="tp-service-3__content-tag">
                        <span className="mr-5">{item.tag_1}</span>
                        <span>{item.tag_2}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="tp-service-3__btn-box">
                  <Link href="/contact">{btn_text}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ServiceAreaHomeThree;