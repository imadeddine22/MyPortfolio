

import React from 'react';
import HeaderNine from '@/layouts/headers/HeaderNine';
import PortfolioSliderHomeSeven from './PortfolioSliderHomeSeven';

const HomeSeven = () => {
  return (
    <>
      <HeaderNine style_2={true} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <PortfolioSliderHomeSeven />
          </main>
        </div>
      </div>
    </>
  );
};

export default HomeSeven;