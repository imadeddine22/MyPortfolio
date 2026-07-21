'use client'

import React from 'react';
import Link from 'next/link';

interface DataType {
  title: string;
  subtitle: React.JSX.Element;
  info: string;
  price_data: {
      id: number;
      title: string;
      price: number;
      sm_des: string;
      features: string[];
  }[];
}

const price_content: DataType = {
  title: "EXPERTISE",
  subtitle: <>Our <br /> pricing plans</>,
  info: 'Pricing that suits your needs',
  price_data: [
    {
      id: 1,
      title: 'Premium',
      price: 2400,
      sm_des: `Have more active requests at a time?`,
      features: [
        `Full-day coverage`,
        `2 photographers`,
        `Online gallery`,
        `High-resolution edited images`,
        `Engagement session included`,
      ]
    },
    {
      id: 2,
      title: 'Basic',
      price: 1200,
      sm_des: `Have more active requests at a time?`,
      features: [
        `Full-day coverage`,
        `2 photographers`,
        `Online gallery`,
        `Engagement session included`,
      ]
    },
    {
      id: 3,
      title: 'Deluxe',
      price: 3500,
      sm_des: `Have more active requests at a time?`,
      features: [
        `Full-day coverage`,
        `3 photographers`,
        `Premium photo album`,
        `Pre-wedding photo sessions`,
        `Engagement session included`,
        `Online Gallery`,
      ]
    },
  ],
}
const { title, subtitle, info, price_data } = price_content


const PriceAreaHomeFour = () => {
 
  return (
    <>
      <div className="tp-price-4-area black-bg-5 pt-150 pb-120 black-bg-6">
        <div className="container container-1320">
          <div className="tp-price-4-title-wrap mb-90">
            <div className="row align-items-end">
              <div className="col-xl-2">
                <div className="tp-about-4-subtitle-box">
                  <span className="tp-section-subtitle-5">{title}</span>
                </div>
              </div>
              <div className="col-xl-10">
                <div className="tp-about-4-title-box">
                  <h2 className="tp-section-title-5 mb-20 tp_text_invert">{subtitle}</h2>
                  <p className="tp_text_invert">{info}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {price_data.map((item, i) => (
              <div key={i} className="col-xl-4 col-lg-6 col-md-6 mb-40">
                <div className={`tp-price-4-item p-relative ${i === 1 ? 'active' : ''}`}                
                >
                  <span className="tp-price-4-bdr-1 bdr-topleft"></span>
                  <span className="tp-price-4-bdr-2 bdr-topright"></span>
                  <span className="tp-price-4-bdr-3 bdr-bottomleft"></span>
                  <span className="tp-price-4-bdr-4 bdr-bottomright"></span>

                  <div className="tp-price-4-head">
                    <h4 className="tp-price-4-title">{item.title}</h4>
                    <span className="tp-price-4-price">${item.price}</span>
                    <p>{item.sm_des}</p>
                  </div>

                  <div className="tp-price-4-btn">
                    <Link className="tp-btn-4-1-price w-100" href="/contact">BOOK NOW</Link>
                  </div>

                  <div className="tp-price-4-list">
                    <ul>
                      {item.features.map((feature, index) => (
                        <li key={index}>{feature}</li>                        
                      ))} 
                    </ul>
                  </div>
                  
                </div>
              </div>
            ))} 
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceAreaHomeFour;