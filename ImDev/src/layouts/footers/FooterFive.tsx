'use client'

import React from 'react'; 
import { CopyRight } from '@/components/common/SocialLinks';
import Slider from 'react-slick';


interface DataType {
  subtitle: string;
  email: string;
  socail_links: {
      title: string;
      link: string;
  }[];
  slide_text: string[];
  footer_links: {
      title: string;
      link: string;
  }[];
}

const footer_content:DataType = {
  subtitle: `Subscribe and never miss out`,
  email: `hello@yourwebsite.com`,
  socail_links: [
    {
      title: "Facebook",
      link: "https://facebook.com",
    },
    {
      title: "Twitter",
      link: "https://twitter.com",
    },
    {
      title: "Instagram",
      link: "https://instagram.com",
    },
  ],
  slide_text: [
    "Went to reach out",
    "Went to reach out",
    "Went to reach out",
    "Went to reach out",
    "Went to reach out",
    "Went to reach out",
  ],
  footer_links: [
    {title: `Home` , link: '/'},
    {title: `About` , link: '/about'},
    {title: `Project` , link: '/project'},
    {title: `Contact` , link: '/contact'},
  ]

}
const {subtitle, email, socail_links, slide_text, footer_links} = footer_content

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

const FooterFive = () => {
 
  return (
    <>
      <footer className="cursor-style fix">
        <div className="tp-footer-5-area pt-150 pb-60 black-bg-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-8">
                <div className="tp-footer-5-subscribe-box text-center">
                  <span className="tp-footer-5-subscribe-title">{subtitle}</span>
                  <div className="tp-footer-5-input-box">
                    <div className="tp-footer-5-input">
                      <form  onClick={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Your Email" />
                          <button className="tp-btn-subscribe" type="submit">Subscribe</button>
                      </form>
                    </div>
                  </div>
                  <div className="tp-footer-5-info-box">
                    <a className="tp-footer-5-info-mail"
                      href={`mailto:${email}`}>{email}</a>
                    <div className="tp-footer-5-social">
                      {socail_links.map((item, index) => (
                        <a href={item.link} key={index} target="_blank"> {item.title} </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-footer-5-text-slide">
   
          <Slider
            {...slider_setting}
            className="tp-footer-5-slide-active">
            {slide_text.map((t, i) => (
            <div key={i} className="tp-footer-5-text-wrap">
            <span className="tp-footer-5-text">{t}</span>
          </div>
            ))}
          </Slider>

          </div>
        </div>
        <div className="tp-copyright-5-area black-bg-5">
          <div className="tp-copyright-5-wrap">
            <div className="container container-1320">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="tp-copyright-5-left text-center text-md-start">
                    <span> <CopyRight style_2={true} /> </span>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="tp-copyright-5-right-menu text-center text-md-end">
                    {footer_links.map((item, index) => (
                      <a href={item.link} key={index}>{item.title} </a>
                    ))}
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

export default FooterFive;