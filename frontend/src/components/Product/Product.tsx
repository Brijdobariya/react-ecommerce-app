import React from "react";

import ProductCard from "./ProductCard";
import { NavLink } from "react-router-dom";

const Product = () => {
  return (
    <>
      <div className="container mx-auto mt-10">
        {/* <h1 className="text-3xl font-bold pb-5">Related Products</h1> */}
        {/* <NavLink to="/productd"> */}
        <ProductCard />
        {/* </NavLink> */}
      </div>
    </>
  );
};

export default Product;
