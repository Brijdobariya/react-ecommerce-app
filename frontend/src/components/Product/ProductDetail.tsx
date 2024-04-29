interface ProductDetailProps {}
import { useState } from "react";
import { toast } from "react-toastify";
import CButton from "../Custom/CButton";
import Product from "./Product";

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const [count, setCount] = useState(1);

  const handleClickAdd = () => {
    setCount(count + 1);
  };
  const handleClickRemove = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  };
  return (
    <>
      <div className="main grid md:grid-cols-2 sm:grid-flow-row md:p-10 mx-auto py-10">
        <div className="left flex-1 flex md:flex-row flex-col-reverse gap-4 ">
          <div className="left-image-list flex md:flex-col flex-row gap-5 ">
            <div className="w-20 h-20 border-2 border-gray-400">
              <img
                src="https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg"
                alt=""
              />
            </div>
            <div className="w-20 h-20 border-2 border-gray-400">
              <img
                src="https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg"
                alt=""
              />
            </div>
            <div className="w-20 h-20 border-2 border-gray-400">
              <img
                src="https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg"
                alt=""
              />
            </div>
            <div className="w-20 h-20 border-2 border-gray-400">
              <img
                src="https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="w-full h-96">
              <img
                src="https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg"
                alt=""
                className="w-full h-full overflow-hidden object-contain"
              />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">
              iPhone 15 pro max 512gb Titanium black
            </h1>
            <div className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              quae natus unde ipsum vel ratione distinctio. Impedit quae
              quaerat, temporibus neque tempora suscipit quia facere iste rerum
              corporis, adipisci earum, aperiam doloribus. Cupiditate cum
              tenetur impedit dolorem. Numquam, vero ratione!
            </div>
            <div className="p-rating text-lg">
              ⭐⭐⭐⭐⭐ <span>5 / 5</span>
            </div>
            <div className="price">
              <div className="flex gap-4 text-2xl">
                <strong>70000 &#8377;</strong>
                <p className="text-green-500 font-bold">10% off</p>
              </div>
              <p className="text-lg font-light italic line-through">
                <span className="">80000 &#8377;</span>
              </p>
            </div>
            <div className="color flex gap-3">
              <button
                className="rounded-full w-8 h-8 bg-black border-2 border-gray-600"
                onClick={() => toast.success("Black")}
              ></button>
              <button
                className="rounded-full w-8 h-8 bg-zinc-600 border-2 border-gray-600"
                onClick={() => toast.success("silvar")}
              ></button>
              <button
                className="rounded-full w-8 h-8 bg-red-500 border-2 border-gray-600"
                onClick={() => toast.success("red")}
              ></button>
              <button
                className="rounded-full w-8 h-8 bg-yellow-400 border-2 border-gray-600"
                onClick={() => toast.success("yellow")}
              ></button>
              <button
                className="rounded-full w-8 h-8 bg-purple-500 border-2 border-gray-600"
                onClick={() => toast.success("purple")}
              ></button>
              {/* <CButton className="rounded-full w-8 h-8 bg-purple-500 border-2 border-gray-600"></CButton> */}
            </div>
            <div className="count flex w-32 text-center">
              <button
                onClick={handleClickAdd}
                className="bg-zinc-400 p-2 text-3xl  w-full text-center"
              >
                +
              </button>
              <h1 className=" bg-zinc-200 p-2 text-3xl w-48">{count}</h1>
              <button
                onClick={handleClickRemove}
                className="bg-zinc-400 text-3xl p-2 w-full "
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
      {/* <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center">Product Details</h1>
        <div className="grid md:grid-cols-3 grid-flow-row"></div>
      </div> */}
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center">Related Products</h1>
        <Product />
      </div>
    </>
  );
};

export default ProductDetail;
