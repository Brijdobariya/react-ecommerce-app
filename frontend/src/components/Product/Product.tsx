import { useState, useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

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
      {productData.map((product, index) => (
        <div key={product.p_id}>
          <ProductCard {...product} p_image={urls[index]} />
        </div>
      ))}
    </>
  );
};

export default Product;
