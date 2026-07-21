
import React from 'react';
import Link from 'next/link';
import Image from "next/image";

import shape_1 from "@/assets/img/footer/footer-shape-2.png";
import FooterLogo from "@/assets/img/logo/logo-2.svg";

import HeroGoogleIcon from '@/svg/home/HeroIcons/HeroGoogleIcon';
import HeroEmailIcon from '@/svg/home/HeroIcons/HeroEmailIcon';
import HeroBehanceIcon from '@/svg/home/HeroIcons/HeroBehanceIcon';


interface DataType {
  sm_info: React.JSX.Element;
  social_links: {
      id: number;
      cls: string;
      link: string;
      icon: React.JSX.Element;
  }[];
  links: {
      title: string;
      link: string;
  }[];
  address: React.JSX.Element;
  email: string;
  phone: string;
}

const footer_content: DataType = {
  sm_info: <>Let’s connect and bring your ideas <br /> to life.</>,

  social_links: [
    {
      id: 1,
      cls: "email",
      link: "mailto:ieddine008@gmail.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18c0 1.1.89 2 
          2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
          4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      id: 2,
      cls: "linkedin",
      link: "https://www.linkedin.com/in/imad-eddine-36b7a6220?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 
          0 3.5 1.12 1 2.5 1 4.98 2 4.98 
          3.5zM.5 8h4v16h-4V8zm7.5 
          0h3.7v2.3h.05c.52-.98 
          1.8-2.3 3.7-2.3 4 0 4.7 
          2.6 4.7 6V24h-4v-7.9c0-1.9 
          0-4.3-2.6-4.3s-3 2-3 
          4.1V24h-4V8z" />
        </svg>
      ),
    },
    {
      id: 3,
      cls: "whatsapp",
      link: "https://wa.me/213675971518",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16 .6C7.6.6.7 7.5.7 
          16c0 2.8.7 5.4 2 7.8L0 
          32l8.5-2.6c2.3 1.3 5 2 
          7.8 2 8.5 0 15.4-6.9 
          15.4-15.4S24.5.6 16 
          .6zm0 28c-2.5 0-4.8-.7-6.8-1.9l-.5-.3-5 
          1.5 1.6-4.9-.3-.5c-1.2-2-1.9-4.3-1.9-6.8C3.1 
          9.3 9 3.4 16 3.4s12.9 5.9 12.9 
          12.9S23 28.6 16 28.6zm7.4-9.9c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.9.2s-1 
          1.2-1.2 1.4-.4.3-.8.1c-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 
          0-.6.2-.8.2-.2.4-.4.6-.6.2-.2.3-.4.5-.6.2-.2.1-.5 
          0-.7-.1-.2-.9-2.2-1.3-3-.4-.8-.7-.7-1-.7h-.9c-.3 
          0-.7.1-1 .5s-1.3 1.3-1.3 3.2 1.3 3.7 1.5 4c.2.3 
          2.5 3.9 6 5.5.8.3 1.4.5 1.9.6.8.3 1.5.3 
          2.1.2.6-.1 2.2-.9 2.5-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.7-.5z" />
        </svg>
      ),
    },
  ],


   
  
  links: [
    { title: "About", link: "/about" },
    { title: "Services", link: "/services" },
    { title: "Portfolio", link: "/portfolio" },
    { title: "Contact", link: "/contact" },
  ],
  address: <>PaleTsro <span></span> <br /> ALgeria</>,
  email: "ieddine008@gmail.com",
  phone: "+213 675 97 15 18",
}

const { sm_info, social_links, links, address, email, phone } = footer_content;

const FooterFour = () => {
  return (
    <>
      <footer>
        <div className="tp-footer-4__main-wrapper black-bg-2 p-relative z-index-1 fix" style={{ backgroundImage: "url(/assets/img/footer/overly-bg.png)" }}>
          <div className="tp-footer-4__area pt-80 pb-60">
            <div className="tp-footer-4__shape">
              <Image src={shape_1} alt="logo-here" />
            </div>
            <div className="container">
              <div className="row align-items-start">
                <div className="col-xl-4 col-lg-4 col-md-8 mb-40">
                  <div className="tp-footer-4__widget footer-col-4-1">
                    <div className="tp-footer-4__logo">
                      <Link className="footer-logo" href="/"><Image src={FooterLogo} alt="logo-here" /></Link>

                    </div>
                    <div className="tp-footer-4__content">
                      <p>{sm_info}</p>
                    </div>
                    <div className="tp-footer-4__social">
                      {social_links.map((item, index) => (
                        <Link href={item.link} key={index} target="_blank">
                          <span>
                            {item.icon}
                          </span>
                        </Link>
                      ))}

                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-4 mb-40">
                  <div className="tp-footer-4__widget footer-col-4-2">
                    <h4 className="tp-footer-4__widget-title">Explore</h4>
                    <ul>
                      {links.map((item, index) => (
                        <li key={index}><Link href={item.link}> <i className="fa-regular fa-arrow-right"></i> {item.title}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-8 mb-40">
                  <div className="tp-footer-4__widget footer-col-4-3">
                    <h4 className="tp-footer-4__widget-title">Address</h4>
                    <div className="tp-footer-4__widget-address">
                      <a  href="https://www.google.com/maps/place/El+Khadra,+Algeria/" 
  target="_blank" 
  rel="noopener noreferrer">
                        {address}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 mb-40">
                  <div className="tp-footer-4__widget footer-col-4-4">
                    <h4 className="tp-footer-4__widget-title">Say Hello</h4>
                    <div className="tp-footer-4__widget-mail">
                      <a href={`mailto:${email}`}>{email}</a>
                    </div>
                    <div className="tp-footer-4__widget-mail">
                      <a href={`tel:${phone}`}>{phone}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-copyright-4__area tp-copyright-4__bdr-top pt-20 pb-20">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="tp-copyright-4__text text-center">  
                    <span> Thank you for visiting, and you’re always welcome anytime</span>
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

export default FooterFour;
