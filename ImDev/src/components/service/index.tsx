import React from 'react';
import SeviceHeroArea from './SeviceHeroArea';
import ServiceInfoArea from './ServiceInfoArea';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderFour from '@/layouts/headers/HeaderFour';
import ServiceAreaHomeThree from '../homes/home-3/ServiceAreaHomeThree';
import TestimonialAreaHomeOne from '../homes/home/TestimonialAreaHomeOne';


const Service = () => {
  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <SeviceHeroArea />
            <ServiceAreaHomeThree style={true} />
            <ServiceInfoArea />
            <TestimonialAreaHomeOne style={true} />
          </main>
          <FooterOne style={true} />
        </div>
      </div>
    </>
  );
};

export default Service;