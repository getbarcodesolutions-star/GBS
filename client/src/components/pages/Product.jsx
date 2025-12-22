import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import ProductData from "../content/ProductData";
import ProductDetail from "../content/ProductDetail";
import RelatedProductsSection from "../content/RelatedProductsSection";
import ThreeIcons from "../content/ThreeIcons";

const Product = () => {
  const { products } = useContext(ShopContext);
  const { productId } = useParams();

  // Find product by ID
  const productDetails = products.find(
    (item) => item._id.toString() === productId.toString()
  );

  if (!productDetails) {
    return <div className="text-center mt-10">Loading product details...</div>;
  }

  return (
    <div>
      <ProductData  />
      <ProductDetail />
      <RelatedProductsSection
        currentProductId={productDetails._id}
        currentCategory={productDetails.category}
      />
      <ThreeIcons/>
    </div>
  );
};

export default Product;
