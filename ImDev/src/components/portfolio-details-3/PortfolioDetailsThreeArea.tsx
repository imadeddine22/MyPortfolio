
'use client'

import React from 'react';
import Image, { StaticImageData } from 'next/image';

import portfolio_img_1 from '@/assets/img/portfolio-details-3/port-1.jpg';
import portfolio_img_2 from '@/assets/img/portfolio-details-3/port-2.jpg';
import portfolio_img_3 from '@/assets/img/portfolio-details-3/port-3.jpg';
import portfolio_img_4 from '@/assets/img/portfolio-details-3/port-4.jpg';

interface DataType {
  title: string;
  info: ({
      title: string;
      subtitle?: string | JSX.Element;
  })[];
  subtitle: string;
  description: string;
  portfolio_img: StaticImageData[];
}

const portfolio_data:DataType = {
  title: 'Studio Shoot',
  info: [
    {title: 'Date:', subtitle: 'May 1th, 2024:'},
    {title: 'Client:', subtitle: 'Envato Users'},
    {title: 'Services:', subtitle: <>Photography, Family Shoots <br /> Fashion, Event</>},
  ],
  subtitle: 'Description:',
  description: `Lorem ipsum dolor sit amet conseur adipisci inerene. Maecenas volutpat, diam eni sagittis quam porta quam. Sed id dolor consectetur fermentum volutpat accumsan purus iaculis libero.`,
  portfolio_img: [portfolio_img_1, portfolio_img_2, portfolio_img_3, portfolio_img_4],

}

const {
  title,
  info,
  subtitle,
  description,
  portfolio_img
} = portfolio_data

const PortfolioDetailsThreeArea = () => { 
  return (
    <>
      <div className="tp-port-3-area black-bg-5">
        <div className="tp-port-3-bg tp-port-3-height d-flex justify-content-center align-items-center cursor-style" 
         style={{ backgroundImage: 'url(/assets/img/portfolio-details-3/hero-bg.jpg)'}}>
          <div className="tp-port-3-title-box">
            <h4 className="tp-port-3-title">{title}</h4>
          </div>
        </div>
        <div className="tp-port-3-content-wrap pt-140">
          <div className="container container-1350">
            <div className="row">
              <div className="col-xl-5 col-lg-4">
                <div className="tp-port-3-content-left">
                  <h4 className="tp-port-3-content-title">Project Details</h4>
                  <div className="tp-port-3-content-info-wrap">
                    {info.map((item, index) => (
                      <div key={index} className="tp-port-3-content-info d-flex align-content-start">
                        <span>{item.title}</span>
                        <span>{item.subtitle}</span>
                      </div>
                    ))} 
                  </div>
                  <div className="tp-port-3-content-description mb-40">
                    <span>{subtitle}</span>
                    <p>{description}</p>
                  </div>
                  <div className="tp-port-2-title-box">
                    <a className="tp-btn-4-1-price sm" href="#">Visit Link</a>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-lg-8">
                <div className="tp-port-3-thumb-right cursor-style">
                  {portfolio_img.map((item, index) => (
                    <div key={index} className="tp-port-3-thumb mb-40">
                      <Image src={item}   alt="image-here" />                     
                    </div>
                  ))} 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-port-3-navigation-style">
          <div className="container container-1350">
            <div className="row">
              <div className="col-xl-12">
                <div className="porfolio-details__navigation-wrap">
                  <div className="row align-items-center">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                      <div className="porfolio-details__navigation-content text-center text-md-start">
                        <a href="#"><i className="fa-regular fa-arrow-left"></i><span>Preview</span></a>
                        <h4>UX in Ecommerce</h4>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                      <div className="porfolio-details__navigation-bar porfolio-details__navigation-bar-2 text-center">
                        <a href="#">
                          <span>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path className="path-1" opacity="0.5" d="M1 5.21053C1 3.22567 1 2.23323 1.61662 1.61662C2.23323 1 3.22567 1 5.21053 1C7.19539 1 8.18782 1 8.80444 1.61662C9.42105 2.23323 9.42105 3.22567 9.42105 5.21053C9.42105 7.19539 9.42105 8.18782 8.80444 8.80444C8.18782 9.42105 7.19539 9.42105 5.21053 9.42105C3.22567 9.42105 2.23323 9.42105 1.61662 8.80444C1 8.18782 1 7.19539 1 5.21053Z" stroke="currentcolor" strokeWidth="1.5" />
                              <path className="path-1" opacity="0.5" d="M12.5781 16.7896C12.5781 14.8048 12.5781 13.8123 13.1947 13.1957C13.8114 12.5791 14.8038 12.5791 16.7887 12.5791C18.7735 12.5791 19.7659 12.5791 20.3826 13.1957C20.9992 13.8123 20.9992 14.8048 20.9992 16.7896C20.9992 18.7745 20.9992 19.7669 20.3826 20.3835C19.7659 21.0002 18.7735 21.0002 16.7887 21.0002C14.8038 21.0002 13.8114 21.0002 13.1947 20.3835C12.5781 19.7669 12.5781 18.7745 12.5781 16.7896Z" stroke="currentcolor" strokeWidth="1.5" />
                              <path className="path-2" d="M1 16.7895C1 14.8046 1 13.8122 1.61662 13.1956C2.23323 12.5789 3.22567 12.5789 5.21053 12.5789C7.19539 12.5789 8.18782 12.5789 8.80444 13.1956C9.42105 13.8122 9.42105 14.8046 9.42105 16.7895C9.42105 18.7743 9.42105 19.7668 8.80444 20.3834C8.18782 21 7.19539 21 5.21053 21C3.22567 21 2.23323 21 1.61662 20.3834C1 19.7668 1 18.7743 1 16.7895Z" stroke="currentcolor" strokeWidth="1.5" />
                              <path className="path-2" d="M12.5781 5.21053C12.5781 3.22567 12.5781 2.23323 13.1947 1.61662C13.8114 1 14.8038 1 16.7887 1C18.7735 1 19.7659 1 20.3826 1.61662C20.9992 2.23323 20.9992 3.22567 20.9992 5.21053C20.9992 7.19539 20.9992 8.18782 20.3826 8.80444C19.7659 9.42105 18.7735 9.42105 16.7887 9.42105C14.8038 9.42105 13.8114 9.42105 13.1947 8.80444C12.5781 8.18782 12.5781 7.19539 12.5781 5.21053Z" stroke="currentcolor" strokeWidth="1.5" />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                      <div className="porfolio-details__navigation-content next text-center text-md-end">
                        <a href="#"><span>Next</span><i className="fa-regular fa-arrow-right"></i></a>
                        <h4>Tiktok Ads</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioDetailsThreeArea;