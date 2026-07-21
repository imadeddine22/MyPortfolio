

import {gsap} from 'gsap'
import {WebGL} from "@/plugins"

const testTest = () => {
  if (typeof window !== 'undefined') {

    const showcaseSwiper = new Swiper('#showcase-slider', {
      direction: "horizontal",
      loop: true,
      slidesPerView: 'auto',
      touchStartPreventDefault: false,
      speed: 1000,
      effect: 'fade',
      autoplay: {
        delay: 5000
      },
      mousewheel: true,
      simulateTouch: true,
      navigation: {
        clickable: true,
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
      pagination: {
        el: '.tp-slider-dot',
        clickable: true,
        renderBullet: function (index, className) {
          return '<div class="' + className + '"></div>';
        },
      },
      on: {
        slidePrevTransitionStart: function () {

          $('.tp-slider-dot').find('.swiper-pagination-bullet').each(function () {
            if (!$(this).hasClass("swiper-pagination-bullet-active")) {
              $('#trigger-slides .swiper-slide-active').find('div').first().each(function () {
                if (!$(this).hasClass("active")) {
                  $(this).trigger('click');
                }
              });

              $('#trigger-slides .swiper-slide-duplicate-active').find('div').first().each(function () {
                if (!$(this).hasClass("active")) {
                  $(this).trigger('click');
                }
              });
            }
          });

        },
        slideNextTransitionStart: function () {

          $('.tp-slider-dot').find('.swiper-pagination-bullet').each(function () {
            if (!$(this).hasClass("swiper-pagination-bullet-active")) {
              $('#trigger-slides .swiper-slide-active').find('div').first().each(function () {
                if (!$(this).hasClass("active")) {
                  $(this).trigger('click');
                }
              });

              $('#trigger-slides .swiper-slide-duplicate-active').find('div').first().each(function () {
                if (!$(this).hasClass("active")) {
                  $(this).trigger('click');
                }
              });
            }
          });

        }
      },
    });

    var vertex = 'varying vec2 vUv; void main() {  vUv = uv;  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );	}';
    var fragment = `
			varying vec2 vUv;
		
			uniform sampler2D currentImage;
			uniform sampler2D nextImage;
			uniform sampler2D disp;
			uniform float dispFactor;
			uniform float effectFactor;
			uniform vec4 resolution;
		
			void main() {
		
				vec2 uv = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
		
				vec4 disp = texture2D(disp, uv);
				vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
				vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
				vec4 _currentImage = texture2D(currentImage, distortedPosition);
				vec4 _nextImage = texture2D(nextImage, distortedPosition2);
				vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);
		
				gl_FragColor = finalTexture; }
		
			`;

    var gl_canvas = new WebGL({
      vertex: vertex,
      fragment: fragment,
    });

    var addEvents = function () {

      var triggerSlide = Array.from(document.getElementById('trigger-slides').querySelectorAll('.slide-wrap'));
      gl_canvas.isRunning = false;

      triggerSlide.forEach((el) => {

        el.addEventListener('click', function () {

          if (!gl_canvas.isRunning) {

            gl_canvas.isRunning = true;

            document.getElementById('trigger-slides').querySelectorAll('.active')[0].className = '';
            this.className = 'active';

            var slideId = parseInt(this.dataset.slide, 10);

            gl_canvas.material.uniforms.nextImage.value = gl_canvas.textures[slideId];
            gl_canvas.material.uniforms.nextImage.needsUpdate = true;

            gsap.to(gl_canvas.material.uniforms.dispFactor, {
              duration: 1,
              value: 1,
              ease: 'Sine.easeInOut',
              onComplete: function () {
                gl_canvas.material.uniforms.currentImage.value = gl_canvas.textures[slideId];
                gl_canvas.material.uniforms.currentImage.needsUpdate = true;
                gl_canvas.material.uniforms.dispFactor.value = 0.0;
                gl_canvas.isRunning = false;
              }
            });

          }

        });

      });

    };

    addEvents();
  }
};

export default testTest;