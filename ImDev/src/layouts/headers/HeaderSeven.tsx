'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import Offcanvas from '@/components/common/Offcanvas';

import logo from "@/assets/img/logo/logo-white.svg";
import Image from 'next/image';

const HeaderSeven = () => {

  const [showCanvas, setShowCanvas] = useState<boolean>(false);



  return (
    <>
      <header>
        <div className="tp-header-3__area tp-header-transparent tp-header-3__ptlr">
          <div className="container container-1720">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-6 col-6">
                <div className="tp-header-3__logo">
                  <Link className="white-logo" href="/"><Image src={logo} alt="image-here" /></Link>
                </div>
              </div>
              <div className="col-xl-6 d-none">
                <div className="tp-header-4__menu text-center">
                  <nav className="tp-main-menu-content counter-row">
                    
                  </nav>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-6">
                <div className="tp-header-3__right-action d-flex align-items-center justify-content-end">
                  <div className="tp-header-3__bar tp-magnetic-wrap">
                    <button 
                    onClick={() => setShowCanvas(true)}
                    className="tp-menu-bar tp-offcanvas-open-btn tp-magnetic-item not-hide-cursor tp-toggle-btn-box">
                      <svg width="32" height="10" viewBox="0 0 32 10" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M31 1H1" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M31 9H1" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Offcanvas showCanvas={showCanvas} setShowCanvas={setShowCanvas} style_bg={true}  />

    </>
  );
};

export default HeaderSeven;
