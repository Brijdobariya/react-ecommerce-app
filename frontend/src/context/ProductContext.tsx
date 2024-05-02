import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface ProductData {
  p_id: string;
  p_title: string;
  p_description: string;
  p_price: string;
  P_category: string;
  p_stock: string;
  p_image: string;
  p_color?: string;
}

interface ProductContextValue {
  productData: ProductData[];
  error: string | null;
}

const ProductContext = createContext<ProductContextValue>({
  productData: [],
  error: null,
});

const useProductContext = () => useContext(ProductContext);

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

const ProductContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axiosInstance.get("/p-add");
        setProductData(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch product data");
        console.error(err);
      }
    };

    fetchProductData();
  }, []);

  const value: ProductContextValue = { productData, error };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export { useProductContext };
export default ProductContextProvider;
