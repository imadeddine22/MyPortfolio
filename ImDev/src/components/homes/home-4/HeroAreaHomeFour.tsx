'use client';

import { gsap } from 'gsap';
import Link from 'next/link';
import React, { useEffect } from 'react';
import HeroEmailIcon from '@/svg/home/HeroIcons/HeroEmailIcon';
import HeroGoogleIcon from '@/svg/home/HeroIcons/HeroGoogleIcon';
import HeroBehanceIcon from '@/svg/home/HeroIcons/HeroBehanceIcon';
import YoutubeIconHeorAreaHomeTwo from '@/svg/home-2/YoutubeIconHeorAreaHomeTwo';

import Image from 'next/image';
import hero_img from "@/assets/img/new-img/hero/hero-4-1.png";

interface DataType {
  id: number;
  cls: string;
  link: string;
  icon: React.JSX.Element;
}

const footer_links: DataType[] = [
  {
    id: 1,
    cls: "gmail",
    link: "https://mail.gmail.com",
    icon: <HeroEmailIcon />,
  },
  {
    id: 2,
    cls: "dribble",
    link: "https://www.google.com",
    icon: <HeroGoogleIcon />,
  },
  {
    id: 3,
    cls: "behance",
    link: "https://www.behance.net",
    icon: <HeroBehanceIcon />,
  },
  {
    id: 4,
    cls: "youtube",
    link: "https://www.youtube.com",
    icon: <YoutubeIconHeorAreaHomeTwo />,
  },
]



const HeroAreaHomeFour = () => {

  // paralax
  useEffect(() => {
    const allParalax = document.querySelectorAll('.parallax-wrap');
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const ratio = 0.1;
    let active = false;

    allParalax.forEach(function (e) {
      e.addEventListener('mousemove', mouseMoveBtn);
    });

    function mouseMoveBtn(e: any) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      mouse.x = e.pageX;
      mouse.y = e.pageY - scrollTop;
    }

    gsap.ticker.add(updatePosition);

    function updatePosition() {
      pos.x += (mouse.x - pos.x) * ratio;
      pos.y += (mouse.y - pos.y) * ratio;
    }

    document.querySelectorAll('.parallax-wrap').forEach((element) => {
      element.addEventListener('mouseenter', (e) => {
        gsap.to(element, { duration: 0.3, scale: 2 });
        gsap.to(Array.from(element.children), { duration: 0.3, scale: 0.5 });
        active = true;
      });

      element.addEventListener('mouseleave', (e) => {
        gsap.to(element, { duration: 0.3, scale: 1 });
        gsap.to(Array.from(element.children), { duration: 0.3, scale: 1, x: 0, y: 0 });
        active = false;
      });

      element.addEventListener('mousemove', (e) => {
        parallaxCursorBtn(e, element, 2);
        callParallaxBtn(e, element);
      });
    });

    function callParallaxBtn(e: any, parent: any) {
      parallaxItBtn(e, parent, parent.querySelector('.parallax-element'), 20);
    }

    function parallaxItBtn(e: any, parent: any, target: any, movement: any) {
      const boundingRect = parent.getBoundingClientRect();
      const relX = e.pageX - boundingRect.left;
      const relY = e.pageY - boundingRect.top;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      gsap.to(target, {
        duration: 0.3,
        x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
        y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.height * movement,
        ease: Power2.easeOut,
      });
    }

    function parallaxCursorBtn(e: any, parent: any, movement: any) {
      const rect = parent.getBoundingClientRect();
      const relX = e.pageX - rect.left;
      const relY = e.pageY - rect.top;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
      pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2 - scrollTop) / movement;
    }

    const moveSection = document.querySelector('.tp-mouse-move-section');
    const moveSectionElements = document.querySelectorAll('.tp-mouse-move-element');

    if (moveSection && moveSectionElements) {
      moveSection.addEventListener('mousemove', (e: any) => {
        const x = e.clientX;
        const y = e.clientY;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const center = viewportWidth / 2;
        const centerHeight = innerHeight / 2;

        if (x > center) {
          gsap.to(moveSectionElements, {
            x: 20,
            duration: 2,
            ease: 'power4.out',
          });
        } else {
          gsap.to(moveSectionElements, {
            x: -20,
            scale: 1.1,
            duration: 2,
            ease: 'power4.out',
          });
        }

        if (y > centerHeight) {
          gsap.to(moveSectionElements, {
            y: 5,
            duration: 2,
            ease: 'power4.out',
          });
        } else {
          gsap.to(moveSectionElements, {
            y: -5,
            duration: 2,
            ease: 'power4.out',
          });
        }
      });
    }
  }, []);

  return (
    <>
      <div className="tp-hero-4-area tp-hero-4-height black-bg-5 tp-hero-4-overlay fix cursor-style">
        <div className="tp-hero-social-wrapper tp-hero-social-wrapper-2 d-none d-xxl-block">
          <span className="tp-hero-social-bar"></span>
          <div className="tp-hero-social">
            {footer_links.map((item, index) => (
              <div key={index} className="parallax-wrap">
                <div className="parallax-element">
                  <Link className={item.cls} href={item.link} target="_blank">
                    {item.icon}
                  </Link>
                </div>
              </div>
            ))}

          </div>
          <span className="tp-hero-social-bar tp-hero-social-bar-2"></span>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="tp-hero-4-thumb-wrapper">
                <span className="overlay"></span>
                <div className="tp-hero-4-thumb text-center" data-lag="0.7" data-speed="auto">
                  <Image src={hero_img} alt="image-here" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-hero-4-title-box z-index-5 text-center" data-lag="0.5" data-stagger="0.08">
                <h2 className="tp-hero-4-title">World <span className="p-relative">Photography<i
                  className="text-1">of</i></span><br />
                  <em className="p-relative"><i className="text-2">the</i>YEARs</em>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroAreaHomeFour;