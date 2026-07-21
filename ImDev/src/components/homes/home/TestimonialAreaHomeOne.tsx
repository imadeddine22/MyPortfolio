'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Slider from 'react-slick';
import quote from "@/assets/img/testimonial/quote.svg";
import { toast } from 'react-toastify';

import user_avatar_1 from "@/assets/img/users/user-1.jpg";
import user_avatar_2 from "@/assets/img/users/avata-1.png";
import user_avatar_3 from "@/assets/img/users/avata-2.png";
import user_avatar_4 from "@/assets/img/users/avata-3.png";
 
import StartIcon from '@/svg/icons/StartIcon';
import { gsap } from 'gsap';
import { API_URL } from '@/utils/api';



interface DataType {
  subtitle: string;
  title: string;
  info: string;
  testimonial_slider_data: {
    id: number;
    rating_text: string;
    description: string;
  }[];
  testimonial_nav_data: {
    id: number;
    img: StaticImageData;
    name: string;
    designation: string;
    company: string;
  }[];
}


const testimonial_content: DataType = {
  subtitle: "Testimonials",
  title: "What clients say",
  info: "Rated 4.9 out of 5 based on client feedback",
  testimonial_slider_data: [
     {
    id: 1,
    rating_text: "5.0 Rating",
    description: `"Imad was fantastic to work with — he delivered a clean, scalable website ahead of schedule and guided us through every step."`,
  },
  {
    id: 2,
    rating_text: "5.0 Rating",
    description: `"Professional, detail-oriented, and reliable. Our site now runs faster and smoother than ever thanks to his full-stack web expertise."`,
  },
  {
    id: 3,
    rating_text: "5.0 Rating",
    description: `"Great communication and technical skills. He transformed our concept into a modern, responsive website with a robust backend."`,
  },
  {
    id: 4,
    rating_text: "5.0 Rating",
    description: `"Highly recommend! Imad combines creativity with strong coding skills — our website project exceeded expectations."`,
  }
  ],
  testimonial_nav_data: [
    {
      id: 1,
      img: user_avatar_1,
      name: "Sarah Johnson",
      designation: "Project Manager at",
      company: "TechNova",
    },
    {
      id: 2,
      img: user_avatar_2,
      name: "David Kim",
      designation: "CTO at",
      company: "StartupHub",
    },
    {
      id: 3,
      img: user_avatar_3,
      name: "Emma Wilson",
      designation: "Product Owner at",
      company: "InnovateX",
    },
    {
      id: 4,
      img: user_avatar_4,
      name: "James Carter",
      designation: "CEO at",
      company: "BrightSolutions",
    }
  ]
}


const { subtitle, title, info, testimonial_slider_data, testimonial_nav_data } = testimonial_content


// slider a
const slider_a = {
  dots: false,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};
// slider b
const slider_b = {
  dots: false,
  arrows: false,
  centerPadding: "0px",
  slidesToShow: 3,
  slidesToScroll: 1,
  focusOnSelect: true,
  centerMode: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};


