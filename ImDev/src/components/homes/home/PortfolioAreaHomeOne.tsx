'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/utils/api';

import UpArrowIconPortfolio from '@/svg/home/PortfolioIcons/UpArrowIconPortfolio';
import RitghtArrowIconPortfolio from '@/svg/home/PortfolioIcons/RitghtArrowIconPortfolio';

interface ProjectType {
  _id: string;
  title: string;
  coverImage: string;
  technologies: string[];
}

const PortfolioAreaHomeOne = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);
        const resData = await response.json();
        if (response.ok && resData.success) {
          setProjects(resData.data || []);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="tp-portfolio-area pt-100 pb-100 text-center">
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Loading projects...</p>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="tp-portfolio-area pt-100 pb-100 text-center">
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>
          No projects added yet. Add projects from the admin dashboard!
        </p>
      </section>
    );
  }

  const firstProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <>
      <section className="tp-portfolio-area tp-btn-trigger-2 p-relative z-index-1 pt-280 pb-40 fix">
        <div className="tp-portfolio-top-text tp-portfolio-bg-text d-flex align-items-center tp-portfolio-bg-text-animation">
          <p>Latest projects</p>
          <p>Latest projects</p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="tp-portfolio-wrapper pr-30 pt-55">
                <div className="tp-section-title-wrapper mb-60">
                  <div className="tp-section-title-inner tp_title_anim p-relative">
                    <span className="tp-section-subtitle tp-portfolio-subtitle">Project</span>
                    <h3 className="tp-section-title tp_title_anim">Latest projects</h3>
                  </div>
                </div>
                <div className="tp-portfolio-item-wrapper">
                  <div className="tp-portfolio-item mb-70">
                    <Link href={`/portfolio-details/${firstProject._id}`}>
                      <div className="tp-portfolio-thumb img-1 w-img fix ">
                        <div className="tp-portfolio-thumb-img include-bg d-none"
                          style={{ backgroundImage: `url(${firstProject.coverImage})` }}></div>
                        <div className="tp-portfolio-thumb-img ">
                          <img data-speed="0.85" style={{ objectFit: 'cover', height: "auto", width: '100%' }} src={firstProject.coverImage} alt={firstProject.title} />
                        </div>
                      </div>
                      <div className="tp-portfolio-content">
                        <h3 className="tp-portfolio-title">{firstProject.title}</h3>
                        <div className="tp-portfolio-meta d-flex align-items-center">
                          <span className="tp-portfolio-meta-count">01</span>
                          <span className="tp-portfolio-meta-arrow">
                            <RitghtArrowIconPortfolio />
                          </span>
                          <div className="tp-portfolio-meta-hover">
                            <span>{firstProject.technologies?.[0] || 'Website'}</span>
                            <span className="tp-portfolio-meta-link">View Project</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="tp-portfolio-more tp-hover-btn-wrapper tp-btn-bounce-2 d-none d-lg-block">
                  <Link href="/portfolio"
                    className="tp-hover-btn tp-hover-btn-item tp-btn-circle-2 d-flex align-items-center justify-content-center flex-column">
                    <span className="tp-btn-circle-text-2">
                      Explore <br /> All Project
                      <span className="tp-btn-circle-arrow-2">
                        <UpArrowIconPortfolio />
                      </span>
                    </span>
                    <i className="tp-btn-circle-dot"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="tp-portfolio-item-wrapper pl-50">
                {otherProjects.map((item, i) => {
                  const projectIndex = i + 2;
                  const formattedIndex = projectIndex < 10 ? `0${projectIndex}` : `${projectIndex}`;
                  return (
                    <div key={item._id} className="tp-portfolio-item mb-70">
                      <Link href={`/portfolio-details/${item._id}`}>
                        <div className="tp-portfolio-thumb img-2 w-img fix">
                          <div className="tp-portfolio-thumb-img include-bg d-none"
                            style={{ backgroundImage: `url(${item.coverImage})`, height: "auto" }}></div>
                          <div className="tp-portfolio-thumb-img">
                            <img data-speed="0.85" style={{ height: "auto", width: '100%' }} src={item.coverImage} alt={item.title} />
                          </div>
                        </div>
                        <div className="tp-portfolio-content">
                          <h3 className="tp-portfolio-title">{item.title}</h3>
                          <div className="tp-portfolio-meta d-flex align-items-center">
                            <span className="tp-portfolio-meta-count">{formattedIndex}</span>
                            <span className="tp-portfolio-meta-arrow">
                              <RitghtArrowIconPortfolio />
                            </span>
                            <div className="tp-portfolio-meta-hover">
                              <span>{item.technologies?.[0] || 'Website'}</span>
                              <span className="tp-portfolio-meta-link">View Project</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })} 
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioAreaHomeOne;