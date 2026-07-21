'use client';

import { gsap } from "gsap";
import Link from 'next/link';
import Image from "next/image";
import React, { useEffect } from 'react';

import footer_img from "@/assets/img/footer/footer-3-1.png";
import footer_logo from "@/assets/img/logo/logo-2.svg";
import footer_btn from "@/assets/img/footer/foooter-btn.png";


import footer_shape_1 from "@/assets/img/footer/footer-shape.png";
import FooterBtnIcon from '@/svg/home-3/FooterBtnIcon';


interface DataType{
  subtitle: string;
  title: string;
  links: {
      title: string;
      link: string;
  }[];
  sm_info: React.JSX.Element;
  company_name: string;
  social_links: {
      name: string;
      icon: string;
      link: string;
  }[];
}

const footer_content: DataType = {
  subtitle: "Contact Me",
  title: "Let's work Together",
  links: [
    { title: "About", link: "/about" },
    { title: "Works", link: "/portfolio" },
    { title: "Services", link: "/service" },
  ],
  sm_info: <>A template made for professional designers, photographers and all people <br /> who work with creativity and those who don't, this template is yours, use it <br /> as you want happy.</>,
  company_name: "Themepure",
  social_links: [
    { 
    name: "Email", 
    icon: "fa-solid fa-envelope", 
    link: "mailto:ieddine008@gmail.com" 
  },
  { 
    name: "LinkedIn", 
    icon: "fa-brands fa-linkedin-in", 
    link: "https://www.linkedin.com/in/imad-eddine-36b7a6220?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
  },
  { 
    name: "WhatsApp", 
    icon: "fa-brands fa-whatsapp", 
    link: "https://wa.me/213675971518" 
  },
  ]
}

const { subtitle, title, links, sm_info, company_name, social_links } = footer_content

const FooterThree = () => {

  // mouse move animation gsap
  const handleMouseMove = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const center = viewportWidth / 2;
    const centerHeight = viewportHeight / 2;

    if (x > center) {
      gsap.to('.tp-mouse-move-btn', {
        x: 100,
        duration: 2,
        ease: 'power4.out',
      });
    } else {
      gsap.to('.tp-mouse-move-btn', {
        x: -100,
        duration: 2,
        ease: 'power4.out',
      });
    }
    if (y > centerHeight) {
      gsap.to('.tp-mouse-move-btn', {
        y: 100,
        duration: 2,
        ease: 'power4.out',
      });
    } else {
      gsap.to('.tp-mouse-move-btn', {
        y: -100,
        duration: 2,
        ease: 'power4.out',
      });
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);




  return (
    <>
      <footer>
        <div className="tp-footer-3__wrapper tp-footer-3__overlay-bg black-bg-2 p-relative z-index-1 fix tp-mouse-move-btn-section">
          <div className="tp-footer-3__shape-1">
            <Image src={footer_shape_1} alt="image-here" />
          </div>
          <div className="tp-footer-3__img">
            <Image className="footer-logo" src={footer_img} style={{ height: "auto",   }} alt="image-here" />
          </div>
          <div className="tp-footer-3__area pt-120 pb-120">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-7 col-lg-7">
                  <div className="tp-footer-3__title-box">
                    <span className="tp-footer-3__subtitle">{subtitle}</span>
                    <h3 className="tp-footer-3__title tp_title_anim">{title}</h3>
                  </div>
                  <div className="tp-footer-3__widget">
                    <div className="tp-footer-3__widget-top d-flex align-items-center justify-content-between">
                      <div className="tp-footer-3__logo">
                        <Link href="/contact">
                          <Image className="footer-logo" src={footer_logo} alt="image-here" />
                        </Link>
                      </div>
                      <div className="tp-footer-3__menu">
                        <ul>
                          {links.map((item, index) => (
                            <li key={index}><Link href={item.link}>{item.title}</Link></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="tp-footer-3__text">
                      <p className="tp_title_anim">{sm_info}</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5">
                  <div className="tp-footer-3__link text-xxl-start text-center">
                    <a className="p-relative d-inline-block tp-mouse-move-btn" href="#">
                      <Image src={footer_btn} alt="image-here" />
                      <span>
                        <FooterBtnIcon />
                        <FooterBtnIcon />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-copyright-3__area">
            <div className="tp-copyright-3__border-top">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-lg-3 col-md-3">
                    <div className="tp-copyright-3__left text-center text-md-start">
                      <p>© {new Date().getFullYear()} {company_name}.</p>
                    </div>
                  </div>
                  <div className="col-xl-9 col-lg-9 col-md-9 d-none d-md-block">
                    <div className="tp-copyright-3__social text-end">
                      <ul>
                        {social_links.map((item, index) => (
                          <li key={index}><Link href={item.link} target="_blank"><i className={item.icon}></i>{item.name}</Link></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterThree;