// =============================================
// Review Form Component
// =============================================
const ReviewForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || rating === 0) {
      toast.error("Please fill in all fields and select a rating.");
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: name,
          email,
          comment: message,
          rating,
          avatar: gender === 'female' ? '/assets/img/users/avata-2.png' : '/assets/img/users/avata-1.png',
        }),
      });

      const resData = await response.json();

      if (response.ok) {
        toast.success(resData.message || "Thank you! Your review has been submitted.");
        setName('');
        setEmail('');
        setMessage('');
        setRating(0);
        setGender('male');
        setNameFocused(false);
        setEmailFocused(false);
        setMessageFocused(false);
      } else {
        toast.error(resData.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '50px 50px',
      backdropFilter: 'blur(10px)',
    }}>
      {/* Star Rating */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '12px', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Your Rating
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              style={{
                cursor: 'pointer',
                fontSize: '32px',
                color: star <= (hoveredRating || rating) ? '#B1D61E' : 'rgba(255,255,255,0.2)',
                transition: 'color 0.2s ease, transform 0.2s ease',
                transform: star <= (hoveredRating || rating) ? 'scale(1.15)' : 'scale(1)',
                display: 'inline-block',
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Gender Selection */}
      <div style={{ marginBottom: '35px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '14px', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Select Your Avatar Gender
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {/* Male Option */}
          <div
            onClick={() => setGender('male')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 15px',
              borderRadius: '12px',
              background: gender === 'male' ? 'rgba(177,214,30,0.08)' : 'transparent',
              border: gender === 'male' ? '2px solid #B1D61E' : '2px solid rgba(255,255,255,0.04)',
              transition: 'all 0.2s ease',
              width: '90px'
            }}
          >
            <img
              src="/assets/img/users/avata-1.png"
              alt="Male Avatar"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: gender === 'male' ? '2px solid #B1D61E' : '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s'
              }}
            />
            <span style={{ fontSize: '12px', fontWeight: 600, color: gender === 'male' ? '#B1D61E' : 'rgba(255,255,255,0.4)' }}>Male</span>
          </div>

          {/* Female Option */}
          <div
            onClick={() => setGender('female')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 15px',
              borderRadius: '12px',
              background: gender === 'female' ? 'rgba(177,214,30,0.08)' : 'transparent',
              border: gender === 'female' ? '2px solid #B1D61E' : '2px solid rgba(255,255,255,0.04)',
              transition: 'all 0.2s ease',
              width: '90px'
            }}
          >
            <img
              src="/assets/img/users/avata-2.png"
              alt="Female Avatar"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: gender === 'female' ? '2px solid #B1D61E' : '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s'
              }}
            />
            <span style={{ fontSize: '12px', fontWeight: 600, color: gender === 'female' ? '#B1D61E' : 'rgba(255,255,255,0.4)' }}>Female</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row gx-20">
          {/* Name */}
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="postbox__comment-input mb-35">
              <input
                type="text"
                className="inputText"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setNameFocused(true)}
                onBlur={(e) => { if (!e.target.value) setNameFocused(false); }}
              />
              <span className={`floating-label ${nameFocused || name ? 'floating-label-floated' : ''}`}>
                Your Name
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="postbox__comment-input mb-35">
              <input
                type="email"
                className="inputText"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={(e) => { if (!e.target.value) setEmailFocused(false); }}
              />
              <span className={`floating-label ${emailFocused || email ? 'floating-label-floated' : ''}`}>
                Your Email
              </span>
            </div>
          </div>

          {/* Message */}
          <div className="col-xxl-12">
            <div className="postbox__comment-input mb-30">
              <textarea
                className="textareaText"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setMessageFocused(true)}
                onBlur={(e) => { if (!e.target.value) setMessageFocused(false); }}
                rows={5}
              />
              <span className={`floating-label-2 ${messageFocused || message ? 'floating-label-floated' : ''}`}>
                Your Review
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-xxl-12" style={{ textAlign: 'center', marginTop: '10px' }}>
            <button type="submit" className="tp-btn-white-lg">
              <span>
                <i>Submit Review</i>
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};


