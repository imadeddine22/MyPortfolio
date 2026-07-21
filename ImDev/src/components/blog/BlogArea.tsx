import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import blog_data from '@/data/BlogData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Scrollbar } from 'swiper/modules';
import Link from 'next/link';
import { API_URL } from '@/utils/api';

// Default avatar fallback
import default_avatar from "@/assets/img/users/avata-1.png";

const BlogArea = () => {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalItems, setTotalItems] = useState<number[]>([]);
  const [rawBlogs, setRawBlogs] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs?limit=100`);
        const resData = await response.json();
        if (response.ok && resData.success && resData.data.length > 0) {
          const blogs = resData.data;
          setRawBlogs(blogs);

          // Group blogs by category
          const groups: Record<string, any[]> = {};
          blogs.forEach((blog: any) => {
            const cat = blog.category || 'General';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(blog);
          });

          // Format to match original data structure
          const formattedData = Object.keys(groups).map((catName) => {
            const catBlogs = groups[catName];
            const sliders = catBlogs.slice(0, 3).map((b) => ({
              id: b._id,
              slug: b.slug,
              title: b.title,
              img: b.coverImage,
              avatar_img: default_avatar,
              name: b.author || 'Imad',
              degination: 'Author',
              tag: catName,
              date: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              time: '4 Min Read'
            }));

            const article_data = catBlogs.map((b) => ({
              id: b._id,
              slug: b.slug,
              img: b.coverImage,
              tag_1: catName,
              tag_2: b.tags?.[0] || 'Tech',
              title: b.title,
              avatar: default_avatar,
              name: b.author || 'Imad',
              time: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            }));

            return {
              category: catName,
              sliders,
              article_data
            };
          });

          setItems(formattedData);
          setCategories(formattedData.map((d) => d.category));
          setTotalItems(formattedData.map((d) => d.article_data.length));
          if (formattedData.length > 0) {
            setActiveCategory(formattedData[0].category);
          }
        } else {
          loadStaticData();
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        loadStaticData();
      }
    };

    const loadStaticData = () => {
      setItems(blog_data);
      setCategories(blog_data.map((item) => item.category));
      setTotalItems(blog_data.map((p) => p.article_data.length));
      if (blog_data.length > 0) {
        setActiveCategory(blog_data[0].category);
      }
    };

    fetchBlogs();
  }, []);

  const filterItems = (cateItem: string) => {
    setActiveCategory(cateItem);
  };

  return (
    <>
      <div className="blog-list__area blog-list__ptb fix black-bg-3">
        <div className="container">
          <div className="row">
            <div className="blog-list__title-box">
              <span className="blog-list__subtitle tp-char-animation">Insights</span>
              <h4 className="blog-list__title tp-char-animation">Discover Articles and Guides to Help You.</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="blog-list__tab-wrap">
                <div className="blog-list__tab-btn">
                  <ul className="nav nav-tab" id="myTab" role="tablist">
                    {categories.map((item, index) => (
                      <li key={index} className="nav-item" role="presentation">
                        <button className={`nav-links ${activeCategory === item ? "active" : ""}`}
                          onClick={() => filterItems(item)}
                          id={`${item}-tab`} data-bs-toggle="tab"
                          data-bs-target={`#${item}-tab-pane`} type="button" role="tab"
                          aria-controls={`${item}-tab-pane`} aria-selected={activeCategory === item ? true : false}>
                          <span>{item}</span>
                          [{totalItems[index] || 0}]
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tab-content" id="myTabContent">
                  {items.map((item, i) => (
                    <div key={i} className={`tab-pane fade ${activeCategory === item.category ? 'show active' : ''}`} id={`${item.category}-tab-pane`} role="tabpanel"
                      aria-labelledby={`${item.category}-tab`} tab-index={0}>
                      <div className="blog-list__slider-main">
                        <div className="blog-list__slider-wrap mb-80">
                          <Swiper
                            modules={[Navigation,Scrollbar]}
                            {...slider_setting}

                            className="swiper-container blog-list__slider-active p-relative">
                            <div className="blog-list__scrollbar"></div>
                            <div className="swiper-wrapper">
                              {item.sliders?.map((slider, index) => (
                                <SwiperSlide key={index} className="blog-list__slider-item">
                                  <div className="row align-items-center">
                                    <div className="col-xl-8">
                                      <div className="blog-list__slider-title-box">
                                        <h4 className="blog-list__slider-title">
                                          <Link href="blog-details-2" dangerouslySetInnerHTML={{ __html: slider.title }}>
                                          </Link>
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="blog-list__author-wrap mb-20">
                                    <div className="row align-items-end">
                                      <div className="col-xl-3 col-lg-3 col-md-4 mb-20">
                                        <div
                                          className="blog-list__author-info d-flex align-items-center">
                                          <div className="blog-list__author-avata">
                                            <img src={typeof slider.avatar_img === 'string' ? slider.avatar_img : slider.avatar_img?.src}
                                              alt="image-here" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                          </div>
                                          <div className="blog-list__author-details">
                                            <h4 className="blog-list__author-title">{slider.name}</h4>
                                            <span>{slider.degination}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-xl-6 col-lg-6 col-md-8 mb-20">
                                        <div className="blog-list__meta-box text-start text-lg-center">
                                          <span className="category">{slider.tag}</span>
                                          <span>{slider.date}</span>
                                          <span>{slider.time}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-xl-12">
                                      <div className="blog-list__slider-thumb">
                                        <img src={typeof slider.img === 'string' ? slider.img : slider.img?.src} style={{height: 'auto', width: '100%', objectFit: 'cover'}} alt="image-here" />
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))}


                            </div>
                            <div className="blog-list__arrow-box d-none d-md-block">
                              <button className="blog-list__arrow-next"><i
                                className="fa-solid fa-angle-left"></i></button> {' '}
                              <button className="blog-list__arrow-prev"><i
                                className="fa-solid fa-angle-right"></i></button>
                            </div>
                          </Swiper>
                        </div>

                        <div className="blog-list__wrapper">
                          <div className="row gx-50">
                            {item.article_data?.map((article, index) => (
                              <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                                <div className="blog-list__sm-item mb-60 pb-30">
                                  <div className="blog-list__sm-thumb">
                                    <Link href="/blog-details-2">
                                      <img src={typeof article.img === 'string' ? article.img : article.img?.src} style={{height: 'auto', width: '100%', objectFit: 'cover'}} alt="image-here" />
                                    </Link>
                                  </div>
                                  <div className="blog-list__sm-category">
                                    <span>{article.tag_1}</span> {' '}
                                    <span>{article.tag_2}</span>
                                  </div>
                                  <div className="blog-list__sm-title-box">
                                    <h4 className="blog-list__sm-title">
                                      <Link href="/blog-details-2">
                                        {article.title}
                                      </Link>
                                    </h4>
                                  </div>
                                  <div className="blog-list__sm-author d-flex align-items-center">
                                    <div className="blog-list__sm-author-avata">
                                      <img src={typeof article.avatar === 'string' ? article.avatar : article.avatar?.src} alt="image-here" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="blog-list__sm-author-content">
                                      <h4>{article.name}</h4>
                                      <span dangerouslySetInnerHTML={{ __html: article.time }}></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="blog-list__btn text-center">
                          <a className="tp-btn-black-lg" href="#">Load more<span><i
                            className="fa-sharp fa-regular fa-arrow-right"></i></span></a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

    </>
  );
};

export default BlogArea;