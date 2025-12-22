import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const RelatedProducts = ({ id, images, name, price }) => {
  const { currency } = useContext(ShopContext);

  const imageUrl = images && images.length > 0 ? images[0]?.url : null;

  return (
    <Link
      to={`/product/${id}`}
      className="block cursor-pointer w-35 mb-5 lg:mb-10 sm:w-72 md:w-80 lg:w-80 mt-5"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden">
        
        {/* Image Container */}
        <div className="aspect-square w-full bg-neutral-400 flex items-center justify-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Info Section */}
        <div className="p-5 md:p-4 flex flex-col justify-between text-neutral-800 flex-grow">
          <p className="text-xs sm:text-lg font-semibold line-clamp-2">
            {name}
          </p>
          <p className="text-md sm:text-xl lg:text-2xl flex gap-1 items-baseline">
            <span>{currency}</span>
            <span className="font-extrabold">{price}</span>
          </p>
        </div>

      </div>
    </Link>
  );
};

export default RelatedProducts;
