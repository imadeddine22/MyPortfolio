
import { gsap } from "gsap"; 


export const cursorTest = async () => {

  if (typeof window !== 'undefined') {
    if (!document.body.classList.contains("is-mobile") && document.body.classList.contains("tp-magic-cursor")) {
      document.querySelectorAll(".tp-magnetic-item").forEach(function(item) {
        var wrapper = document.createElement('div');
        wrapper.classList.add('tp-magnetic-wrap');
        item.parentNode.insertBefore(wrapper, item);
        wrapper.appendChild(item);
        
        if (item.tagName.toLowerCase() === 'a') {
          item.classList.add('not-hide-cursor');
        }
      });
    
      var mouse = { x: 0, y: 0 }; // Cursor position
      var pos = { x: 0, y: 0 }; // Cursor position
      var ratio = 0.15; // delay follow cursor
      var active = false;
      var ball = document.getElementById("ball");
    
      var ballWidth = 34; // Ball default width
      var ballHeight = 34; // Ball default height
      var ballScale = 1; // Ball default scale
      var ballOpacity = 1; // Ball default opacity
      var ballBorderWidth = 2; // Ball default border width
    
      gsap.set(ball, {  // scale from middle and style ball
        xPercent: -50,
        yPercent: -50,
        width: ballWidth,
        height: ballHeight,
        borderWidth: ballBorderWidth,
        opacity: ballOpacity
      });
    
      document.addEventListener("mousemove", mouseMove);
    
      function mouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    
      gsap.ticker.add(updatePosition);
    
      function updatePosition() {
        if (!active) {
          pos.x += (mouse.x - pos.x) * ratio;
          pos.y += (mouse.y - pos.y) * ratio;
    
          gsap.set(ball, { x: pos.x, y: pos.y });
        }
      }
    
      document.querySelectorAll(".tp-magnetic-wrap").forEach(function(item) {
        item.addEventListener("mousemove", function(e) {
          parallaxCursor(e, this, 2); // magnetic ball = low number is more attractive
          callParallax(e, this);
        });
      });
    
      function callParallax(e, parent) {
        parallaxIt(e, parent, parent.querySelector(".tp-magnetic-item"), 25); // magnetic area = higher number is more attractive
      }
    
      function parallaxIt(e, parent, target, movement) {
        var boundingRect = parent.getBoundingClientRect();
        var relX = e.clientX - boundingRect.left;
        var relY = e.clientY - boundingRect.top;
    
        gsap.to(target, {
          duration: 0.3,
          x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
          y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
          ease: Power2.easeOut
        });
      }
    
      function parallaxCursor(e, parent, movement) {
        var rect = parent.getBoundingClientRect();
        var relX = e.clientX - rect.left;
        var relY = e.clientY - rect.top;
        pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
        pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
        gsap.to(ball, { duration: 0.3, x: pos.x, y: pos.y });
      }
    
      // Magnetic item hover.
      document.querySelectorAll(".tp-magnetic-wrap").forEach(function(item) {
        item.addEventListener("mouseenter", function(e) {
          gsap.to(ball, { duration: 0.3, scale: 2, borderWidth: 1, opacity: ballOpacity });
          active = true;
        });
    
        item.addEventListener("mouseleave", function(e) {
          gsap.to(ball, { duration: 0.3, scale: ballScale, borderWidth: ballBorderWidth, opacity: ballOpacity });
          gsap.to(this.querySelector(".tp-magnetic-item"), { duration: 0.3, x: 0, y: 0, clearProps: "all" });
          active = false;
        });
      });
    
      // Cursor view on hover (data attribute "data-cursor="...").
      document.querySelectorAll('[data-cursor]').forEach(function(item) {
        item.addEventListener("mouseenter", function() {
          ball.innerHTML = '<div class="ball-view">' + this.getAttribute("data-cursor") + '</div>';
          gsap.to(ball, { duration: 0.3, yPercent: -75, width: 95, height: 95, opacity: 1, borderWidth: 0, backgroundColor: "#FFF", zIndex: 1 });
          gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 });
        });
    
        item.addEventListener("mouseleave", function() {
          gsap.to(ball, { duration: 0.3, yPercent: -50, width: ballWidth, height: ballHeight, opacity: ballOpacity, borderWidth: ballBorderWidth, backgroundColor: "transparent" });
          gsap.to(".ball-view", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps: "all" });
          ball.querySelector(".ball-view").remove();
        });
    
        item.classList.add("not-hide-cursor");
      });
    
      // Hide on hover.
      document.querySelectorAll("a, button:not(.cursor-hide)").forEach(function(item) {
        item.addEventListener("mouseenter", function() {
          gsap.to(ball, { duration: 0.3, scale: 0, opacity: 0 });
        });
    
        item.addEventListener("mouseleave", function() {
          gsap.to(ball, { duration: 0.3, scale: ballScale, opacity: ballOpacity });
        });
      });
    
      // Hide on click.
      document.querySelectorAll("a:not([target='_blank']):not(.cursor-hide):not([href^='#']):not([href^='mailto']):not([href^='tel']):not(.lg-trigger):not(.tp-btn-disabled a)").forEach(function(item) {
        item.addEventListener('click', function() {
          gsap.to(ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
        });
      });
    
      // Show/hide on document leave/enter.
      document.addEventListener("mouseleave", function() {
        gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
      });
    
      document.addEventListener("mouseenter", function() {
        gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
      });
    
      // Show as the mouse moves.
      document.addEventListener("mousemove", function() {
        gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
      });
    }
    
  }



}