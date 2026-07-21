
import React from 'react';
import Image from 'next/image';

import Logo1 from "@/assets/img/logo/logo.svg"
import Logo2 from "@/assets/img/logo/logo-black.svg"
import logo_white from "@/assets/img/logo/logo-white.svg"
import Shape from "@/assets/img/offcanvas/bg-shape-2.png"
import MobileMenus from '@/layouts/headers/menu/mobile-menus';


const Offcanvas = ({ showCanvas, setShowCanvas, style_bg, style_bg2 }: any) => {
  return (
    <>
      <div className={`tp-offcanvas-area  ${showCanvas ? 'opened' : ''} ${style_bg ? 'tp-offcanvas-update-bg' : ''} ${style_bg2 ? 'tp-offcanvas-update-bg-2' : ''}`}>
        <div className="tp-offcanvas-bg is-left"></div>
        <div className="tp-offcanvas-bg is-right d-none d-md-block">
          <div className="tp-offcanvas-shape">
            <Image className="tp-offcanvas-shape-1" src={Shape} alt="image" />
          </div>
        </div>
        <div className="tp-offcanvas-wrapper-2">

          <div className="tp-offcanvas-left">
            <div className="tp-offcanvas-left-wrap d-flex justify-content-between align-items-center">

              <div className="tpoffcanvas__logo">
                {style_bg ?
                  <Image className="logo-white" style={{ height: 'auto' }} src={logo_white} alt="image" />
                  :
                  <>
                    <Image className="logo-white" style={{ height: 'auto' }} src={Logo1} alt="image" />
                    <Image className="logo-black" style={{ height: 'auto' }} src={Logo2} alt="image" />
                  </>

                }
              </div>
              <div className="tp-offcanvas-close d-md-none text-end">

                <button className="tp-offcanvas-close-btn tp-offcanvas-close-btn" onClick={() => setShowCanvas(false)}>
                  <span className="text">
                    <span>close</span>
                  </span>
                  <span className="d-inline-block">
                    <span>
                      <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.80859 9.80762L28.1934 28.1924" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.80859 28.1924L28.1934 9.80761" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </button>

              </div>
            </div>
            <div className="tp-main-menu-mobile menu-hover-active counter-row">
              <nav>
                <MobileMenus />
              </nav>
            </div>
          </div>

          <div className="tp-offcanvas-right d-none d-md-block">
            <div className="tp-offcanvas-close text-end">
              <button className="tp-offcanvas-close-btn tp-offcanvas-close-btn" onClick={() => setShowCanvas(false)}>
                <span className="text">
                  <span>close</span>
                </span>

                <span className="d-inline-block">
                  <span>
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.80859 9.80762L28.1934 28.1924" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.80859 28.1924L28.1934 9.80761" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>

              </button>
            </div>
            <div className="tp-offcanvas-right-inner d-flex flex-column justify-content-between h-100">

              <div className="tpoffcanvas__right-info">
                <div className="tpoffcanvas__tel">
                  <a href="tel:+213 675 97 15 18">+213 675 97 15 18</a>
                </div>
                <div className="tpoffcanvas__mail">
                  <a href="mailto:ieddine008@gmail.com">
                    ieddine008gmail</a>
                </div>
                <div className="tpoffcanvas__text">
                  <p>welcome in my website</p>
                </div>
              </div>

              <div className="tpoffcanvas__social-link">
                <ul>
                 
                  <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
                  <li><a href="https://www.linkedin.com" target="_blank">Linkedin</a></li>
                  <li><a href="https://www.whatsApp.com" target="_blank">whatsApp</a></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Offcanvas;
