"use client";
import { useEffect } from "react";
import { animationCreate } from "@/utils/utils";
import { throwableAnimation } from "@/utils/throwableAnimation";
import ScrollToTop from "@/components/common/ScrollToTop";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
 

import animationTitle from "@/utils/animationTitle";
import animationTitleChar from "@/utils/animationTitleChar";
import servicesPanel from "@/utils/servicesPanel";
import PortfolioPanel from "@/utils/PortfolioPanel";
import blogAnimation from "@/utils/blogAnimation";
import linesAnimation from "@/utils/linesAnimation";
import { buttonAnimation } from "@/utils/buttonAnimation";
import { scrollSmother } from "@/utils/scrollSmother";
import { scrollTextAnimation } from "@/utils/scrollTextAnimation";
import textInvert from "@/utils/textInvert";
import ContextProvider from "@/context/app-context";

import {
  ScrollSmoother,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
} from "@/plugins";
import AnimateMouse from "@/components/common/animated-mouse";
gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin, SplitText);

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

const Wrapper = ({ children }: any) => {
  const pathname = usePathname();

  useEffect(() => {
    // animation
    const timer = setTimeout(() => {
      animationCreate();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      ScrollSmoother.create({
        smooth: 1.35,
        effects: true,
        smoothTouch: false,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });
    }
  }, []);

  useEffect(() => {
    // sticky section
    if (typeof window !== "undefined") {
      let mm = gsap.matchMedia();
      mm.add("(min-width: 1199px)", () => {
        ScrollTrigger.create({
          trigger: ".tp-port-3-area",
          start: "top -60%",
          end: "bottom 120%",
          pin: ".tp-port-3-content-left",
          pinSpacing: false,
        });
      });
    }
  }, []);

  useEffect(() => {
    throwableAnimation();
    servicesPanel();
    PortfolioPanel();
    animationTitle();
    animationTitleChar();
    blogAnimation();
    linesAnimation();
    buttonAnimation();
    scrollSmother();
    scrollTextAnimation();
    textInvert();
  }, [pathname]);

  return (
    <ContextProvider>
      {children}
      <ToastContainer position="top-right" />
      <AnimateMouse/>
      <ScrollToTop />
    </ContextProvider>
  );
};

export default Wrapper;
