import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const ProductData = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!products || products.length === 0) return;

    const foundProduct = products.find(
      (item) => String(item._id) === String(productId)
    );

    if (foundProduct) {
      setProductData(foundProduct);

      // ✅ FIX: use images & url
      setImage(foundProduct.images?.[0]?.url || "");

      setQuantity(1);
    } else {
      setProductData(null);
    }
  }, [productId, products]);

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-cente mt-17r items-center h-screen text-2xl text-neutral-600">
        Loading products...
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="flex mt-18 justify-center items-center h-screen text-2xl text-red-600">
        Product not found.
      </div>
    );
  }

  const handleImageChange = (url) => {
    if (url) setImage(url);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    setError("");
  };

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQty = prev < 100 ? prev + 1 : 100;
      setError(newQty >= 100 ? "Maximum quantity is 100" : "");
      return newQty;
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
      setError("");
      return;
    }

    const num = Number(value);
    if (isNaN(num)) return;

    if (num > 100) {
      setQuantity(100);
      setError("Maximum quantity is 100");
    } else if (num < 1) {
      setQuantity(1);
      setError("");
    } else {
      setQuantity(num);
      setError("");
    }
  };

  const handleBlur = () => {
    if (quantity === "" || isNaN(quantity)) setQuantity(1);
  };

  return (
    <div className="lg:mt-17 mt-15 overflow-hidden w-full h-full flex flex-col bg-white lg:flex-row justify-center items-center gap-5 lg:px-0">
      {/* Left Section - Product Images */}
      <div className="h-auto 2xl:ml-20 xl:ml-0 lg:ml-0 lg:mt-10 mt-5 lg:h-200 2xl:w-1/2 w-full flex justify-center">
        <div className="h-80 2xl:h-180 xl:h-180 lg:h-144 sm:h-140 w-85 sm:w-150 2xl:w-200 xl:w-155 lg:w-115 bg-neutral-200 rounded-2xl relative flex flex-col items-center overflow-hidden">

          {image && (
            <img
              src={image}
              alt={productData.name}
              className="w-full h-60 sm:h-110 lg:h-116 2xl:h-145 object-cover bg-white"
            />
          )}

          <div className="flex gap-3 lg:gap-5 flex-wrap justify-center bg-neutral-200 p-5 rounded-b-2xl">

            {/* ✅ FIX: productData.images */}
            {productData.images?.map((img, index) => (
              <img
                key={img.public_id || index}
                src={img.url}
                alt={`thumbnail-${index}`}
                onClick={() => handleImageChange(img.url)}
                className={`h-10 w-10 sm:h-16 sm:w-16 xl:h-20 xl:w-20 rounded-md cursor-pointer object-cover border transition-all ${
                  image === img.url
                    ? "scale-110 border-black"
                    : "border-neutral-300"
                }`}
              />
            ))}

          </div>
        </div>
      </div>

      {/* Right Section - Product Details */}
      <div className="h-auto lg:h-200 w-full lg:w-1/2">
        <div className="2xl:ml-20 lg:ml-10 sm:ml-5 ml-3 2xl:w-140 sm:w-100 w-69 2xl:mt-20 lg:mt-10 sm:mt-5 mt-3 text-left">
          <h1 className="sm:text-3xl text-xl lg:text-5xl text-neutral-700 tracking-widest font-bold">
            {productData.name}
          </h1>
        </div>

        <div>
          <h1 className="2xl:ml-20 lg:ml-10 sm:ml-5 ml-3 lg:w-140 sm:w-100 w-88 lg:mt-10 sm:mt-5 mt-3 text-2xl lg:text-3xl tracking-widest text-neutral-800 text-left">
            <span className="font-semibold">{currency}</span>
            {productData.price}
          </h1>
        </div>

        <div>
          <p className="text-sm sm:text-md lg:text-xl text-neutral-500 2xl:ml-20 lg:ml-10 sm:ml-5 ml-3 lg:w-140 sm:w-100 w-88 lg:mt-10 sm:mt-5 mt-3 text-left">
            {productData.description || "No description available."}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="2xl:ml-20 lg:ml-10 sm:ml-5 ml-3 lg:mt-10 sm:mt-5 mt-3 flex justify-start">
          <div className="border-neutral-400 border w-fit rounded-2xl flex items-center">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 text-xl text-neutral-100 font-semibold bg-[#021024] hover:bg-[#052659] cursor-pointer rounded-l-2xl"
            >
              -
            </button>

            <input
              className="outline-none w-16 lg:w-20 px-4 text-xl font-black text-center"
              value={quantity}
              type="text"
              onChange={handleInputChange}
              onBlur={handleBlur}
            />

            <button
              onClick={handleIncrease}
              className="px-3 py-1 text-xl text-neutral-100 font-semibold bg-[#021024] hover:bg-[#052659] cursor-pointer rounded-r-2xl"
            >
              +
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 font-semibold text-center lg:text-left lg:ml-20">
            {error}
          </p>
        )}

        {/* Add to Cart */}
        <div className="2xl:ml-20 lg:ml-10 sm:ml-5 ml-3 lg:mt-10 sm:mt-5 mt-3 w-full flex justify-start items-center">
          <button
            onClick={() => addToCart(productData._id, quantity)}
            className="px-8 lg:px-10 mb-10 cursor-pointer py-2 border font-bold tracking-wide text-lg lg:text-xl text-neutral-200 hover:text-neutral-100 rounded-xl bg-[#5483B3] hover:bg-[#3867a0]"
          >
            Add to Cart
          </button>
        </div>

        <div className="shadow-2xl hidden lg:block overflow-hidden">
          <hr className="text-neutral-300 w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductData;