const TestimonialAreaHomeOne = ({ style }: any) => { 

  const bg_img = style ? null : "/assets/img/bg/distort-bg.png"

  useEffect(() => {
    let testi_Line_1 = document.querySelectorAll('.tp-testimonial-user-border');

    testi_Line_1.forEach((line, index) => {
      gsap.set(line, {
        width: 0
      });
      gsap.to(line, {
        scrollTrigger: {
          trigger: '.tp-testimonial-user-border',
          start: 'top 90%',
          end: "bottom 80%",
          markers: false,
        },
        width: "100%"
      });
    });

  })


  const [slider1, setSlider1] = useState<Slider | null>(null);
  const [slider2, setSlider2] = useState<Slider | null>(null);
  const sliderRef = useRef<Slider | null>(null);

  const [dbTestimonials, setDbTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/testimonials`);
        const resData = await response.json();
        if (response.ok && resData.success && resData.data.length > 0) {
          setDbTestimonials(resData.data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  const hasDb = dbTestimonials.length > 0;

  const displaySliderData = hasDb ? dbTestimonials.map((t, idx) => ({
    id: idx + 1,
    rating_text: `${t.rating}.0 Rating`,
    rating: t.rating,
    description: t.comment
  })) : testimonial_slider_data;

  const displayNavData = hasDb ? dbTestimonials.map((t, idx) => ({
    id: idx + 1,
    img: t.avatar,
    name: t.clientName,
    designation: t.email || (t.position ? `${t.position} @` : 'Client @'),
    company: t.email ? '' : t.company
  })) : testimonial_nav_data;

  const numItems = displayNavData.length;

  const slider_a_settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: numItems > 1,
    autoplay: numItems > 1,
    autoplaySpeed: 4000,
    speed: 1000,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
  };

  const slider_b_settings = {
    dots: false,
    arrows: false,
    centerPadding: "0px",
    slidesToShow: Math.min(3, numItems),
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: numItems >= 3,
    infinite: numItems > 1,
    speed: 1000,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(2, numItems),
          centerMode: numItems >= 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };


  return (
    <>
      <section style={{ backgroundImage: `url(${bg_img})` }} className={`tp-testimonial-area ${style ? 'sv-inner__customize pb-160 black-bg-3' : 'theme-bg tp-bg-light pb-80'} pt-25`}>
        <div className="container">
          {style ? null :
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-testimonial-section-title">
                  <div className="tp-section-title-wrapper tp_text_anim mb-50 text-center">
                    <div className="tp-section-title-inner tp_title_anim p-relative">
                      <span className="tp-section-subtitle">{subtitle}</span>
                      <h3 className="tp-section-title">{title}</h3>
                    </div>
                    <p>{info}</p>
                  </div>
                </div>
              </div>
            </div>
          }

          <div className="row">
            <div className="col-xl-12">
              <div className="tp-testimonial-slider ml-70 mr-70">

                <Slider
                  {...slider_a_settings}
                  asNavFor={slider2 as Slider}
                  ref={(slider) => {
                    setSlider1(slider);
                    sliderRef.current = slider;
                  }}
                  className="tp-testimonial-slider-active swiper-container"
                >
                  {displaySliderData.map((item: any, i) => (
                    <div key={i} className="swiper-slide">
                      <div className="tp-testimonial-item theme-bg-2"
                        style={{ backgroundImage: 'url(/assets/img/testimonial/bg-distort.png)' }}>
                      <div className="tp-testimonial-quote">
                        <Image src={quote} alt="image-here" />
                      </div>
                      <div className="tp-testimonial-item-top d-flex align-items-center">

                        <div className="tp-testimonial-rating" style={{ display: 'flex', gap: '2px' }}>
                          {Array.from({ length: item.rating || 5 }).map((_, starIdx) => (
                            <StartIcon key={starIdx} />
                          ))}
                        </div>

                        <p>{item.rating_text}</p>
                      </div>
                      <div className="tp-testimonial-content">
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                  ))}
                </Slider>



                <div className="tp-testimonial-thumb-slider">

                  <Slider
                    {...slider_b_settings}
                    asNavFor={slider1 as Slider}
                    ref={(slider) => setSlider2(slider)}
                    className="tp-testimonial-nav swiper-container"
                  >
                    {displayNavData.map((item: any, index: number) => (
                      <div key={index} className="swiper-slide">
                        <div
                          className="tp-testimonial-user-item d-flex justify-content-center align-items-center">
                          <div className="tp-testimonial-user-thumb">
                            <img src={typeof item.img === 'string' ? item.img : item.img?.src} alt="image-here" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                          </div>
                          <div className="tp-testimonial-user-content">
                            <h3 className="tp-testimonial-user-title">{item.name}</h3>
                            <span className="tp-testimonial-user-designation">{item.designation}
                              <a href="#"> {item.company}</a></span>
                          </div>
                          <span className="tp-testimonial-user-border"></span>
                        </div>
                      </div>
                    ))}
                  </Slider>

                </div>
              </div>
            </div>
          </div>

          {/* ===== Leave a Review Form ===== */}
          {!style && (
            <div className="row mt-80">
              <div className="col-xl-12">
                <div className="tp-testimonial-section-title text-center mb-50">
                  <div className="tp-section-title-inner tp_title_anim p-relative">
                    <span className="tp-section-subtitle">Your Opinion</span>
                    <h3 className="tp-section-title">Leave a Review</h3>
                  </div>
                  <p>Share your experience working with me — your feedback means a lot!</p>
                </div>
              </div>
              <div className="col-xl-10 offset-xl-1">
                <ReviewForm />
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default TestimonialAreaHomeOne;