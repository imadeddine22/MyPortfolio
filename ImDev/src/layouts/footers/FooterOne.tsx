'use client';
import React from 'react';
import { CopyRight } from '@/components/common/SocialLinks';
import Link from 'next/link';


interface DataType {
  title: string;
  title_2: JSX.Element;
  btn_text_1: string;
  btn_text_2: string;
  footer_data: {
    id: number;
    name: string;
    user_name: string;
    icon: React.JSX.Element;
  }[];
}

const footer_content: DataType = {
  title: "Let's talk about the next big thing",
  title_2: <>Let's talk about <br /> the next big thing</>,
  btn_text_1: 'Write a Message',
  btn_text_2: 'Discuss Project',
  footer_data: [
    {
      id: 1,
      name: "LinkedIn",
      user_name: "linkedin.com/in/imadeddine", // غيرها برابطك
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.12 1 2.5 1 4.98 2 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.7v2.3h.05c.52-.98 1.8-2.3 3.7-2.3 4 0 4.7 2.6 4.7 6V24h-4v-7.9c0-1.9 0-4.3-2.6-4.3s-3 2-3 4.1V24h-4V8z"/>
        </svg>
      ),
    },
    {
      id: 2,
      name: "WhatsApp",
      user_name: "+213 675 97 15 18", // غيرها برقمك
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M16 .6C7.6.6.7 7.5.7 16c0 2.8.7 5.4 2 7.8L0 32l8.5-2.6c2.3 1.3 5 2 7.8 2 8.5 0 15.4-6.9 15.4-15.4S24.5.6 16 .6zm0 28c-2.5 0-4.8-.7-6.8-1.9l-.5-.3-5 1.5 1.6-4.9-.3-.5c-1.2-2-1.9-4.3-1.9-6.8C3.1 9.3 9 3.4 16 3.4s12.9 5.9 12.9 12.9S23 28.6 16 28.6zm7.4-9.9c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.9.2s-1 1.2-1.2 1.4-.4.3-.8.1c-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.6.2-.2.3-.4.5-.6.2-.2.1-.5 0-.7-.1-.2-.9-2.2-1.3-3-.4-.8-.7-.7-1-.7h-.9c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.2 1.3 3.7 1.5 4c.2.3 2.5 3.9 6 5.5.8.3 1.4.5 1.9.6.8.3 1.5.3 2.1.2.6-.1 2.2-.9 2.5-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.7-.5z"/>
        </svg>
      ),
    },
  ],
}



const { btn_text_1, btn_text_2, title_2, footer_data } = footer_content





const FooterOne = ({ style }: any) => {
  const bg_img = style ? "/assets/img/footer/overly-bg-2.png" : "/assets/img/skill/bg-distort.png";





  return (
    <>
      <footer>
        <div className={`tp-footer-bg ${style ? "tp-footer__customize  black-bg-3" : "tp-footer-bg-light theme-bg-2"} p-relative fix z-index-1`}
          style={{ backgroundImage: `url(${bg_img})` }}>
          <div className="tp-footer-circle-1">
            <span></span>
          </div>
          <div className="tp-footer-circle-2">
            <span></span>
          </div>
          <div className="tp-footer-circle-3" data-speed=".7">
            <span></span>
          </div>
          <div className={`tp-footer-area ${style ? "tp-footer-inner__customize" : ""} pb-80 pt-120`}>
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="tp-footer-content text-center">
                    <h3 className={`tp-footer-title ${style ? "" : "big"} tp_title_anim`}>{title_2}</h3>
                  </div>
                </div>
              </div>
              {style ?
                <div className="tp-footer-btn-box">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="tp-footer-btn text-center">
                        <Link className="tp-btn-white-xl w-100" href="/contact">
                          <div>
                            <span>Discuss Project</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="tp-footer-btn text-center">
                        <a className="tp-btn-grey-xl w-100" target="_blank" href="mailto:WriteaMessage">
                          <div>
                            <span>Write a Message</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="tp-footer-btn-box">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="tp-footer-btn text-center ">
                        <a className="tp-btn-green w-100" href="mailto:WriteaMessage">
                          <div>
                            <span>{btn_text_1}</span>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="tp-footer-btn text-center ">
                        <Link className="tp-btn-white-xl w-100" href="/contact">
                          <div>
                            <span>{btn_text_2}</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              }

              <div className="row gx-50">
                {footer_data.map((item, index) => (
                  <div key={index} className="col-xl-4 col-lg-4 col-md-6" style={{ marginBottom: "30px" }}>
                    <a href="#">
                      <div className="tp-footer-social-item d-flex align-items-center justify-content-between">
                        <span className="tp-footer-anim-border"></span>
                        <div className="tp-footer-social-text z-index-1">
                          <span className="child-1">{item.name}</span>
                          <span className="child-2">{item.user_name}</span>
                        </div>
                        <div className="tp-footer-social-icon z-index-1">
                          <span>
                            {item.icon}
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="tp-copyright-area pb-20">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-md-6">
                  <div className="tp-copyright-content-left text-center text-md-start">
                    <p><CopyRight /></p>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6">
                  <div className="tp-copyright-content-right text-center text-md-end">
                    <span> CONTACT US</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterOne;