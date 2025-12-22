import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { NavLink } from 'react-router-dom'

const Gridpage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".grid-card");

    // Initial state
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

    // Observer to trigger animation only when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.2,
            });
            observer.disconnect(); // run once
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="bg-white select-none flex justify-center-safe items-center xl:gap-10 sm:gap-5 gap-2  w-full xl:h-220 lg:h-180 md:h-140 h-100"
      >
        <NavLink to={'/label'} >
          <div className="grid-card relative xl:h-200  lg:h-150 md:h-100 h-80 xl:w-150 lg:w-100 md:w-80 w-37 
        xl:bg-[url(/assets/images/labelsrolls.png)] 
        lg:bg-[url(/assets/images/labelsrolls2.png)] 
        md:bg-[url(/assets/images/labelsrolls3.png)] 
        bg-[url(/assets/images/labelsrolls4.png)]         
        shadow-xl rounded-2xl">
            <div className="absolute top-0 bg-black/50 h-full w-full rounded-2xl">
              <div className="lg:m-5 sm:m-3 m-2 bg-white  w-fit md:p-2 p-1 rounded-xl">
                <h1 className="lg:text-3xl sm:text-2xl text-lg  text-[#7DA0CA] font-semibold tracking-widest">
                  100+
                  <span className="text-neutral-800 tracking-wide "> Items</span>
                </h1>
              </div>
              <div className="lg:m-5 sm:m-3 m-2 md:p-2 p-1">
                <h1 className="xl:text-5xl text-neutral-50 lg:text-4xl text-3xl font-semibold tracking-widest">
                  Labels
                </h1>
              </div>
              <div className="md:text-lg sm:text-md text-xs tracking-tight lg:m-5 sm:m-3 m-2 flex flex-col gap-2">
                <p className="md:w-40 w-17 font-bold text-neutral-100 tracking-wider">
                  Print anything
                </p>
                <p className="lg:w-80 sm:w-40 text-neutral-100 w-35 tracking-wide">
                  Barcode • Product Code • Item ID • SKU • UPC • QR Code • Track Me •  Scan for Info
                </p>
              </div>
            </div>
          </div>
        </NavLink>

        <div className="xl:h-200 lg:h-150 md:h-100 h-80 xl:w-150 lg:w-100 md:w-80 w-37 flex flex-col lg:gap-10 sm:gap-5 gap-2">
          <NavLink to={'/ribbon'} className={'w-full h-full'}>
            <div className="relative grid-card bg-neutral-200 shadow-xl  w-full h-full rounded-2xl
           xl:bg-[url(/assets/images/ribbonsroll.png)] 
        lg:bg-[url(/assets/images/ribbonsroll2.png)] 
        md:bg-[url(/assets/images/ribbonsroll3.png)] 
        bg-[url(/assets/images/ribbonsroll4.png)] 
          ">
              <div className="absolute top-0 lg:bg-black/20 bg-black/40 h-full w-full rounded-2xl">
                <div className="lg:m-5 sm:m-3 m-2 bg-white w-fit md:p-2 p-1 rounded-xl">
                  <h1 className="lg:text-3xl sm:text-2xl text-xs  text-[#7DA0CA] font-semibold tracking-widest">
                    100+
                    <span className="text-neutral-800 tracking-widest"> Items</span>
                  </h1>
                </div>
                <div className="lg:m-5 sm:m-3 ml-2 md:p-2">
                  <h1 className="xl:text-5xl lg:text-4xl sm:text-3xl lg:text-neutral-800 text-neutral-50 text-xl font-semibold tracking-widest">
                    Ribbons
                  </h1>
                </div>
              </div>
            </div>
          </NavLink>

<NavLink to={'/printer'} className={'w-full h-full'}>


          <div className="relative grid-card bg-neutral-200 shadow-xl  w-full h-full rounded-2xl
           xl:bg-[url(/assets/images/printers1.png)] 
           lg:bg-[url(/assets/images/printers2.png)] 
           md:bg-[url(/assets/images/printers3.png)] 
           
        bg-[url(/assets/images/printers4.png)] 
          ">
            <div className="absolute top-0 lg:bg-black/20 bg-black/40 h-full w-full rounded-2xl">
              <div className="lg:m-5 sm:m-3 m-2 bg-white w-fit md:p-2 p-1 rounded-xl">
                <h1 className="lg:text-3xl sm:text-2xl text-xs  text-[#7DA0CA] font-semibold tracking-widest">
                  100+
                  <span className="text-neutral-800 tracking-widest"> Items</span>
                </h1>
              </div>
              <div className="lg:m-5 sm:m-3 ml-2 md:p-2">
                <h1 className="xl:text-5xl lg:text-4xl sm:text-3xl lg:text-neutral-800 text-neutral-50 text-xl font-semibold tracking-widest">
                  Printers
                </h1>
              </div>
            </div>
          </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Gridpage;
