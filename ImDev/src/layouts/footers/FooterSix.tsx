
import React from 'react';
import Image, { StaticImageData } from 'next/image';

import footer_about_img from "@/assets/img/home-05/about/about-img.jpg";

import footer_img_1 from "@/assets/img/home-05/instagram/insta-1.jpg";
import footer_img_2 from "@/assets/img/home-05/instagram/insta-2.jpg";
import footer_img_3 from "@/assets/img/home-05/instagram/insta-3.jpg";
import footer_img_4 from "@/assets/img/home-05/instagram/insta-4.jpg";


interface DataType {
  footer_links: {
    subtitle: string;
    title: string;
    link: string;
  }[];
  footer_images: StaticImageData[];
  copyright_text: string;
  email: string;
}
const footer_content: DataType = {

  footer_links: [
    { subtitle: 'REGULAR UPDATES ON', title: 'Instagram', link: 'https://instagram.com' },
    { subtitle: 'WORD TALKS', title: 'Twitter', link: 'https://twitter.com' },
    { subtitle: 'SINGLE SHOTS', title: 'Dribbble', link: 'https://dribbble.com' },
    { subtitle: 'COMPLETE PROJECTS', title: 'Behance', link: 'https://behance.com' },
  ],
  footer_images: [footer_img_1, footer_img_2, footer_img_3, footer_img_4],
  copyright_text: '© All Rights Reserved. By ThemePure',
  email: 'info@example.com',
}
const { footer_links, footer_images, copyright_text, email } = footer_content

const FooterSix = () => {
  return (
    <>
      <footer>
        <div className="tp-footer-6-area coffe-bg pt-140">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-footer-6-cta-wrap mb-100">
                  <div className="tp-about-5-title-box text-center p-relative">
                    <span className="tp-about-5-subtitle tp-split-text tp-split-in-right">
                      GET TO <br /> X <br /> KNOW ME
                    </span>
                    <h2 className="tp-section-title-5 fs-140 tp-split-text tp-split-in-right">
                      <em>Find me</em>
                      <span className="d-none d-md-inline-block">
                        <Image src={footer_about_img} alt="image-here" />
                      </span>
                      <br /><span>in the best suites</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <div className="tp-footer-6-social-wrap mb-100 d-flex align-items-center justify-content-between">
                  {footer_links.map((item, index) => (
                    <div key={index} className="tp-footer-6-social">
                      <span>{item.subtitle}</span>
                      <a className="d-flex align-items-center" href={item.link} target="_blank">
                        {item.title}
                        <span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L13 1" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 1H13V13" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L13 1" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 1H13V13" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="container container-1350">
            <div className="tp-footer-6-instagram-wrap">
              <div className="row">
                {footer_images.map((item, index) => (
                  <div key={index} className="col-xl-3 col-lg-3 col-md-6">
                    <div className="tp-footer-6-instagram-thumb fix mb-30">
                      <a href="#">
                        <Image src={item} alt="image-here" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="tp-footer-6-copyright pb-30">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="tp-footer-6-copyright-text text-center text-md-start">
                    <span>
                      {copyright_text} {new Date().getFullYear()}
                    </span>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="tp-footer-6-copyright-text text-center text-md-end">
                    <span>
                      <a href={`mailto:${email}`}>{email}</a>
                    </span>
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

export default FooterSix;