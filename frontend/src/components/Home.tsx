import React from "react";

import { category } from "./../utils/index";

const Home = () => {
  return (
    <>
      <div className="flex flex-1 justify-center items-center ">
        {category.map((item: any) => (
          <div key={item.id} className="m-3">
            <div className="w-52 h-44">
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover overflow-hidden mix-blend-multiply"
              />
            </div>
            <h1 className="text-xl text-center">{item.name}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
