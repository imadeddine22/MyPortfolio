
'use client';

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

import portfolio_img_1 from "@/assets/img/home-05/project-2/project-1.jpg";
import portfolio_img_2 from "@/assets/img/home-05/project-2/project-2.jpg";
import portfolio_img_3 from "@/assets/img/home-05/project-2/project-3.jpg";
import portfolio_img_4 from "@/assets/img/home-05/project-2/project-4.jpg";
import portfolio_img_5 from "@/assets/img/home-05/project-2/project-5.jpg";
import portfolio_img_6 from "@/assets/img/home-05/project-2/project-6.jpg";


interface DataType {
  items: {
    id: number;
    img: StaticImageData;
    date: string;
    title: string;
    cls: string;
  }[];
}


const portfolio_data: DataType[] = [
  {
    items: [
      {
        id: 1,
        img: portfolio_img_1,
        date: `Modelling - 2024`,
        title: `Hannah & John`,
        cls: `col-xxl-3 col-xl-4 col-lg-6`,

      },
      {
        id: 2,
        img: portfolio_img_2,
        date: `Modelling - 2024`,
        title: `Siyantika  Glory`,
        cls: `col-xxl-6 col-xl-6 col-lg-6`,

      },
    ]
  },
  {
    items: [
      {
        id: 3,
        img: portfolio_img_3,
        date: `Modelling - 2024`,
        title: `Out of this world`,
        cls: `col-xxl-6 col-xl-6 col-lg-6`,

      },
      {
        id: 4,
        img: portfolio_img_4,
        date: `Modelling - 2024`,
        title: `Album cover`,
        cls: `col-xxl-3 col-xl-4 col-lg-5`,

      },
    ]
  },
  {
    items: [
      {
        id: 5,
        img: portfolio_img_5,
        date: `Modelling - 2024`,
        title: `The Smiths`,
        cls: `col-xxl-3 col-xl-4 col-lg-6`,

      },
      {
        id: 6,
        img: portfolio_img_6,
        date: `Modelling - 2024`,
        title: `Digital Paintings`,
        cls: `col-xxl-6 col-xl-6 col-lg-6`,

      },
    ]
  },

]

const PortfolioAreaHomeFive = () => {


  return (
    <>
      <div className="tp-project-5-2-area pt-120 pb-130 coffe-bg z-index-1">
        <div className="container container-1790">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-project-5-2-title-box mb-170 text-center">
                <h4 className="tp-project-5-2-title">Portfolio</h4>
              </div>
            </div>
          </div>
          <div className="tp-project-5-2-wrap z-index-1">
            {portfolio_data.map((items, i) => (
              <div key={i} className="tp-project-5-2-item-wrap">
                <div className="row align-items-center justify-content-between">
                  {items.items.map((item, index) => (
                    <div key={index} className={`col-md-6 ${item.cls}`}>
                      <Link className="cursor-hide" href="/portfolio-details-2">
                        <div className="tp-project-5-2-item not-hide-cursor" data-cursor="View<br>Demo">
                          <div className="tp-project-5-2-thumb">
                            <Image src={item.img} alt="image-here" />
                          </div>
                          <div className="tp-project-5-2-content">
                            <span>{item.date}</span>
                            <h4 className="tp-project-5-2-title-sm">{item.title}</h4>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
            }

          </div>
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="tp-project-5-2-btn text-center p-relative">
                <div className="tp-project-5-2-shape d-none d-lg-block">
                  <span>
                    <svg width="205" height="209" viewBox="0 0 205 209" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.9992 110.499C79.4994 235.001 90.4995 23.4983 192.778 88.2089" stroke="#CFC292" strokeWidth="1.5" />
                      <path d="M191.52 76.8785C188.858 81.4883 190.33 87.3118 194.811 89.8989" stroke="#CFC292" strokeWidth="1.5" strokeMiterlimit="10" />
                      <path d="M194.814 89.8969C190.333 87.3098 184.553 88.9466 181.892 93.5563" stroke="#CFC292" strokeWidth="1.5" strokeMiterlimit="10" />
                    </svg>
                  </span>
                </div>
                <Link href="/portfolio">
                  SEE MORE PROJECTS
                  <span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 13L13 1" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 1H13V13" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioAreaHomeFive;