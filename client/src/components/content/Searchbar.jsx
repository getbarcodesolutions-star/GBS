import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import AllShop from "../content/AllShop";
import { motion } from "framer-motion";

const Searchbar = () => {
  const { products, search, setSearch } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter products based on search input
  useEffect(() => {
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="w-full mt-17 min-h-screen bg-neutral-100 p-4 sm:p-6">
      {/* Search Input */}
      <div className="flex justify-center mb-6 relative">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border fixed border-neutral-700 backdrop-blur-3xl tracking-widest shadow-xl hover:shadow-2xl text-neutral-900 w-full max-w-2xl h-15 rounded-2xl outline-0 text-2xl pl-10 pr-4 bg-white"
          type="text"
          placeholder="Search product..."
        />
      </div>

      {/* Results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-20">
          No products found 
        </div>
      ) : (
        <motion.div
          className="grid [@media(min-width:2500px)]:grid-cols-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-2 mt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <AllShop
                id={item._id}
                image={item.images}
                name={item.name}
                price={item.price}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Searchbar;
