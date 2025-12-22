import React from "react";
import { NavLink } from "react-router-dom";
import logoWhite from "/assets/images/logo/main-logo-whiteBG.png";

// react-icons
import { AiOutlineEnvironment, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function Footer({
    company = "Get Barcode Solutions",
    tagline = "Precision printing that boosts productivity.",
    address = "GF-15, Sanskruti Avenue, Nr. Canara Bank, NH 48, Killa-pardi, Gujarat 396125",
    phone = "+91 9978 96 9978",
    email = "getbarcodesolutions@gmail.com",
    quickLinks = [
        { label: "Home", to: "/" },
        { label: "Labels", to: "/label" },
        { label: "Ribbons", to: "/ribbon" },
        { label: "Printer", to: "/printer" },
        { label: "Contact", to: "/contact" },
    ],
}) {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#06324d]/80 tracking-wide text-neutral-100 py-12">
            <div className="max-w-7xl mx-auto px-6">

                {/* TOP ROW - FLEX */}
                <div className="flex flex-wrap gap-10">

                    {/* LEFT SECTION */}
                    <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col gap-5">

                        {/* Brand */}
                        <div className="flex flex-col items-start gap-4">
                            <img src={logoWhite} alt="logo" className="h-20 rounded-xl object-contain" />
                            <div>
                                <p className="text-neutral-200/90 text-xl">
                                    {tagline}
                                </p>    
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-3 text-[clamp(13px,1vw,18px)]">
                            <div className="flex items-start gap-3">
                                <AiOutlineEnvironment size={20} className="mt-1" />
                                <p>{address}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <AiOutlinePhone size={20} />
                                <a href={`tel:${phone}`} className="hover:underline">
                                    {phone}
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <AiOutlineMail size={20} />
                                <a href={`mailto:${email}`} className="hover:underline">
                                    {email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6">
                        <h3 className="font-semibold mb-3 text-[clamp(16px,1.2vw,24px)]">
                            Quick Link
                        </h3>
                        <ul className="space-y-2 text-[clamp(13px,1vw,18px)]">
                            {quickLinks.map((l) => (
                                <li key={l.to}>
                                    <NavLink
                                        to={l.to}
                                        className="hover:underline"
                                    >
                                        {l.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SOCIAL ICONS */}
                    <div className="w-full sm:w-auto flex gap-4 items-start">
                        <a
                            href="https://wa.me/919978969978"
                            target="_blank"
                            className="p-3 bg-white/10 hover:bg-white/20 rounded-full"
                        >
                            <FaWhatsapp className="text-neutral-100" size={22} />
                        </a>

                        <a
                            href="https://instagram.com/getbarcodesolutions?igsh=Z2M2YnRmNDRmbHo="
                            target="_blank"
                            className="p-3 bg-white/10 hover:bg-white/20 rounded-full"
                        >
                            <FaInstagram className="text-neutral-100" size={22} />
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-8 border-white/20" />

                {/* BOTTOM */}
                <div className="flex flex-col md:flex-row justify-between items-center text-[clamp(12px,0.9vw,16px)] opacity-90">
                    <p>© {year} {company} • All Rights Reserved</p>
                </div>

            </div>
        </footer>
    );
}
