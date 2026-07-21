
import React from 'react';
import AboutInfo from './AboutInfo';
import FunfactArea from './FunfactArea';
import PersonalInfo from './PersonalInfo';
import HeroAreaAbout from './HeroAreaAbout';
import FooterFour from '@/layouts/footers/FooterFour';
import HeaderFour from '@/layouts/headers/HeaderFour';
import AwardAreaHomeOne from '../homes/home/AwardAreaHomeOne';


const About = () => {
  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper" className="black-bg-3">
        <div id="smooth-content">
          <main>
            <HeroAreaAbout />
            <AboutInfo />
            <PersonalInfo />
            <FunfactArea />
            <AwardAreaHomeOne style_2={true} />
          </main>
          <FooterFour />
        </div>
      </div>
    </>
  );
};

export default About;