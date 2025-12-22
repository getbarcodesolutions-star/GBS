import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const AllShop = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="block w-35 sm:w-72 md:w-80 mt-5">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="aspect-square bg-neutral-200">
          <img
            src={image?.[0]?.url}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="p-4">
          <p className="font-semibold line-clamp-2">{name}</p>
          <p className="text-xl font-bold">
            {currency}{price}
          </p>
        </div>
      </div>
    </Link>
  );
};


export default AllShop;
