import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import RelatedProducts from "./RelatedProducts";

const RelatedProductsSection = ({ currentProductId, currentCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products?.length && currentCategory) {
      const filtered = products.filter(
        (item) =>
          item.category?.toLowerCase() === currentCategory?.toLowerCase() &&
          item._id !== currentProductId
      );

      setRelatedProducts(filtered.slice(0, 5));
    }
  }, [products, currentCategory, currentProductId]);

  return (
    <div className="w-full bg-neutral-100 py-10 md:mt-15 mt-7 sm:px-5 px-5 md:px-10">
      <h2 className="text-3xl md:text-4xl border-b-2 w-fit font-bold text-[#5482b3] mb-8 tracking-wide text-center md:text-left">
        Related Products
      </h2>

      <div className="grid [@media(min-width:2500px)]:grid-cols-6 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-2">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((item, index) => (
            <RelatedProducts
              key={index}
              id={item._id}
              images={item.images}   // ✅ FIXED
              name={item.name}
              price={item.price}
            />

          ))
        ) : (
          <p className="col-span-full text-center text-neutral-500 text-lg">
            No related products found.
          </p>
        )}
      </div>

    </div>
  );
};

export default RelatedProductsSection;
