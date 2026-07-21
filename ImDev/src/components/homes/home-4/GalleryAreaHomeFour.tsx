
import React from 'react';
import Image from 'next/image';

import insta_img_1 from '@/assets/img/new-img/instagram/insta-1.jpg';
import insta_img_2 from '@/assets/img/new-img/instagram/insta-2.jpg';
import insta_img_3 from '@/assets/img/new-img/instagram/insta-3.jpg';
import insta_img_4 from '@/assets/img/new-img/instagram/insta-4.jpg';
import insta_img_5 from '@/assets/img/new-img/instagram/insta-5.jpg';

const gallery_data = [
  insta_img_1,
  insta_img_2,
  insta_img_3,
  insta_img_4,
  insta_img_5,
]

const GalleryAreaHomeFour = () => {
  return (
    <>
      <div className="tp-insta-4-area black-bg-5 pt-120 cursor-style">
        <div className="row justify-content-center">
          <div className="col-xl-3 col-lg-4">
            <div className="tp-insta-4-title-box text-center mb-60">
              <h4 className="tp-insta-4-title">FOLLOW ME ON INSTAGRAM <span>@Diego</span></h4>
            </div>
          </div>
        </div>
        <div className="row gx-0 row-cols-xl-5 row-cols-lg-5 row-cols-md-3 row-cols-sm-2">
          {gallery_data.map((item, index) => (
            <div key={index} className="col-xl">
              <div className="tp-insta-4-thumb fix">
                <a className="hide-cursor" href="#">
                  <Image src={item} style={{ width: '100%', height: '100%' }} alt="image-here" />
                </a>
              </div>
            </div>
          ))} 

        </div>
      </div>
    </>
  );
};

export default GalleryAreaHomeFour;