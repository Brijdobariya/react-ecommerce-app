import React from "react";

import { category } from "./../utils/index";

const Home = () => {
  return (
    <>
      <div>
        {category.map((item: any) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </>
  );
};

export default Home;
