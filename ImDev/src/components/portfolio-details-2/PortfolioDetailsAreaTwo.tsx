

import React from 'react';
import Image from 'next/image';


import portfolio_details_img_1 from "@/assets/img/portfolio-details-2/port-1.jpg";
import portfolio_details_img_2 from "@/assets/img/portfolio-details-2/port-2.jpg";
import portfolio_details_img_3 from "@/assets/img/portfolio-details-2/port-3.jpg";
import portfolio_details_img_4 from "@/assets/img/portfolio-details-2/port-4.jpg";
import portfolio_details_img_5 from "@/assets/img/portfolio-details-2/port-5.jpg";


interface DataType {
  subtitle: string;
  title: string;
  about_text: string;
  desscription_1: string;
  desscription_2: string;
  features: {
      id: number;
      title: string;
      subtitle: string;
  }[];
  title_2: string;
}

const portfolio_content: DataType = {
  subtitle: 'Fashion',
  title: 'Siyantika Glory',
  about_text: `It’s all about Fashion`,
  desscription_1: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
  desscription_2: `In this demo project, we will provide an overview of the interior design process, showcasing the various stages involved in crafting stunning and personalized living and working spaces. From conceptualization to execution, You need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.!`,
  features: [
    {
      id: 1,
      title: 'Clients',
      subtitle: 'The Organic Crave',
    },
    {
      id: 2,
      title: 'Year',
      subtitle: '20/01/2018',
    },
    {
      id: 3,
      title: 'Role',
      subtitle: 'Fashion design',
    },
  ],
  title_2: `Finishing & Touches`, 

}

const { 
  subtitle, 
  title, 
  about_text, 
  desscription_1, 
  desscription_2, 
  features,
  title_2, 
} = portfolio_content

const PortfolioDetailsAreaTwo = () => {
  return (
    <>
      <div className="tp-port-2-area tp-port-2-pt coffe-bg">
        <div className="container container-1350">
          <div className="row">
            <div className="col-xl-10">
              <div className="tp-port-2-title-box mb-90">
                <span className="tp-port-2-subtitle tp-split-text tp-split-in-right">{subtitle}</span>
                <h2 className="tp-port-2-title tp-split-text tp-split-in-right">{title}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container container-1720">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-port-2-thumb">
                <Image data-speed="0.4" data-lag="0" src={portfolio_details_img_1} alt="image-here" />
              </div>
            </div>
          </div>
        </div>
        <div className="container container-1350">
          <div className="tp-port-2-content-wrap">
            <div className="row">
              <div className="col-xl-5">
                <div className="tp-port-2-title-box">
                  <h2 className="tp-port-2-title-sm mb-35 tp-split-text tp-split-in-right">{about_text}</h2>
                  <a className="tp-btn-4-1-price sm" href="#">Visit Link</a>
                </div>
              </div>
              <div className="col-xl-7">
                <div className="tp-port-2-content">
                  <div className="tp-port-2-text">
                    <p className="pb-30">
                      {desscription_1}
                    </p>
                    <p className="pb-55">
                      {desscription_2}
                    </p>
                  </div>
                  <div className="tp-port-2-info d-flex align-items-center">
                    {features.map((item, i) => (
                      <div key={i} className="tp-port-2-info-item">
                        <h5 className="tp-port-2-info-title">{item.title}</h5>
                        <span>{item.subtitle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container container-1720">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-port-2-thumb">
                <Image data-speed="0.4" data-lag="0" src={portfolio_details_img_2} alt="image-here" />
              </div>
            </div>
          </div>
        </div>
        <div className="container container-1350">
          <div className="tp-port-2-content-wrap">
            <div className="row">
              <div className="col-xl-5">
                <div className="tp-port-2-title-box">
                  <h2 className="tp-port-2-title-sm tp-split-text tp-split-in-right">
                    {title_2}
                  </h2>
                </div>
              </div>
              <div className="col-xl-7">
                <div className="tp-port-2-content">
                  <div className="tp-port-2-text">
                    <p className="pb-35">
                      {desscription_1}
                    </p>
                    <p>{desscription_2}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container container-1720">
          <div className="tp-port-2-thumb-wrap mb-60">
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-port-2-thumb mb-30">
                  <Image data-speed="0.4" data-lag="0" src={portfolio_details_img_3} alt="image-here" />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="tp-port-2-thumb mb-30">
                  <Image data-speed="0.4" data-lag="0" src={portfolio_details_img_4} alt="image-here" />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="tp-port-2-thumb mb-30">
                  <Image data-speed="0.4" data-lag="0" src={portfolio_details_img_5} alt="image-here" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-port-2-navigation-style">
                <div className="porfolio-details__navigation-wrap">
                  <div className="row align-items-center">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                      <div className="porfolio-details__navigation-content text-center text-md-start">
                        <a href="#"><i className="fa-regular fa-arrow-left"></i><span>Preview</span></a>
                        <h4>UX in Ecommerce</h4>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                      <div className="porfolio-details__navigation-bar porfolio-details__navigation-bar-2  text-center">
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

export default PortfolioDetailsAreaTwo;