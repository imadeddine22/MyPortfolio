'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';
import { API_URL } from '@/utils/api';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Sparkles, 
  FolderKanban
} from 'lucide-react';

interface ProjectType {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  gallery?: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveDemo?: string;
  technologies?: string[];
  featured?: boolean;
  createdAt?: string;
}

export default function DynamicPortfolioDetails({ id }: { id: string }) {
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_URL}/projects/${id}`);
        const resData = await res.json();
        if (res.ok && resData.success && resData.data) {
          setProject(resData.data);
        } else {
          setError(resData.message || 'Project not found');
        }
      } catch (err) {
        console.error('Error fetching project details:', err);
        setError('Failed to load project details. Please check your network connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const getFullImageUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const backendHost = API_URL.replace('/api', '');
    return `${backendHost}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const formatExternalUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  const liveLink = formatExternalUrl(project?.liveUrl || project?.liveDemo);
  const githubLink = formatExternalUrl(project?.githubUrl);
  const coverImg = getFullImageUrl(project?.coverImage);

  return (
    <>
      <HeaderOne />
      <div
        id="smooth-wrapper"
        className="tp-page-wrapper theme-bg"
        style={{
          backgroundImage: `url(/assets/img/bg/distort-bg.png)`,
          minHeight: '100vh',
          backgroundAttachment: 'fixed',
        }}
      >
        <div id="smooth-content">
          <main style={{ paddingTop: '140px', paddingBottom: '100px' }}>
            <div className="container">
              {/* Back Button */}
              <div style={{ marginBottom: '35px' }}>
                <Link
                  href="/#portfolio"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 600,
                    padding: '10px 18px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '30px',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#B1D61E';
                    e.currentTarget.style.borderColor = 'rgba(177, 214, 30, 0.4)';
                    e.currentTarget.style.transform = 'translateX(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <ArrowLeft size={18} />
                  <span>Back to Portfolio</span>
                </Link>
              </div>

              {/* Loading State */}
              {loading && (
                <div
                  style={{
                    padding: '120px 20px',
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      border: '3px solid rgba(177, 214, 30, 0.2)',
                      borderTopColor: '#B1D61E',
                      borderRadius: '50%',
                      margin: '0 auto 20px',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px' }}>
                    Loading project details...
                  </p>
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              )}

              {/* Error State */}
              {!loading && (error || !project) && (
                <div
                  style={{
                    padding: '80px 30px',
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '24px',
                    border: '1px solid rgba(220, 53, 69, 0.2)',
                    maxWidth: '600px',
                    margin: '0 auto',
                  }}
                >
                  <div
                    style={{
                      fontSize: '50px',
                      marginBottom: '15px',
                    }}
                  >
                    📂
                  </div>
                  <h2 style={{ color: '#fff', fontSize: '26px', marginBottom: '12px' }}>
                    Project Not Found
                  </h2>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '25px', lineHeight: '1.6' }}>
                    {error || "The project you are looking for doesn't exist or has been removed."}
                  </p>
                  <Link
                    href="/#portfolio"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#B1D61E',
                      color: '#0d1b0f',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    Explore Projects
                  </Link>
                </div>
              )}

              {/* Project Content */}
              {!loading && project && (
                <div>
                  {/* Title & Header Section */}
                  <div style={{ marginBottom: '40px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap',
                        marginBottom: '15px',
                      }}
                    >
                      <span
                        style={{
                          background: 'rgba(177, 214, 30, 0.15)',
                          color: '#B1D61E',
                          border: '1px solid rgba(177, 214, 30, 0.3)',
                          padding: '6px 16px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: 700,
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Sparkles size={14} />
                        Featured Project
                      </span>
                      {project.createdAt && (
                        <span
                          style={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '14px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <Calendar size={15} />
                          {new Date(project.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                          })}
                        </span>
                      )}
                    </div>

                    <h1
                      style={{
                        color: '#ffffff',
                        fontSize: 'calc(28px + 1.5vw)',
                        fontWeight: 800,
                        lineHeight: '1.2',
                        marginBottom: '20px',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {project.title}
                    </h1>
                  </div>

                  {/* Main Banner Image */}
                  {coverImg && (
                    <div
                      style={{
                        width: '100%',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        marginBottom: '60px',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                        background: 'rgba(0,0,0,0.2)',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={coverImg}
                        alt={project.title}
                        style={{
                          width: '100%',
                          maxHeight: '650px',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}

                  {/* Main Grid: Content & Sidebar */}
                  <div className="row g-5">
                    {/* Left Column: Description & Gallery */}
                    <div className="col-lg-8">
                      {/* About The Project Card */}
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '24px',
                          padding: '40px',
                          marginBottom: '40px',
                          backdropFilter: 'blur(20px)',
                        }}
                      >
                        <h3
                          style={{
                            color: '#B1D61E',
                            fontSize: '14px',
                            fontWeight: 700,
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            marginBottom: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <FolderKanban size={16} /> About The Project
                        </h3>
                        <h2
                          style={{
                            color: '#ffffff',
                            fontSize: '24px',
                            fontWeight: 700,
                            marginBottom: '25px',
                            lineHeight: '1.3',
                          }}
                        >
                          Overview & Implementation
                        </h2>
                        <div
                          style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '16px',
                            lineHeight: '1.8',
                            whiteSpace: 'pre-line',
                          }}
                        >
                          {project.description}
                        </div>
                      </div>

                      {/* Gallery (if available) */}
                      {project.gallery && project.gallery.length > 0 && (
                        <div style={{ marginBottom: '40px' }}>
                          <h3
                            style={{
                              color: '#ffffff',
                              fontSize: '22px',
                              fontWeight: 700,
                              marginBottom: '25px',
                            }}
                          >
                            Project Gallery
                          </h3>
                          <div className="row g-4">
                            {project.gallery.map((imgUrl, idx) => (
                              <div key={idx} className="col-md-6">
                                <div
                                  style={{
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    height: '240px',
                                  }}
                                >
                                  <img
                                    src={imgUrl}
                                    alt={`Gallery image ${idx + 1}`}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                      transition: 'transform 0.5s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Sidebar Specs & Links */}
                    <div className="col-lg-4">
                      <div
                        style={{
                          position: 'sticky',
                          top: '120px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '24px',
                          padding: '32px',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        }}
                      >
                        <h3
                          style={{
                            color: '#ffffff',
                            fontSize: '20px',
                            fontWeight: 700,
                            marginBottom: '25px',
                            paddingBottom: '15px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          Project Details
                        </h3>

                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div style={{ marginBottom: '30px' }}>
                            <label
                              style={{
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontSize: '13px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                display: 'block',
                                marginBottom: '12px',
                                fontWeight: 600,
                              }}
                            >
                              Technologies & Tools
                            </label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {project.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  style={{
                                    background: 'rgba(177, 214, 30, 0.1)',
                                    color: '#B1D61E',
                                    border: '1px solid rgba(177, 214, 30, 0.25)',
                                    padding: '6px 14px',
                                    borderRadius: '100px',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Links & CTA */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          {liveLink && (
                            <a
                              href={liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                background: '#B1D61E',
                                color: '#0d1b0f',
                                padding: '15px 20px',
                                borderRadius: '14px',
                                fontWeight: 700,
                                fontSize: '15px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 10px 20px rgba(177, 214, 30, 0.2)',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 15px 25px rgba(177, 214, 30, 0.35)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(177, 214, 30, 0.2)';
                              }}
                            >
                              <span>Visit Live Project</span>
                              <ExternalLink size={18} />
                            </a>
                          )}

                          {githubLink && (
                            <a
                              href={githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                color: '#ffffff',
                                padding: '14px 20px',
                                borderRadius: '14px',
                                fontWeight: 600,
                                fontSize: '15px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                              }}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                <path d="M9 18c-4.51 2-5-2-7-2"></path>
                              </svg>
                              <span>Source Code</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
          <FooterOne />
        </div>
      </div>
    </>
  );
}
