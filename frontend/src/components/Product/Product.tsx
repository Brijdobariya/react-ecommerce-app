import React from "react";

import { useProductContext } from "../../context/ProductContext";

import ProductCard from "./ProductCard";
import { NavLink } from "react-router-dom";

const Product = () => {
  const { productData } = useProductContext();

  return (
    <>
      <div className=" mt-10">
        {/* <h1 className="text-3xl font-bold pb-5">Related Products</h1> */}
        {/* <NavLink to="/productd"> */}
        {productData.map((data, i) => (
          <div key={i}>
            <ProductCard {...data} />
          </div>
        ))}
        {/* </NavLink> */}
      </div>
    </>
  );
};

export default Product;
