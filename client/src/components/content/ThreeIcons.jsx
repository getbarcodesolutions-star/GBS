import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import courierIcon from '/assets/images/courier.png'
import onlinePaymenticon from '/assets/images/online-payment.png'
import supportIcon from '/assets/images/supportIcon.png'

const ThreeIcons = () => {
  const containerRef = useRef(null)
  const playedRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll('.icon-card')
    const texts = container.querySelectorAll('.icon-text')

    gsap.set(cards, { opacity: 0, y: 100 })
    gsap.set(texts, { opacity: 0, y: 20 })

    const tl = gsap.timeline({ paused: true })
    tl.to(cards, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.22,
    }).to(
      texts,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.12,
      },
      '-=0.6'
    )

    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !playedRef.current) {
          playedRef.current = true
          setTimeout(() => tl.play(), 50)
        }
      })
    }

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.05,
    })

    observer.observe(container)

    return () => {
      observer.disconnect()
      tl.kill()
      gsap.killTweensOf(cards)
      gsap.killTweensOf(texts)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='bg-white shadow-xl flex flex-wrap justify-center items-center gap-6 py-8 px-4 md:px-12 overflow-hidden'
    >
      {/* --- Card 1 --- */}
      <div
        className='icon-card flex bg-[#C1E8FF] rounded-2xl items-center 
                   p-4 md:p-5 lg:p-6
                   w-[90%] sm:w-[80%] md:w-[45%] lg:w-[30%] 
                   max-w-[400px] min-h-[130px]'
      >
        <div className='flex justify-center items-center w-[25%]'>
          <img
            className='object-contain h-12 md:h-16 lg:h-25'
            src={courierIcon}
            alt=''
          />
        </div>
        <div className='flex flex-col justify-center ml-3 items-start'>
          <h1 className='icon-text text-xl md:text-2xl lg:text-3xl text-neutral-900 font-bold md:tracking-wide tracking-widest'>
            Free Shipping
          </h1>
          <p className='icon-text text-sm md:text-base font-extralight text-neutral-800'>
            Free shipping for order above ₹1999.
          </p>
        </div>
      </div>

      {/* --- Card 2 --- */}
      <div
        className='icon-card flex bg-[#C1E8FF] rounded-2xl items-center 
                   p-4 md:p-5 lg:p-6 
                   w-[90%] sm:w-[80%] md:w-[45%] lg:w-[30%] 
                   max-w-[400px] min-h-[130px]'
      >
        <div className='flex justify-center items-center w-[25%]'>
          <img
            className='object-contain h-12 md:h-16 lg:h-25'
            src={onlinePaymenticon}
            alt=''
          />
        </div>
        <div className='flex flex-col justify-center ml-3 items-start'>
          <h1 className='icon-text text-xl md:text-2xl lg:text-3xl text-neutral-900 font-bold md:tracking-wide tracking-widest'>
            Flexible Payment
          </h1>
          <p className='icon-text text-sm md:text-base font-extralight text-neutral-800'>
            Multiple secure payment options.
          </p>
        </div>
      </div>

      {/* --- Card 3 --- */}
      <div
        className='icon-card flex bg-[#C1E8FF] rounded-2xl items-center 
                   p-4 md:p-5 lg:p-6 
                   w-[90%] sm:w-[80%] md:w-[45%] lg:w-[30%] 
                   max-w-[400px] min-h-[130px]'
      >
        <div className='flex justify-center items-center w-[25%]'>
          <img
            className='object-contain h-12 md:h-16 lg:h-25'
            src={supportIcon}
            alt=''
          />
        </div>
        <div className='flex flex-col justify-center ml-3 items-start'>
          <h1 className='icon-text text-xl md:text-2xl lg:text-3xl text-neutral-900 font-bold md:tracking-wide tracking-widest'>
            Online Support
          </h1>
          <p className='icon-text text-sm md:text-base font-extralight text-neutral-800'>
            We support online all days.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ThreeIcons
