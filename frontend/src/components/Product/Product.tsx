import { useState, useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";
import { NavLink } from "react-router-dom";

const Product = () => {
  const { productData } = useProductContext();
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const updatedUrls = productData.map((product) =>
      product.p_image.split(",")
    );
    setUrls(updatedUrls);
  }, [productData]);

  return (
    <>
      <div className="flex justify-center items-center gap-1 md:flex md:flex-row  md:gap-4 flex-wrap">
        {productData.map((product, index) => (
          <NavLink to={`/productd/${product.p_id}`}>
            <div key={product.p_id}>
              <ProductCard {...product} p_image={urls[index]} />
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Product;
