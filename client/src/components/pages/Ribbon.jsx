import React, { useState, useContext, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { ShopContext } from "../../context/ShopContext";
import AllShop from "../content/AllShop";

const Label = () => {
  const { products, search } = useContext(ShopContext);

  /* =======================
     🔹 BACKEND-DRIVEN FILTER DATA
     ======================= */

  const sizes = useMemo(() => {
    return [
      ...new Set(
        products
          .filter((p) => p.category === "Ribbon" && p.size)
          .map((p) => p.size)
      ),
    ];
  }, [products]);

  const labelsPerRoll = useMemo(() => {
    return [
      ...new Set(
        products
          .filter((p) => p.category === "Ribbon" && p.perroll)
          .map((p) => p.perroll)
      ),
    ];
  }, [products]);

  // ✅ NEW: Grade
  const grades = useMemo(() => {
    return [
      ...new Set(
        products
          .filter((p) => p.category === "Ribbon" && p.grade)
          .map((p) => p.grade)
      ),
    ];
  }, [products]);

  // ✅ NEW: Ribbon Size
  const ribbonSizes = useMemo(() => {
    return [
      ...new Set(
        products
          .filter((p) => p.category === "Ribbon" && p.ribbonsize)
          .map((p) => p.ribbonsize)
      ),
    ];
  }, [products]);

  /* =======================
     ICON STATES
     ======================= */

  const [sizeIcons, setSizeIcons] = useState({});
  const [rollIcons, setRollIcons] = useState({});
  const [gradeIcons, setGradeIcons] = useState({});
  const [ribbonSizeIcons, setRibbonSizeIcons] = useState({});

  useEffect(() => {
    setSizeIcons(sizes.reduce((a, k) => ({ ...a, [k]: false }), {}));
  }, [sizes]);

  useEffect(() => {
    setRollIcons(labelsPerRoll.reduce((a, k) => ({ ...a, [k]: false }), {}));
  }, [labelsPerRoll]);

  useEffect(() => {
    setGradeIcons(grades.reduce((a, k) => ({ ...a, [k]: false }), {}));
  }, [grades]);

  useEffect(() => {
    setRibbonSizeIcons(
      ribbonSizes.reduce((a, k) => ({ ...a, [k]: false }), {})
    );
  }, [ribbonSizes]);

  /* =======================
     UI STATES
     ======================= */

  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [productItem, setProductItem] = useState([]);

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedLabelsPerRoll, setSelectedLabelsPerRoll] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedRibbonSizes, setSelectedRibbonSizes] = useState([]);

  /* =======================
     FILTER TOGGLES
     ======================= */

  const toggle = (value, setIcons, setSelected) => {
    setIcons((prev) => ({ ...prev, [value]: !prev[value] }));
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  /* =======================
     ✅ FILTER PRODUCTS
     ======================= */

  useEffect(() => {
    const filtered = products.filter(
      (item) =>
        item.category === "Ribbon" &&
        (selectedSizes.length === 0 || selectedSizes.includes(item.size)) &&
        (selectedLabelsPerRoll.length === 0 ||
          selectedLabelsPerRoll.includes(item.perroll)) &&
        (selectedGrades.length === 0 || selectedGrades.includes(item.grade)) &&
        (selectedRibbonSizes.length === 0 ||
          selectedRibbonSizes.includes(item.ribbonsize)) &&
        (search.trim() === "" ||
          item.name.toLowerCase().includes(search.toLowerCase()))
    );

    setProductItem(filtered.slice(0, 100));
  }, [
    products,
    selectedSizes,
    selectedLabelsPerRoll,
    selectedGrades,
    selectedRibbonSizes,
    search,
  ]);

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

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="w-full flex select-none bg-white lg:mt-17 mt-15 border-t border-neutral-300 h-auto overflow-hidden">

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
        className={`fixed lg:top-[69px] top-0 left-0 h-full bg-white z-40 flex flex-col items-center p-5
        2xl:w-[400px] xl:w-[320px] lg:w-[280px] md:w-[250px] sm:w-[230px] w-[80%]
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">FILTERS</h1>
          <button className="lg:hidden text-3xl" onClick={() => setIsOpen(false)}>
            <IoClose />
          </button>
        </div>


        {/* ✅ GRADE */}
        <FilterBox
          title="Grade"
          data={grades}
          icons={gradeIcons}
          onClick={(v) => toggle(v, setGradeIcons, setSelectedGrades)}
        />

        {/* ✅ RIBBON SIZE */}
        <FilterBox
          title="Ribbon Size"
          data={ribbonSizes}
          icons={ribbonSizeIcons}
          onClick={(v) => toggle(v, setRibbonSizeIcons, setSelectedRibbonSizes)}
        />
      </motion.div>

      {/* PRODUCTS */}
      <div className="flex-1 bg-neutral-100 min-h-screen lg:ml-[280px] xl:ml-[320px] 2xl:ml-[400px] p-4 sm:p-6">
        <div className="grid [@media(min-width:2500px)]:grid-cols-6 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-2">
          {sortedProducts.map((item, index) => (
            <AllShop
              key={index}
              id={item._id}
              image={item.images}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* =======================
   REUSABLE FILTER BOX
   (UI SAME)
======================= */
const FilterBox = ({ title, data, icons, onClick }) => (
  <div className="bg-gray-50 mb-6 p-5 rounded-2xl shadow w-full">
    <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
    <div className="flex flex-col gap-3">
      {data.map((key) => (
        <button
          key={key}
          onClick={() => onClick(key)}
          className="flex items-center cursor-pointer text-lg gap-3 font-semibold text-gray-700"
        >
          <span
            className={`border rounded-lg w-7 h-7 flex items-center justify-center text-2xl ${
              icons[key] ? "bg-gray-300" : ""
            }`}
          >
            {icons[key] && <GiCheckMark />}
          </span>
          {key}
        </button>
      ))}
    </div>
  </div>
);

export default Label;
