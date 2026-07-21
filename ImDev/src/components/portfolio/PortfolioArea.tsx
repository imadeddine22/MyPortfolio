'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { API_URL } from '@/utils/api';

interface ProjectType {
  _id: string;
  title: string;
  coverImage: string;
  technologies: string[];
}

const PortfolioArea = () => {
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

  useEffect(() => {
    /* portfolio animation start */
    gsap.set('.tp-portfolio-bg-text', {
      x: '25%'
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.tp-portfolio-bg-text-animation',
        start: '-500 0%',
        end: 'bottom -10%',
        scrub: true,
        invalidateOnRefresh: true
      }
    })
      .to('.tp-portfolio-bg-text', {
        x: '-80%'
      });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.portfolio-list-scroll-text-animation',
        start: '-500 0%',
        end: 'bottom -10%',
        scrub: true,
        invalidateOnRefresh: true
      }
    })
      .to('.portfolio-list-scroll-text', {
        x: '-80%'
      });

  }, []);

  // Split projects into two columns dynamically
  const blog_data_1 = projects.filter((_, index) => index % 2 === 0);
  const blog_data_2 = projects.filter((_, index) => index % 2 !== 0);

  return (
    <>
      <div className="porfolio-inner__thumb-wrapper tp-portfolio-effect portfolio-list-scroll-text-animation p-relative fix black-bg-3 pt-80 pb-50"
        data-scrub="0.0001">
        <div className="portfolio-list-scroll-text pb-80 d-flex align-items-center">
          <p>Latest Project</p>
          <p>Latest Project</p>
        </div>
        <div className="container">
          {loading ? (
            <div className="row">
              <div className="col-12 text-center">
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Loading projects...</p>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <div className="row">
              <div className="col-12 text-center py-5">
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>No projects found. Add some from the admin dashboard!</p>
              </div>
            </div>
          ) : (
            <div className="row grid gx-90">
              <div className="col-xl-6 grid-item">
                <div className="tp-portfolio-item-wrapper">
                  {blog_data_1.map((item, index) => (
                    <div key={item._id} className="tp-portfolio-item mb-70">
                      <Link href={`/portfolio-details/${item._id}`}>
                        <div className="tp-portfolio-thumb img-1 w-img fix">
                          <div className="tp-portfolio-thumb-img include-bg d-none"
                            style={{ backgroundImage: `url(${item.coverImage})` }}></div>
                          <div className="tp-portfolio-thumb-img">
                            <img data-speed="0.85" style={{ height: 'auto', width: '100%', objectFit: 'cover' }} src={item.coverImage} alt={item.title} />
                          </div>
                        </div>
                        <div className="tp-portfolio-content">
                          <h3 className="tp-portfolio-title">{item.title}</h3>
                          <div className="tp-portfolio-meta d-flex align-items-center">
                            <span className="tp-portfolio-meta-count">0{index * 2 + 1}</span>
                            <span className="tp-portfolio-meta-arrow">
                              <svg width="42" height="13" viewBox="0 0 42 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M35.4889 1L41 6.33338L35.4889 11.6667" stroke="currentColor"
                                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M0.999998 6.33179H41" stroke="currentColor" strokeWidth="1.5"
                                  strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <div className="tp-portfolio-meta-hover">
                              <span>{item.technologies?.[0] || 'Website'}</span>
                              <span className="tp-portfolio-meta-link">View Project</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-xl-6 grid-item">
                <div className="tp-portfolio-item-wrapper">
                  {blog_data_2.map((item, index) => (
                    <div key={item._id} className="tp-portfolio-item mb-70">
                      <Link href={`/portfolio-details/${item._id}`}>
                        <div className="tp-portfolio-thumb img-4 w-img fix">
                          <div className="tp-portfolio-thumb-img include-bg d-none" style={{ backgroundImage: `url(${item.coverImage})` }}></div>
                          <div className="tp-portfolio-thumb-img">
                            <img data-speed="0.85" style={{ height: 'auto', width: '100%', objectFit: 'cover' }} src={item.coverImage} alt={item.title} />
                          </div>
                        </div>
                        <div className="tp-portfolio-content">
                          <h3 className="tp-portfolio-title">{item.title}</h3>
                          <div className="tp-portfolio-meta d-flex align-items-center">
                            <span className="tp-portfolio-meta-count">0{index * 2 + 2}</span>
                            <span className="tp-portfolio-meta-arrow">
                              <svg width="42" height="13" viewBox="0 0 42 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M35.4889 1L41 6.33338L35.4889 11.6667" stroke="currentColor"
                                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M0.999998 6.33179H41" stroke="currentColor" strokeWidth="1.5"
                                  strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <div className="tp-portfolio-meta-hover">
                              <span>{item.technologies?.[0] || 'Website'}</span>
                              <span className="tp-portfolio-meta-link">View Project</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PortfolioArea;