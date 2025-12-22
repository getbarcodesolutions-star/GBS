import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const ProductDetail = () => {
  const { products } = useContext(ShopContext);
  const [productDetails, setProductDetails] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    if (products && productId) {
      const selectedProduct = products.find(
        (item) => item._id.toString() === productId.toString()
      );
      setProductDetails(selectedProduct);
    }
  }, [products, productId]);

  if (!productDetails) {
    return <div className="text-center mt-17">Loading product details...</div>;
  }

  const excludedFields = [
    "_id",
    "__v",
    "images",
    "bestseller",
    "createdAt",
    "updatedAt"
  ];

  // ✅ ONLY show fields that actually have values
  const fieldsToShow = Object.entries(productDetails).filter(
    ([key, value]) =>
      !excludedFields.includes(key) &&
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
  );

  const formatLabel = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="h-full lg:bg-white bg-white">
      <div className="mt-10 mb-5">
        <h1 className="text-[#5482b3] font-semibold tracking-widest w-fit border-b-2 md:m-10 m-3 md:text-4xl text-3xl">
          Additional Information
        </h1>
      </div>

      <div className="h-full select-none mt-3 md:ml-5 sm:ml-3 ml-1 mr-1 w-auto">
        <div className="border-neutral-200 shadow-2xl border 2xl:w-400 xl:w-300 lg:w-230 md:w-180 sm:w-100 rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="w-full flex items-center bg-[#7DA0CA] h-15 rounded-t-2xl">
            <div className="xl:w-1/7 md:w-1/3 w-60 ml-3">
              <h1 className="text-2xl font-semibold text-neutral-800">
                Attribute
              </h1>
            </div>
            <div className="w-full">
              <h1 className="text-2xl font-semibold text-neutral-800">
                Details
              </h1>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white w-full">
            {fieldsToShow.map(([key, value], index) => (
              <div
                key={key}
                className={`flex w-full h-auto p-2 items-center ${
                  index % 2 === 0 ? "bg-white" : "bg-neutral-100"
                }`}
              >
                <span className="font-semibold tracking-widest ml-3 xl:w-1/7 md:w-1/3 text-neutral-950 w-60">
                  {formatLabel(key)}
                </span>
                <span className="w-full tracking-widest text-neutral-500 font-semibold">
                  {typeof value === "boolean"
                    ? value
                      ? "Yes"
                      : "No"
                    : String(value)}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
