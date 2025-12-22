import React, { useState, useContext, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { ShopContext } from "../../context/ShopContext";
import AllShop from "../content/AllShop";

const Label = () => {
  const { products, search } = useContext(ShopContext);

  /* =======================
     🔹 BACKEND-DRIVEN FILTER DATA
     ======================= */

  const papers = useMemo(() => {
    return [
      ...new Set(
        products
          .filter((p) => p.category === "Label" && p.paper)
          .map((p) => p.paper)
      ),
    ];
  }, [products]);
  const size = useMemo(() => {
    return [
      ...new Set(
        products
          .filter((p) => p.category === "Label" && p.size)
          .map((p) => p.size)
      ),
    ];
  }, [products]);

  const labelsPerRoll = useMemo(() => {
    return [
      ...new Set(
        products
          .filter((p) => p.category === "Label" && p.perroll)
          .map((p) => p.perroll)
      ),
    ];
  }, [products]);

  /* =======================
     ICON STATES (LOGIC ONLY)
     ======================= */

  const [paperIcons, setPaperIcons] = useState({});
  const [rollIcons, setRollIcons] = useState({});
  const [sizeIcons, setSizeIcons] = useState({});

  useEffect(() => {
    setPaperIcons(papers.reduce((a, k) => ({ ...a, [k]: false }), {}));
  }, [papers]);

  useEffect(() => {
    setSizeIcons(size.reduce((a, k) => ({ ...a, [k]: false }), {}));
  }, [size]);

  useEffect(() => {
    setRollIcons(labelsPerRoll.reduce((a, k) => ({ ...a, [k]: false }), {}));
  }, [labelsPerRoll]);

  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [productItem, setProductItem] = useState([]);

  const [selectedPapers, setSelectedPapers] = useState([]);
  const [selectedLabelsPerRoll, setSelectedLabelsPerRoll] = useState([]);
  const [selecetedsize, setSelecetedsize] = useState([])


  const togglePaper = (name) => {
    setPaperIcons((prev) => ({ ...prev, [name]: !prev[name] }));
    setSelectedPapers((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const toggleSize = (name) => {
    setSizeIcons((prev) => ({ ...prev, [name]: !prev[name] }));
    setSelecetedsize((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const toggleRoll = (name) => {
    setRollIcons((prev) => ({ ...prev, [name]: !prev[name] }));
    setSelectedLabelsPerRoll((prev) =>
      prev.includes(name) ? prev.filter((r) => r !== name) : [...prev, name]
    );
  };



  useEffect(() => {
    const filtered = products.filter(
      (item) =>
        item.category === "Label" &&
        (selectedPapers.length === 0 ||
          selectedPapers.includes(item.paper)) &&
        (selectedLabelsPerRoll.length === 0 ||
          selectedLabelsPerRoll.includes(item.perroll)) &&
        (selecetedsize.length === 0 ||
          selecetedsize.includes(item.size)) &&
        (search.trim() === "" ||
          item.name.toLowerCase().includes(search.toLowerCase()))
    );

    setProductItem(filtered.slice(0, 100));
  }, [products, selectedPapers, selectedLabelsPerRoll, selecetedsize, search]);


  const sortedProducts = [...productItem].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return 0;
  });

  const sortOptions = [
    { label: "Price: Low → High", value: "low" },
    { label: "Price: High → Low", value: "high" },
  ];

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
      {/* UI BELOW IS UNCHANGED */}

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

        {/* Size Filter */}
        <div className="bg-gray-50 mb-6 p-5 rounded-2xl shadow w-full">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Size</h2>
          <div className="flex flex-col gap-3">
            {size.map((key) => (
              <button
                key={key}
                onClick={() => toggleSize(key)}
                className="flex items-center cursor-pointer text-lg gap-3 font-semibold text-gray-700"
              >
                <span
                  className={`border rounded-lg w-7 h-7 flex items-center justify-center text-2xl ${sizeIcons[key] ? "bg-gray-300" : ""
                    }`}
                >
                  {sizeIcons[key] && <GiCheckMark />}
                </span>
                {key}
              </button>
            ))}
          </div>
        </div>
        {/* Paper Filter */}
        <div className="bg-gray-50 mb-6 p-5 rounded-2xl shadow w-full">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Paper</h2>
          <div className="flex flex-col gap-3">
            {papers.map((key) => (
              <button
                key={key}
                onClick={() => togglePaper(key)}
                className="flex items-center cursor-pointer text-lg gap-3 font-semibold text-gray-700"
              >
                <span
                  className={`border rounded-lg w-7 h-7 flex items-center justify-center text-2xl ${paperIcons[key] ? "bg-gray-300" : ""
                    }`}
                >
                  {paperIcons[key] && <GiCheckMark />}
                </span>
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Labels per Roll */}
        <div className="bg-gray-50 mb-6 p-5 rounded-2xl shadow w-full">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Labels per Roll
          </h2>
          <div className="flex flex-col gap-3">
            {labelsPerRoll.map((key) => (
              <button
                key={key}
                onClick={() => toggleRoll(key)}
                className="flex items-center cursor-pointer text-lg gap-3 font-semibold text-gray-700"
              >
                <span
                  className={`border rounded-lg w-7 h-7 flex items-center justify-center text-2xl ${rollIcons[key] ? "bg-gray-300" : ""
                    }`}
                >
                  {rollIcons[key] && <GiCheckMark />}
                </span>
                {key}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
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

export default Label;
