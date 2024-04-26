import { Link } from "react-router-dom";

interface CarouselProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const Carousel: React.FC<CarouselProps> = ({ title, image }) => {
  return (
    <div className="flex my-5 px-10 shadow-lg rounded-md">
      <div className="w-screen h-96  relative">
        <img
          src={image}
          alt=""
          className="relative w-full h-full overflow-y-hidden object-contain mix-blend-multiply"
        />
      </div>
      <div className="absolute z-99 w-full h-full flex flex-col gap-4 justify-center ">
        <h1 className="text-5xl font-bold max-w-lg">{title}</h1>
        <Link
          to="javascript:void"
          className="p-3 bg-black text-white rounded-md w-32 text-center hover:bg-zinc-500 text-lg hover:text-black"
        >
          Buy now
        </Link>
      </div>
    </div>
  );
};

export default Carousel;
