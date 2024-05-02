import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useProductContext } from "../../context/ProductContext";
import CButton from "../Custom/CButton";
import Product from "./Product";

interface ProductDetailProps {}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const [count, setCount] = useState(1);
  const [colors, setColors] = useState([]);

  const productDet = [];

  const { id } = useParams();
  // console.log(id);

  const { productData } = useProductContext();
  const product = productData.filter((item) => item.p_id == id);
  productDet.push(...product);
  // console.log(productDet);

  const handleClickAdd = () => {
    if(count === Number(productDet.map(item => item.p_stock))){
      toast.error("You can't add more than 10 items");
      return;
    }
    setCount(count + 1);
  };
  const handleClickRemove = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  };

  useEffect(() => {
    const itemColors = productDet.flatMap((item) => {
      if (item.p_color) {
        return item.p_color.split(",");
      }
      return [];
    });

    setColors(itemColors);
  }, []);

  console.log(colors);

  return (
    <>
      <div className="container mx-auto py-10">
        {productDet.map((item) => (
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-4">
            <div className="left flex md:flex-row flex-col-reverse gap-4">
              {/* product images */}
              <div className="left-image-list flex md:flex-col flex-row gap-5">
                <div className="w-20 h-20 border-2 border-gray-400">
                  <img
                    src="https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-20 h-20 border-2 border-gray-400">
                  <img
                    src="https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-20 h-20 border-2 border-gray-400">
                  <img
                    src="https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-20 h-20 border-2 border-gray-400">
                  <img
                    src="https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full">
                <img
                  src="https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg"
                  alt=""
                  className="w-full h-96 object-contain"
                />
              </div>
            </div>
            <div className="right">
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {item.p_title}
                </h1>
                <div className="description text-sm md:text-base">
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
                  {colors.map((color) => (
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
        <div className="flex flex-row gap-4 flex-wrap">
          <Product />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;