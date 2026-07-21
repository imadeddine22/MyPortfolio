'use client';

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import React, { useEffect } from 'react';

import project_img_1 from '@/assets/img/home-05/project/project-2.jpg';
import project_img_2 from '@/assets/img/home-05/project/project-1.jpg';
import project_img_3 from '@/assets/img/home-05/project/project-1.1.jpg';
import project_img_4 from '@/assets/img/home-05/project/project-2.2.jpg';
import project_img_5 from '@/assets/img/home-05/project/project-1.3.jpg';
import project_img_6 from '@/assets/img/home-05/project/project-2.3.jpg';
import project_img_7 from '@/assets/img/home-05/project/project-1.4.jpg';
import project_img_8 from '@/assets/img/home-05/project/project-2.4.jpg';

interface DataType {
   id: number;
   title: string;
   subtitle: string;
   left_img: StaticImageData;
   right_img: StaticImageData;
}

const project_data: DataType[] = [
   {
      id: 1,
      title: 'Modelling',
      subtitle: 'Fashion & Life Style',
      left_img: project_img_1,
      right_img: project_img_2,
   },
   {
      id: 2,
      title: 'Acting',
      subtitle: 'Character',
      left_img: project_img_3,
      right_img: project_img_4,
   },
   {
      id: 3,
      title: 'Costume',
      subtitle: 'Cloth & Wearing',
      left_img: project_img_5,
      right_img: project_img_6,
   },
   {
      id: 4,
      title: 'Artist',
      subtitle: 'Creative Designer',
      left_img: project_img_7,
      right_img: project_img_8,
   },
]

const ProjectAreaHomeFive = () => {

   useEffect(() => {
      const handleMouseEnter = (event: MouseEvent) => {
         const titleBox = event.target as HTMLElement;
         const thumbWrap = document.getElementById('tp-project-5-thumb-wrap');
         if (thumbWrap) {
            thumbWrap.className = titleBox.getAttribute('rel') || '';
         }

         titleBox.classList.add('active');
         const siblings = Array.from(titleBox.parentNode?.children || []).filter(child => child !== titleBox);
         siblings.forEach(sibling => {
            (sibling as HTMLElement).classList.remove('active');
         });
      };

      const titleBoxes = document.querySelectorAll<HTMLElement>('.tp-project-5-title-wrap .tp-project-5-title-box');
      titleBoxes.forEach(titleBox => {
         titleBox.addEventListener("mouseenter", handleMouseEnter);
      });

      return () => {
         titleBoxes.forEach(titleBox => {
            titleBox.removeEventListener("mouseenter", handleMouseEnter);
         });
      };
   }, []);


   return (
      <>
         <div className="tp-project-5-area coffe-bg pb-140 z-index-1">
            <div className="container container-1350">
               <div className="row">
                  <div className="col-xl-12">
                     <div className="tp-project-5-section-box pb-130 d-flex justify-content-between align-items-center">
                        <span className="tp-project-5-section-subtitle">Sirvices</span>
                        <h4 className="tp-project-5-section-title">My extertise in this area</h4>
                        <Link className="tp-project-5-section-link" href="/portfolio">View more</Link>
                     </div>
                  </div>
               </div>
               <div className="tp-project-5-wrap p-relative">
                  <div className="row justify-content-center">
                     <div className="col-xl-4">
                        <div className="tp-project-5-title-wrap">
                           {project_data.map((item, i) => (
                              <div key={i} className={`tp-project-5-title-box text-center ${i === 1 ? 'active' : ''}`} rel={`tp-project-5-thumb-box-${item.id}`}>
                                 <h4 className="tp-project-5-title">
                                    <Link href="/portfolio-details-2">{item.title}</Link>
                                 </h4>
                                 <span>{item.subtitle}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div id="tp-project-5-thumb-wrap" className="tp-project-5-thumb-box-2">
                     {project_data.map((item, i) => (
                        <div key={i} className={`tp-project-5-thumb-box-${item.id} d-flex justify-content-between align-items-end`}>
                           <div className="tp-project-5-thumb thumb-1">
                              <Image src={item.left_img} alt="image-here" />
                           </div>
                           <div className="tp-project-5-thumb thumb-2">
                              <Image src={item.right_img} alt="image-here" />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ProjectAreaHomeFive;