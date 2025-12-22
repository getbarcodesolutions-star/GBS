import React, { useState, useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import logo from "/assets/images/logo/main-logo.png";
import { NavLink } from 'react-router-dom'
import { ShopContext } from "../../context/ShopContext";


const Header = () => {
    const [isopen, setIsopen] = useState(false);
    const {cartCount
} = useContext(ShopContext)

    const headerRef = useRef(null);
    const navLinksRef = useRef([]);
    const iconLinksRef = useRef([]);
    const sidebarRef = useRef(null);
    const sidebarTl = useRef(null);

    function menuOpen() {
        setIsopen((prev) => !prev);
    }

    useEffect(() => {
        // Animate header on load
        gsap.fromTo(
            headerRef.current,
            { y: -80, opacity: 0},
            { y: 0, opacity: 1, duration: 1}
        );

        // Animate nav links (desktop)
        gsap.fromTo(
            navLinksRef.current,
            { y: -5, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
            }
        );

        // Animate icons (desktop)
        gsap.fromTo(
            iconLinksRef.current,
            { y: -5, opacity: 0 },
            {
                y: 0,
                opacity: 1,

                duration: 1,
            }
        );

        // Sidebar animation timeline (paused by default)
        sidebarTl.current = gsap.timeline({ paused: true });
        sidebarTl.current.fromTo(
            sidebarRef.current,
            { x: "100%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
        );

        sidebarTl.current.fromTo(
            sidebarRef.current.querySelectorAll("h1, svg"),
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.2,
                ease: "power3.out",
            },
            "-=0.3"
        );
    }, []);

    // Play/reverse sidebar animation
    useEffect(() => {
        if (isopen) {
            sidebarTl.current.play();
        } else {
            sidebarTl.current.reverse();
        }
    }, [isopen]);

    return (
        <>
            {/* Desktop Header */}
            <div
                ref={headerRef}
                className="h-17 z-10 select-none lg:flex hidden fixed top-0 bg-white/80 backdrop-blur-sm w-full items-center justify-between shadow-md"
            >
                {/* Logo */}
                <div className="ml-5">
                    <NavLink to={'/'}>
                        <img
                            className="h-18 rounded-lg cursor-pointer"
                            src={logo}
                            alt="logo"
                        />
                    </NavLink>
                </div>

                {/* Nav Links */}
                <div className="flex gap-10 text-xl text-zinc-600 font-semibold">
                    {[
                        { name: "Label", to: "/label" },
                        { name: "Ribbon", to: "/ribbon" },
                        { name: "Printer", to: "/printer" },
                        { name: "Contact", to: "/contact" },
                    ].map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.to}
                            ref={(el) => (navLinksRef.current[i] = el)}
                            className={({ isActive }) =>
                                `tracking-widest cursor-pointer transition-transform hover:scale-105 ${isActive ? "text-cyan-700" : "text-neutral-600"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                {/* Icons */}

                <div className="flex gap-5 mr-5 text-zinc-600">
                    {[
                        {
                            path: (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 
          0A7.5 7.5 0 1 0 5.196 
          5.196a7.5 7.5 0 0 0 10.607 
          10.607Z"
                                />
                            ),
                            link: "/search",
                        },
                        {
                            path: (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 10.5V6a3.75 
          3.75 0 1 0-7.5 0v4.5m11.356-1.993 
          1.263 12c.07.665-.45 1.243-1.119 
          1.243H4.25a1.125 1.125 0 0 
          1-1.12-1.243l1.264-12A1.125 
          1.125 0 0 1 5.513 7.5h12.974c.576 
          0 1.059.435 1.119 1.007ZM8.625 
          10.5a.375.375 0 1 1-.75 0 
          .375.375 0 0 1 .75 0Zm7.5 
          0a.375.375 0 1 1-.75 0 
          .375.375 0 0 1 .75 0Z"
                                />
                            ),
                            link: "/cart",
                            isCart: true, // 👈 identify cart icon
                        },
                        {
                            path: (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 
          3.75 0 1 1-7.5 0 3.75 3.75 
          0 0 1 7.5 0ZM4.501 20.118a7.5 
          7.5 0 0 1 14.998 0A17.933 
          17.933 0 0 1 12 21.75c-2.676 
          0-5.216-.584-7.499-1.632Z"
                                />
                            ),
                            link: "/login",
                        },
                    ].map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.link}
                            ref={(el) => (iconLinksRef.current[i] = el)}
                            className={({ isActive }) =>
                                `relative cursor-pointer transition-transform hover:scale-110 ${isActive ? "text-cyan-700" : "text-neutral-700"
                                }`
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                {item.path}
                            </svg>

                            {/* 👇 Dummy badge for cart icon only */}
                            {item.isCart && (
                                <h1 className="absolute top-4 -right-2 bg-neutral-900 text-white text-[10px] font-semibold rounded-full px-1.5">
                                    {cartCount}
                                </h1>
                            )}
                        </NavLink>
                    ))}
                </div>


            </div>

            {/* Mobile Header */}
            <div className="h-15 z-10  w-full lg:hidden flex justify-between items-center fixed top-0 bg-white/80 backdrop-blur-sm shadow-md">
                {/* Logo */}
                <div className="ml-5">
                    <NavLink to={'/'}>
                        <img onClick={() => setIsopen(false)} className="h-15" src={logo} alt="" />
                    </NavLink>
                </div>

                {/* Mobile Icons */}
                <div className="flex gap-4 mr-5 text-neutral-600">
                    {/* Search */}
                    <NavLink to={'/search'}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 
                            0A7.5 7.5 0 1 0 5.196 
                            5.196a7.5 7.5 0 0 0 10.607 
                            10.607Z"
                            />
                        </svg>
                    </NavLink>

                    {/* Toggle Menu */}
                    <h1 onClick={menuOpen} className="cursor-pointer">
                        {isopen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                            </svg>
                        )}
                    </h1>
                </div>
            </div>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className="fixed top-17 right-0 h-80 z-10 sm:w-70 w-50 rounded-md bg-neutral-300/90 backdrop-blur-md text-neutral-600 shadow-lg"
            >
                <div className="m-5 text-xl font-semibold tracking-widest flex flex-col gap-5">
                    <NavLink to={'/label'} onClick={() => setIsopen(false)}>
                        <h1 className="border-b p-1">Label</h1>
                    </NavLink>
                    <NavLink to={'/ribbon'} onClick={() => setIsopen(false)}>
                        <h1 className="border-b p-1">Ribbon</h1>
                    </NavLink>
                    <NavLink to={'/printer'} onClick={() => setIsopen(false)}>
                        <h1 className="border-b p-1">Printer</h1>
                    </NavLink>
                    <NavLink to={'/contact'} onClick={() => setIsopen(false)}>
                        <h1 className="border-b p-1">Contact</h1>
                    </NavLink>
                </div>

                <div className="flex gap-5 m-5 relative">
                    {/* Cart */}
                    <NavLink to={'/cart'} className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            onClick={() => setIsopen(false)}
                            stroke="currentColor"
                            className="size-7 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 
          3.75 0 1 0-7.5 0v4.5m11.356-1.993 
          1.263 12c.07.665-.45 1.243-1.119 
          1.243H4.25a1.125 1.125 0 0 
          1-1.12-1.243l1.264-12A1.125 
          1.125 0 0 1 5.513 7.5h12.974c.576 
          0 1.059.435 1.119 1.007ZM8.625 
          10.5a.375.375 0 1 1-.75 0 
          .375.375 0 0 1 .75 0Zm7.5 
          0a.375.375 0 1 1-.75 0 
          .375.375 0 0 1 .75 0Z"
                            />
                       

                         </svg>
                        {/* Cart count badge */}
                        <h1 
                        
                        className="absolute top-4 -right-2 bg-neutral-900 text-white text-[10px] font-semibold rounded-full px-1.5">
                            {cartCount}
                        </h1>
                    </NavLink>

                    {/* User */}
                    <NavLink to={'/login'}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            onClick={() => setIsopen(false)}
                            className="size-7 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 
          3.75 0 1 1-7.5 0 3.75 3.75 
          0 0 1 7.5 0ZM4.501 20.118a7.5 
          7.5 0 0 1 14.998 0A17.933 
          17.933 0 0 1 12 21.75c-2.676 
          0-5.216-.584-7.499-1.632Z"
                            />
                        </svg>
                    </NavLink>
                </div>


            </div>



        </>
    );
};

export default Header;
