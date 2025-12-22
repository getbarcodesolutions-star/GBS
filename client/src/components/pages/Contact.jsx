import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import Footer from "../footer/Footer";


const Contact = () => {
  return (
    <>
      {/* Top Title Section */}
      <div className="w-full flex flex-col gap-3 justify-center items-center text-neutral-700 mt-15 lg:mt-17">
        <p className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-widest">
          Contact Us
        </p>
        <p className="text-lg md:text-2xl text-neutral-500 font-semibold text-center px-4 max-w-3xl">
          Get in touch with us anytime through our contact form or email, and
          we’ll respond as soon as possible.
        </p>
      </div>

      {/* Form Section */}
      <form className="w-full flex justify-center">
        <div className="mt-6 space-y-6 w-[90%] sm:w-[85%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] p-4">

          {/* Name + Company */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <h1 className="text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2">
                Name <span className="text-red-500">*</span>
              </h1>
              <input
                required
                className="bg-[#c1e8ffdc] w-full py-2 text-base md:text-xl xl:text-2xl tracking-widest rounded-3xl px-3 focus:ring-3 outline-none focus:ring-[#C1E8FF]"
                type="text"
                placeholder="Name"
              />
            </div>

            <div className="w-full md:w-1/2">
              <h1 className="text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2">
                Company Name <span className="text-red-500">*</span>
              </h1>
              <input
                required
                className="bg-[#c1e8ffdc] w-full py-2 text-base md:text-xl xl:text-2xl tracking-widest rounded-3xl px-3 focus:ring-3 outline-none focus:ring-[#C1E8FF]"
                type="text"
                placeholder="Company"
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <h1 className="text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2">
                Email <span className="text-red-500">*</span>
              </h1>
              <input
                required
                className="bg-[#c1e8ffdc] w-full py-2 text-base md:text-xl xl:text-2xl tracking-widest rounded-3xl px-3 focus:ring-3 outline-none focus:ring-[#C1E8FF]"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="w-full md:w-1/2">
              <h1 className="text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2">
                Phone No. <span className="text-red-500">*</span>
              </h1>
              <input
                type="number"
                required
                className="no-spinner bg-[#c1e8ffdc] w-full py-2 text-base md:text-xl xl:text-2xl tracking-widest rounded-3xl px-3 focus:ring-3 outline-none focus:ring-[#C1E8FF]"
                placeholder="Phone Number"
              />
            </div>
          </div>

          {/* Message */}
          <div className="w-full">
            <h1 className="text-lg md:text-xl text-[#08246c] tracking-widest font-semibold p-2">
              Message <span className="text-red-500">*</span>
            </h1>
            <textarea
              placeholder="Message"
              rows={3}
              className="bg-[#c1e8ffdc] w-full py-2 text-base md:text-xl xl:text-2xl tracking-widest rounded-2xl px-3 focus:ring-3 outline-none focus:ring-[#C1E8FF]"
            ></textarea>
          </div>

          {/* Submit Button */}
          <input
            className="p-4 text-xl md:text-2xl font-black cursor-pointer text-[#06324d] tracking-widest bg-[#70b3da] rounded-xl w-full"
            type="submit"
          />
        </div>
      </form>
      <h1 className="lg:p-10 mt-20 sm:p-5 p-3 lg:text-7xl  text-4xl font-semibold text-neutral-800 tracking-wide">
        Looking for support
      </h1>
      <div className="mt-10 w-full lg:h-120 sm:h-230 h-200 flex lg:flex-row flex-col justify-center-safe items-center md:gap-15 gap-10">

        <div className="h-100 2xl:w-120 xl:w-100 lg:w-70 w-[90%]  shadow-2xl flex flex-col justify-center items-center-safe gap-3 shadow-[#06324d]/80 rounded-4xl bg-[#06324d]">
          <div className="h-30 w-full gap-2 flex md:flex-row flex-col justify-center-safe items-center">
            <h1 className="2xl:text-7xl xl:text-6xl lg:text-4xl sm:text-6xl text-4xl flex gap-2 text-neutral-300"><IoCallOutline /></h1>
            <h1 className="2xl:text-4xl xl:text-3xl lg:text-2xl sm:text-3xl text-xl text-neutral-300 font-black tracking-widest">
              <a href={`tel:+91 9978 96 9978`} className="hover:underline">
                +91 9978 96 9978
              </a>
            </h1>
          </div>
          <div className=" h-30 w-full flex justify-center">
            <h1 className="lg:text-2xl sm:text-xl text-sm w-[90%] text-neutral-300 text-center">
              If you’re interested in creating custom labels, we’d be happy to help bring your ideas to your company.
            </h1>
          </div>
        </div>
        <div className="h-100 2xl:w-120 xl:w-100 lg:w-70 w-[90%] lg:scale-115 scale-100 shadow-2xl shadow-bg-[#06324d]/40 rounded-4xl flex flex-col justify-center items-center-safe gap-3 bg-[#06324d]/70">
          <div className=" h-30 w-full gap-2 flex flex-col justify-center-safe items-center">
            <h1 className="2xl:text-7xl xl:text-6xl lg:text-4xl sm:text-6xl text-4xl flex gap-2 text-neutral-100"><TfiEmail /></h1>
            <h1 className="2xl:text-2xl xl:text-xl lg:text-sm sm:text-3xl text-sm text-neutral-100 font-black tracking-widest">
              <a href={`mailto:getbarcodesolutions@gmail.com`} className="hover:underline">
                getbarcodesolutions@gmail.com
              </a>
            </h1>
          </div>
          <div className=" h-30 w-full flex justify-center">
            <h1 className="lg:text-2xl sm:text-xl text-sm w-[90%] text-neutral-100 text-center tracking-wide">
              Have a query about your order, or need guidance choosing the right Labels, Ribbons, or Printers
            </h1>
          </div>
        </div>
        <div className="h-100 2xl:w-120 xl:w-100 lg:w-70 w-[90%] shadow-2xl shadow-bg-[#06324d]/20 rounded-4xl flex flex-col justify-center items-center-safe gap-3 bg-[#06324d]/40">
          <div className=" h-30 w-full gap-2 flex justify-center-safe items-center">
            <h1 className="2xl:text-7xl xl:text-6xl lg:text-4xl sm:text-6xl text-4xl flex gap-2 text-neutral-50"><LiaMapMarkerAltSolid /></h1>
            <h1 className="2xl:text-4xl xl:text-3xl lg:text-2xl sm:text-3xl text-xl text-neutral-50 font-black tracking-widest">
              Pardi
            </h1>
          </div>
          <div className=" h-30 w-full flex justify-center">
            <h1 className="lg:text-2xl sm:text-xl text-sm w-[90%] text-neutral-50 text-center">
              GF-15, Sanskruti Avenue, Nr. Canara Bank, NH 48, Killa-pardi, Gujarat 396125
            </h1>
          </div>
        </div>
      </div>



      <div className="w-full mt-20 lg:h-220 sm:h-150 h-100 flex justify-center">
        <iframe
          title="google-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.679417787049!2d72.95094877596055!3d20.519364105078136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0c5ea4a1ac663%3A0x8a7d9a46119afadf!2sGET%20BARCODE%20SOLUTIONS%20LABELS%20STICKER%20RIBBONS%20PRINTERS!5e0!3m2!1sen!2sin!4v1763309773133!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
