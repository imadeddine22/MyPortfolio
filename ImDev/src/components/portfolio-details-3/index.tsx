
import React from 'react';
import HeaderNine from '@/layouts/headers/HeaderNine';
import PortfolioDetailsThreeArea from './PortfolioDetailsThreeArea';
import FooterFive from '@/layouts/footers/FooterFive';

const PortfolioDetailsThree = () => {
  return (
    <>
      <HeaderNine />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <PortfolioDetailsThreeArea />
          </main>
          <FooterFive />
        </div>
      </div>
    </>
  );
};

export default PortfolioDetailsThree;