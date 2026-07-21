import React from 'react';
import HeaderSix from '@/layouts/headers/HeaderSix';
import HeroAreaHomeFive from './HeroAreaHomeFive';
import TextSlideHomeFive from './TextSlideHomeFive';
import AboutAreaHomeFive from './AboutAreaHomeFive';
import ProjectAreaHomeFive from './ProjectAreaHomeFive';
import VideoHomeFour from '../home-4/VideoHomeFour';
import PortfolioAreaHomeFive from './PortfolioAreaHomeFive';
import TestimonailAreaHomeFive from './TestimonailAreaHomeFive';
import FooterSix from '@/layouts/footers/FooterSix';

const HomeFive = () => {
  return (
    <>
      <HeaderSix />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroAreaHomeFive />
            <TextSlideHomeFive />
            <AboutAreaHomeFive />
            <ProjectAreaHomeFive />
            <VideoHomeFour />
            <PortfolioAreaHomeFive />
            <TestimonailAreaHomeFive />
          </main>
          <FooterSix />
        </div>
      </div>
    </>
  );
};

export default HomeFive;

