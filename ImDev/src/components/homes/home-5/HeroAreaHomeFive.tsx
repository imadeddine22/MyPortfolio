

import Link from 'next/link';
import React from 'react';

const HeroAreaHomeFive = () => {
  return (
    <>
      <div className="tp-hero-5-area coffe-bg p-relative">
        <div className="container container-1760">
          <div className="tp-hero-5-bdr-left tp-hero-5-ptb">
            <div className="row">
              <div className="col-xxl-3 tp-hero-5-thumb-wrap">
                <div className="tp-hero-5-thumb-wrap">
                  <div className="tp-hero-5-thumb-content">
                    <p>
                      <span>01</span> <br />
                      I fell in love <br /> with modelling.
                    </p>
                  </div>
                  <div className="tp-hero-5-thumb-sm">
                    <img src="assets/img/home-05/hero/hero-1.jpg" alt="image-here" data-speed="auto" />
                  </div>
                </div>
              </div>
              <div className="col-xxl-9">
                <div className="tp-hero-5-title-box z-index-5 mb-120">
                  <h4 className="tp-hero-5-title tp-split-text tp-split-in-right"><span>Hello</span> <br /> I’m diego</h4>
                  <p className="tp-split-text tp-split-in-right">A Creative Fashion Designer</p>
                  <Link className="tp-btn-cream-bdr" href="/portfolio">See portfolio</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-hero-5-big-thumb">
          <img src="assets/img/home-05/hero/hero-2.jpg" alt="image-here" />
        </div>
      </div>
    </>
  );
};

export default HeroAreaHomeFive;