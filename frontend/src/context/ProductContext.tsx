import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext<any>({});

const useProductContext = () => {
  return useContext(ProductContext);
};

const ProductContextProvider = ({ children }: any) => {
  const [productData, setProductData] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/p-add")
      .then((res) => {
        setProductData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   console.log(productData);

  const value = { productData };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export { useProductContext };

export default ProductContextProvider;
