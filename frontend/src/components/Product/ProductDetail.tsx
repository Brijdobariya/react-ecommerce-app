import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useProductContext } from "../../context/ProductContext";
import CButton from "../Custom/CButton";
import Product from "./Product";

interface ProductDetailProps {
  p_id: string;
  p_title: string;
  p_price: number;
  p_image: string[] | string;
  p_rating: string;
  p_description: string;
}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const [count, setCount] = useState(1);
  const [mainImg, setMainImage] = useState("");

  const topRef = useRef(null);

  const { id } = useParams();

  const { productData } = useProductContext();
  // use of useMemo hook is the same as useCallback hook and it is used to prevent unnecessary re-renders and memoize productdata
  const product = useMemo(
    () => productData.filter((item) => item.p_id == id),
    [productData, id]
  );

  const handleClickAdd = useCallback(
    (itemId) => {
      const stockCount = product.find((item) => item.p_id === itemId)?.p_stock;
      if (count === Number(stockCount)) {
        toast.error(`You can't add more items`);
        return;
      }
      setCount(count + 1);
    },
    [count, product]
  );

  const handleClickRemove = useCallback(() => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  }, [count]);

  const itemColors = useMemo(
    () =>
      product.flatMap((item) => {
        if (item.p_color) {
          return item.p_color.split(",");
        }
        return [];
      }),
    [product]
  );

  const updatedUrls = useMemo(
    () =>
      product.flatMap((url) => {
        if (url.p_image) {
          return url.p_image.split(",");
        }
        return [];
      }),
    [product]
  );

  useEffect(() => {
    if (updatedUrls.length > 0) {
      setMainImage(updatedUrls[0]);
    }
  }, [updatedUrls]);

  const handleChangeImage = useCallback((img) => {
    setMainImage(img);
  }, []);

  const scrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        className="container flex justify-center items-center py-10"
        ref={topRef}
      >
        {product.map((item) => (
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-4">
            <div className="left flex md:flex-row flex-col-reverse gap-4">
              {/* product images */}
              <div className="left-image-list flex md:flex-col flex-row gap-5">
                {updatedUrls.map((img, i) => (
                  <div className="w-20 h-20 border-2 border-gray-400">
                    <img
                      key={i}
                      src={
                        new URL(
                          `../../../../backend/server/uploads/${img}`,
                          import.meta.url
                        ).href
                      }
                      onClick={() => handleChangeImage(img)}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="w-full">
                <img
                  src={
                    new URL(
                      `../../../../backend/server/uploads/${mainImg}`,
                      import.meta.url
                    ).href
                  }
                  alt=""
                  className="w-full h-96 object-contain"
                />
              </div>
            </div>
            <div className="right">
              <div className="flex flex-col gap-4">
                <h1 className="text-xl  md:text-3xl font-semibold">
                  {item.p_title}
                </h1>
                <div className="description  text-sm md:text-base line-clamp-3 md:line-clamp-4">
                  {item.p_description}
                </div>
                <div className="p-rating text-lg">
                  ⭐⭐⭐⭐⭐ <span>5 / 5</span>
                </div>
                <div className="price">
                  <div className="flex gap-4 text-2xl">
                    <strong>{item.p_price} &#8377;</strong>
                    <p className="text-green-500 font-bold">10% off</p>
                  </div>
                  <p className="text-lg font-light italic line-through">
                    <span className="">{item.p_price + 526} &#8377;</span>
                  </p>
                </div>
                <div className="color flex gap-3">
                  {itemColors.map((color) => (
                    <button
                      key={color}
                      style={{ backgroundColor: color }}
                      className={`rounded-full w-8 h-8 border-2 border-gray-600`}
                      onClick={() => toast.success(`Color: ${color}`)}
                    ></button>
                  ))}
                </div>
                <div className="count flex w-32 text-center">
                  <button
                    onClick={handleClickAdd}
                    className="bg-zinc-400 p-2 text-3xl w-full text-center"
                  >
                    +
                  </button>
                  <h1 className="bg-zinc-200 p-2 text-3xl w-48">{count}</h1>
                  <button
                    onClick={handleClickRemove}
                    className="bg-zinc-400 text-3xl p-2 w-full"
                  >
                    -
                  </button>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <CButton
                    className="bg-orange-400"
                    onClick={() => toast.success("item added to cart")}
                  >
                    Add to Cart
                  </CButton>
                  <CButton className="" onClick={() => toast.success("buy")}>
                    Buy now
                  </CButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-bold text-center">Related Products</h1>
        <div
          className="flex flex-row gap-4 flex-wrap mt-5 "
          onClick={scrollToTop}
        >
          <Product />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
