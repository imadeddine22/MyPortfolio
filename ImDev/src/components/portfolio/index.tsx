'use client'
import React from 'react';
import HeaderFour from '@/layouts/headers/HeaderFour';
import PortfolioSlider from './PortfolioSlider';
import PortfolioArea from './PortfolioArea';
import FooterOne from '@/layouts/footers/FooterOne';


const Portfolio = () => {
  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <PortfolioSlider />
            <PortfolioArea />
          </main>
          <FooterOne style={true} />
        </div>
      </div>
    </>
  );
};

export default Portfolio;