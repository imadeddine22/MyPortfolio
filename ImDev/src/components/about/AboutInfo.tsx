
'use client'; 
import React from 'react';
import UseHoverReveal from '@/hooks/UseHoverReveal';

interface DataType {
  title: string;
  bg_img: string;
}

const info_data: DataType[] = [
  {
    title: "Frontend Development",
    bg_img: "/assets/img/about/ab-1.jpg",
  },
  {
    title: "Backend Development",
    bg_img: "/assets/img/about/ab-2.jpg",
  },
  {
    title: "API & Database",
    bg_img: "/assets/img/about/ab-3.jpg",
  },
  {
    title: "Deployment & DevOps",
    bg_img: "/assets/img/about/ab-4.jpg",
  }
]



const AboutInfo = () => {
  const {handleMouseMove} = UseHoverReveal();
  return (
    <>
      <div id="about-info-area" className="ab-info__area black-bg-3 pb-160">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="ab-info__text">

                <div>
                  I'm Imad Eddine <span className="line"></span> a self-taught Full-Stack Developer 
based in Algeria. I started my journey in web development with a strong passion 
for coding and problem-solving, and now I build modern, scalable applications 
from frontend to backend.


                  {info_data.map((item, index) =>
                    <React.Fragment key={index}>
                      <a className="tp-hover-reveal-item" href="#" onMouseMove={(event) => handleMouseMove(event, '.tp-hover-reveal-item')}>
                        {item.title}
                        <span></span>
                        <div className="tp-hover-reveal-bg" style={{ backgroundImage: `url(${item.bg_img})` }}></div>
                      </a>, {' '}
                    </React.Fragment>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutInfo;