import React from 'react'
import logo from '/assets/images/hero-img.png'
import easy from '/assets/images/made-easy.png'
import { NavLink } from 'react-router-dom'

const Heropage = () => {
    return (
        <>
            <div className='w-full h-auto '>
                <div className='relative h-auto'>
                    <div className='h-full w-full flex items-start absolute bg-black/60 z-1'>
                        <div className='h-auto select-none flex flex-col gap-2 w-auto md:ml-10 ml-3 lg:mt-30 mt-2'>
                            <h1
                                className='lg:text-9xl  sm:text-8xl text-4xl font-black -tracking-wider text-neutral-200'>
                                LABEL<br />SOLUTIONS
                            </h1>
                            <p className='text-neutral-300 lg:text-2xl sm:text-lg text-xs'>Precision printing that boosts productivity.</p>
                            <div className='lg:m-10 m-0'>
                                <NavLink to={'/label'}>
                                    <button className='lg:text-xl sm:wtext-md text-xs text-neutral-200 hover:text-neutral-400  tracking-widest border lg:px-10 sm:px-6 px-2 py-1 rounded-2xl cursor-pointer'>Shop now</button>
                                </NavLink>
                            </div>
                        </div>
                        <div className=' absolute flex flex-col justify-center items-center w-full sm:bottom-20 -bottom-4 h-auto'>
                            <div className='h-15 lg:w-100 w-70 flex justify-center'>
                                <img className="invert sm:h-15 h-5 brightness-200" src={easy} alt="" />
                            </div>
                            <div className="absolute left-1/2  sm:-bottom-10 bottom-0 -translate-x-1/2 h-0.5 lg:w-150 sm:w-80 w-40 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 mb-7"></div>                           
                        </div>                       
                    </div>
                    <img className='w-full lg:h-[93vh] md:h-120 sm:object-cover object-contain' src={logo} alt="" />
                </div>
            </div>
        </>
    )
}

export default Heropage
