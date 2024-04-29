import React from "react";
import { Link, NavLink } from "react-router-dom";

interface CarouselProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const Carousel: React.FC<CarouselProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return (
    <div className="flex flex-col md:flex-row my-5 px-5 md:px-10 shadow-lg rounded-md h-96">
      {" "}
      {/* Add a fixed height */}
      <div className="md:w-1/2 relative h-full">
        {" "}
        {/* Set height to 100% */}
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-center px-5 py-4 h-full">
        {" "}
        {/* Set height to 100% */}
        <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
        <p className="text-sm md:text-base mt-2 mb-4">{description}</p>
        <NavLink
          to={"/product"}
          className="p-3 bg-black text-white rounded-md w-full md:w-32 text-center hover:bg-gray-700 text-lg hover:text-white"
        >
          Buy now
        </NavLink>
      </div>
    </div>
  );
};

export default Carousel;
