
import React from 'react'; 
import HeaderSeven from '@/layouts/headers/HeaderSeven';
import PortfolioSliderHomeSix from './PortfolioSliderHomeSix';

const HomeSix = () => {
  return (
    <>
      <HeaderSeven />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <PortfolioSliderHomeSix />
          </main>
        </div>
      </div>

    </>
  );
};

export default HomeSix;