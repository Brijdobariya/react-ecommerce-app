import React, { useEffect, useState } from "react";

import { category, carouselItem } from "../utils/index";

import { Carousel } from "antd";
import Carousel1 from "./Carousel";
import Product from "../components/Product/Product";

// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";

const Home = () => {
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 700) {
      setToggle(false);
    }
  }, []);
  console.log(toggle);

  return (
    <>
      {toggle && (
        <Carousel autoplay dots={false} easing="linear">
          {carouselItem.map((item: any) => (
            <div key={item.id}>
              <Carousel1 {...item} />
            </div>
          ))}
        </Carousel>
      )}

      <div className="flex flex-1 justify-center items-center mt-5">
        {category.map((item: any) => (
          <div key={item.id} className="m-3">
            <div className="w-52 h-44">
              <img
                src={item.image}
                alt=""
                className="w-screen h-full object-cover overflow-hidden mix-blend-multiply"
              />
            </div>
            <h1 className="text-xl text-center mt-2">{item.name}</h1>
          </div>
        ))}
      </div>
      <div className="product py-4">
        <h1 className="text-3xl font-bold py-3">Feature Products</h1>
        <Product />
      </div>
    </>
  );
};

export default Home;
