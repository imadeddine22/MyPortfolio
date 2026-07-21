 'use client';

 import Link from 'next/link';
 import Image, { StaticImageData } from 'next/image';
import project_img_1 from "@/assets/img/new-img/project/project-4-1.jpg";
import project_img_2 from "@/assets/img/new-img/project/project-4-2.jpg";
import project_img_3 from "@/assets/img/new-img/project/project-4-3.jpg";
import project_img_4 from "@/assets/img/new-img/project/project-4-4.jpg";
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';

interface DataType {
  subtitle_1: string;
  subtitle_2: string;
  project_data: {
      img: StaticImageData;
      title: string;
  }[];
}

const project_content: DataType = {
  subtitle_1: 'Scroll to Explore',
  subtitle_2: 'Selected Case Studies (04)',
  project_data: [
    {
      img: project_img_1,
      title: `Brand promotion`,
    },
    {
      img: project_img_2,
      title: `Commercial`,
    },
    {
      img: project_img_3,
      title: `Wedding`,
    },
    {
      img: project_img_4,
      title: `Portrait`,
    },

  ]
}
const { subtitle_1, subtitle_2, project_data } = project_content


const ProjectAreaHomeFour = () => {
  const {handleMouseEnter,handleMouseLeave} = useContext(AppContext);
  return (
    <>
      <div className="tp-project-4-area black-bg-5 pb-200 cursor-style">
        <div className="container container-1760">
          <div className="tp-project-4-top-wrap mb-70">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-sm-6">
                <div className="tp-project-4-text">
                  <span>{subtitle_1}</span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-sm-6">
                <div className="tp-project-4-text text-start text-sm-end">
                  <span>{subtitle_2}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-project-4-wrapper">
            <div className="tp-project-4-inner-wrap" > 
              {project_data.map((item, i) => (
                <div key={i} className="tp-project-4-item">
                  <div className="tp-project-4-thumb not-hide-cursor" data-cursor="View<br>Demo" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Link className="cursor-hide" href="/portfolio-details-3">
                      <Image src={item.img} alt="image-here" />
                    </Link>
                  </div>
                  <div className="tp-project-4-content">
                    <h4 className="tp-project-4-title">
                      <Link href="/portfolio-details-3">{item.title}</Link>
                      </h4>
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

export default ProjectAreaHomeFour;