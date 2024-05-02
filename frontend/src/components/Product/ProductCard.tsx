import { Card } from "antd";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  p_title: string;
  p_price: number;
  p_image: string[] | string;
  p_rating: string;
  p_description: string;
}

const { Meta } = Card;

const ProductCard: React.FC<ProductCardProps> = ({
  p_image,
  p_title,
  p_description,
  p_price,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/productd");
  };

  const getFirstImageUrl = () => {
    if (Array.isArray(p_image)) {
      return p_image[0];
    } else {
      return p_image;
    }
  };
  console.log(getFirstImageUrl());

  return (
    <>
      <div>
        <Card hoverable className="w-60" onClick={handleClick}>
          <img
            src={`../../../../backend/server/uploads/${getFirstImageUrl()}`}
            alt={p_title}
          />
          <Meta title={p_title} />
          <p className="line-clamp-2 mt-2">{p_description}</p>
          <div className="flex justify-between gap-2 mt-2">
            <p>
              <strong className="text">{p_price} &#8377;</strong>
            </p>
            <p>⭐4.5</p>
          </div>
        </Card>
      </div>
      <div className="w-full h-full">
        <img
          src={`/backend/server/uploads/ecommerce.jpg`}
          alt={`../../../../backend/server/uploads/ecommerce.jpg`}
          sizes={"40px"}
        />
      </div>
    </>
  );
};

export default ProductCard;
