'use client'

import React from 'react';
import Link from 'next/link';
import UseHoverReveal from '@/hooks/UseHoverReveal';


interface DataType {
  subtitle: string;
  title: string;
  description: string;
  project_data: {
      id: number;
      year: string;
      title: string;
      description: string;
      img: string;
  }[];
}

const about_content: DataType = {
  subtitle: 'EXPERTISE',
  title: 'EMMA MITCHELL',
  description: `The Projects I've Been Primarily Focused On Lately.`,
  project_data: [
    {
      id: 1,
      year: '2024',
      title: `Wedding`,
      description: `Collections / Design / Wedding`,
      img: `/assets/img/new-img/project/wedding.jpg`,
    },
    {
      id: 2,
      year: '2024',
      title: `Event`,
      description: `Collections / Design / Event`,
      img: `/assets/img/new-img/project/event.jpg`
    },
    {
      id: 3,
      year: '2024',
      title: `Family Shoots`,
      description: `Collections / Design / Wedding`,
      img: `/assets/img/new-img/project/family.jpg`
    },
    {
      id: 4,
      year: '2024',
      title: `Cosmetic store`,
      description: `Collections / Design / Wedding`,
      img: `/assets/img/new-img/project/cosmetic.jpg`
    },
    {
      id: 5,
      year: '2024',
      title: `Fashion`,
      description: `Collections / Design / Wedding`,
      img: `/assets/img/new-img/project/fashion.jpg`
    },
  ]
}

const {
  subtitle,
  title,
  description,
  project_data
} = about_content

const AboutAreaHomeFour = () => {

  const {handleMouseMove} = UseHoverReveal();



  return (
    <>
      <div className="tp-project-4-2-area black-bg-6 pt-150 pb-150">
        <div className="container container-1320">
          <div className="tp-project-4-2-title-wrap mb-90">
            <div className="row align-items-end">
              <div className="col-xl-2">
                <div className="tp-about-4-subtitle-box">
                  <span className="tp-section-subtitle-5">{subtitle}</span>
                </div>
              </div>
              <div className="col-xl-7 col-lg-8 col-md-8">
                <div className="tp-about-4-title-box">
                  <h2 className="tp-section-title-5 mb-20 tp_text_invert">{title}</h2>
                  <p className="tp_text_invert">[{description}]</p>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-4 d-none d-md-block">
                <div className="tp-about-4-shape text-end">
                  <img src="assets/img/new-img/about/ab-4-1-shape.png" alt="image-here" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="offset-xl-3 col-xl-9">
              <div className="tp-project-4-2-wrap">
                {project_data.map((item, i) => (
                  <div key={i} className="tp-project-4-2-item p-relative tp-hover-reveal-item active"
                  onMouseMove={(event) => handleMouseMove(event, '.tp-hover-reveal-item')}                  
                  >
                    <Link href="/portfolio-details-3">
                      <div className="tp-project-4-2-inner-item d-flex justify-content-between align-items-center">
                        <div className="tp-project-4-2-content d-flex align-items-start">
                          <div className="tp-project-4-2-year">
                            <span>{new Date().getFullYear()}</span>
                          </div>
                          <div className="tp-project-4-2-title-box">
                            <h4 className="tp-project-4-2-title">{item.title}</h4>
                            <span> {item.description} </span>
                          </div>
                        </div>
                        <div className="tp-project-4-2-link">
                          <span>
                            <svg width="26" height="21" viewBox="0 0 26 21" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 10.3965H26" stroke="currentcolor" strokeWidth="2"
                                strokeMiterlimit="10" />
                              <path d="M15.9307 0C15.9307 5.74655 20.4343 10.3965 26 10.3965"
                                stroke="currentcolor" strokeWidth="2" strokeMiterlimit="10" />
                              <path d="M26 10.3965C20.4343 10.3965 15.9307 15.0465 15.9307 20.793"
                                stroke="currentcolor" strokeWidth="2" strokeMiterlimit="10" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="tp-hover-reveal-bg" style={{ backgroundImage: `url(${item.img})` }}>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutAreaHomeFour;