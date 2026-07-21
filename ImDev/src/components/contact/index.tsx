'use client'
import React from 'react';
import ContactArea from './ContactArea';
import HeaderFour from '@/layouts/headers/HeaderFour';
import FooterOne from '@/layouts/footers/FooterOne';



const Contact = () => {
  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <ContactArea />
          </main>
          <FooterOne style={true} />
        </div>
      </div>

    </>
  );
};

export default Contact;