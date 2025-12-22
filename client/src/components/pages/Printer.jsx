import React, { useState, useContext, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { ShopContext } from "../../context/ShopContext";
import AllShop from "../content/AllShop";

const Printer = () => {
  const { products, search } = useContext(ShopContext);

  /* =======================
     🔹 BACKEND-DRIVEN FILTER DATA
     ======================= */

  // ✅ BRAND
  const brands = useMemo(() => {
    return [
      ...new Set(
        products
          .filter(
            (p) =>
              (p.category === "Printer" || p.category === "Parts") && p.brand
          )
          .map((p) => p.brand)
      ),
    ];
  }, [products]);

  // ✅ RESOLUTION
  const resolutions = useMemo(() => {
    return [
      ...new Set(
        products
          .filter(
            (p) =>
              (p.category === "Printer" || p.category === "Parts") &&
              p.resolution
          )
          .map((p) => p.resolution)
      ),
    ];
  }, [products]);

  /* =======================
     ICON STATES
     ======================= */

  const [brandIcons, setBrandIcons] = useState({});
  const [resolutionIcons, setResolutionIcons] = useState({});

  useEffect(() => {
    setBrandIcons(brands.reduce((a, k) => ({ ...a, [k]: false }), {}));
  }, [brands]);

  useEffect(() => {
    setResolutionIcons(
      resolutions.reduce((a, k) => ({ ...a, [k]: false }), {})
    );
  }, [resolutions]);

  /* =======================
     UI STATES
     ======================= */

  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [productItem, setProductItem] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedResolutions, setSelectedResolutions] = useState([]);

  /* =======================
     FILTER TOGGLES
     ======================= */

  const toggleBrand = (name) => {
    setBrandIcons((prev) => ({ ...prev, [name]: !prev[name] }));
    setSelectedBrands((prev) =>
      prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]
    );
  };

  const toggleResolution = (name) => {
    setResolutionIcons((prev) => ({ ...prev, [name]: !prev[name] }));
    setSelectedResolutions((prev) =>
      prev.includes(name) ? prev.filter((r) => r !== name) : [...prev, name]
    );
  };

  /* =======================
     ✅ FILTER PRODUCTS
     ======================= */

  useEffect(() => {
    const filtered = products.filter(
      (item) =>
        (item.category === "Printer" || item.category === "Parts") &&
        (selectedBrands.length === 0 ||
          selectedBrands.includes(item.brand)) &&
        (selectedResolutions.length === 0 ||
          selectedResolutions.includes(item.resolution)) &&
        (search.trim() === "" ||
          item.name.toLowerCase().includes(search.toLowerCase()))
    );

    setProductItem(filtered.slice(0, 100));
  }, [products, selectedBrands, selectedResolutions, search]);

  /* =======================
     SORT
     ======================= */

  const sortedProducts = [...productItem].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return 0;
  });

  /* =======================
     UI (UNCHANGED)
     ======================= */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full flex select-none bg-white lg:mt-17 mt-15 border-t border-neutral-300 h-auto overflow-hidden">

      {/* Mobile Filter Button */}
      {!isOpen && (
        <div className="lg:hidden absolute top-19 left-4 z-1">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-neutral-500 text-white flex items-center gap-2 px-5 py-1 rounded-lg shadow-lg"
          >
            <FiFilter className="text-xl" />
            Filters
          </button>
        </div>
      )}

      <motion.div
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className={`fixed lg:top-[69px] top-0 left-0 h-full bg-white z-40 flex flex-col items-center p-5 transition-transform duration-300
        2xl:w-[400px] xl:w-[320px] lg:w-[280px] md:w-[250px] sm:w-[230px] w-[80%]
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">FILTERS</h1>
          <button
            className="lg:hidden text-3xl text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <IoClose />
          </button>
        </div>

        {/* ✅ BRAND FILTER */}
        <div className="bg-gray-50 mb-6 p-5 rounded-2xl shadow w-full">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Brand</h2>
          <div className="flex flex-col gap-3">
            {brands.map((key) => (
              <button
                key={key}
                onClick={() => toggleBrand(key)}
                className="flex items-center cursor-pointer text-lg gap-3 font-semibold text-gray-700"
              >
                <span
                  className={`border rounded-lg w-7 h-7 flex items-center justify-center text-2xl ${
                    brandIcons[key] ? "bg-gray-300" : ""
                  }`}
                >
                  {brandIcons[key] && <GiCheckMark />}
                </span>
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ RESOLUTION FILTER */}
        <div className="bg-gray-50 mb-6 p-5 rounded-2xl shadow w-full">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Resolution
          </h2>
          <div className="flex flex-col gap-3">
            {resolutions.map((key) => (
              <button
                key={key}
                onClick={() => toggleResolution(key)}
                className="flex items-center cursor-pointer text-lg gap-3 font-semibold text-gray-700"
              >
                <span
                  className={`border rounded-lg w-7 h-7 flex items-center justify-center text-2xl ${
                    resolutionIcons[key] ? "bg-gray-300" : ""
                  }`}
                >
                  {resolutionIcons[key] && <GiCheckMark />}
                </span>
                {key}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* PRODUCTS */}
      <div className="flex-1 flex flex-col bg-neutral-100 min-h-screen lg:ml-[280px] xl:ml-[320px] 2xl:ml-[400px] p-4 sm:p-6">
        <motion.div
          className="flex justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid [@media(min-width:2500px)]:grid-cols-6 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-2">
            {sortedProducts.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AllShop
                  id={item._id}
                  image={item.images}
                  name={item.name}
                  price={item.price}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Printer;
