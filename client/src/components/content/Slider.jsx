import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { IoIosArrowForward } from "react-icons/io";
import slider1 from '/assets/images/slider1.png'
import slider2 from '/assets/images/slider2.png'
import slider3 from '/assets/images/slider3.png'
import slider4 from '/assets/images/slider4.png'

const Slider = () => {
  const [slideData] = useState([
    { id: 1, image:slider1 , text: "1" },
    { id: 2, image: slider2, text: "2" },
    { id: 3, image: slider3, text: "3" },
    { id: 4, image:slider4 , text: "4" },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0); // Start with first slide
  const slideRefs = useRef([]);
  const autoSlideRef = useRef(null);
  const trackRef = useRef(null);

  // Get responsive width for slides
  const getSlideWidths = () => {
    const width = window.innerWidth;
    if (width >= 2000) return 2300;
    else if (width >= 1500) return 1600;
    else if (width >= 1440) return 1600;
    else if (width >= 1024) return 880;
    else if (width >= 768) return 640;
    else return 280;
  };

  // Auto-slide every 4 seconds
  const startAutoSlide = () => {
    autoSlideRef.current = setInterval(() => {
      setCurrentIndex(prev =>
        prev === slideData.length - 1 ? 0 : prev + 1
      );
    }, 5000);
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideRef.current);
    startAutoSlide();
  };

  const rightToggle = () => {
    setCurrentIndex(prev =>
      prev === slideData.length - 1 ? 0 : prev + 1
    );
    resetAutoSlide();
  };

  const leftToggle = () => {
    setCurrentIndex(prev =>
      prev === 0 ? slideData.length - 1 : prev - 1
    );
    resetAutoSlide();
  };

  // Animate active/inactive slides
  const animateSlides = () => {
    const slideWidth = getSlideWidths();
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const isActive = index === currentIndex;

      // Set width same for all slides
      gsap.set(slide, { width: slideWidth });

      // Animate scale, opacity, and blur
      gsap.to(slide, {
        scale: isActive ? 1.05 : 0.95,
        opacity: isActive ? 1 : 0.3,
        filter: isActive ? "blur(0px)" : "blur(4px)",
        duration: 0.1,
        ease: "power3.out",
      });
    });

    // Move the track horizontally
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: -currentIndex * getSlideWidths(),
        duration: 0.1,
        ease: "power3.out",
      });
    }
  };

  useEffect(() => {
    animateSlides();
  }, [currentIndex]);

  // Start auto-slide
  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(autoSlideRef.current);
  }, []);

  // Adjust widths on resize
  useEffect(() => {
    const handleResize = () => {
      slideRefs.current.forEach(slide => {
        if (slide) gsap.set(slide, { width: getSlideWidths() });
      });
      animateSlides();
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // set widths initially
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  return (
    <div className="relative w-full bg-gradient-to-br from-[#7DA0CA] to-[#052695]/80 overflow-hidden justify-start lg:h-250 md:h-150 h-100 flex items-start">
      {/* Slide Track */}
      <div
        ref={trackRef}
        className="flex md:gap-3 gap-1 lg:ml-30 ml-5 transition-transform duration-500"
      >
        {slideData.map((item, index) => (
          <div
            key={item.id}
            ref={el => (slideRefs.current[index] = el)}
            className="lg:h-180 md:h-100 sm:h-70 h-50 bg-neutral-200 mt-10 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl font-bold transition-all duration-500"
          >
            <img className="h-full object-cover w-full rounded-xl" src={item.image} alt="" />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="absolute lg:bottom-35 bottom-15 w-full flex justify-center gap-10">
        <button
          onClick={leftToggle}
          className="bg-neutral-100 text-neutral-800 rounded-full lg:text-2xl text-xl lg:p-5 sm:p-4 p-3 cursor-pointer rotate-180"
        >
          <IoIosArrowForward />
          
        </button>
        <button
          onClick={rightToggle}
          className="bg-neutral-100 text-neutral-800 rounded-full lg:text-2xl text-xl lg:p-5 sm:p-4 p-3 cursor-pointer"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Slider;
