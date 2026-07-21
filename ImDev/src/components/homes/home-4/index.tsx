"use client";
import React, { useEffect } from "react";

import TextSlide from "./TextSlide";
import VideoHomeFour from "./VideoHomeFour";
import HeroAreaHomeFour from "./HeroAreaHomeFour";
import AboutAreaHomeFour from "./AboutAreaHomeFour";
import HeaderFive from "@/layouts/headers/HeaderFive";
import GalleryAreaHomeFour from "./GalleryAreaHomeFour";
import ProjectAreaHomeFour from "./ProjectAreaHomeFour";
import ServiceAreaHomeFour from "./ServiceAreaHomeFour";
import FooterFive from "@/layouts/footers/FooterFive";
import PriceAreaHomeFour from "./PriceAreaHomeFour";

const HomeFourMain = () => {

  return (
    <div id="body" className="tp-magic-cursor">

      <HeaderFive />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="fix">
            <HeroAreaHomeFour />
            <ProjectAreaHomeFour />
            <ServiceAreaHomeFour />
            <TextSlide />
            <AboutAreaHomeFour />
            <VideoHomeFour />
            <PriceAreaHomeFour />
            <GalleryAreaHomeFour />
          </main>
          <FooterFive />
        </div>
      </div>
    </div>
  );
};

export default HomeFourMain;
