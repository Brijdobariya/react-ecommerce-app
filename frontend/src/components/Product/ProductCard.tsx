import { Card } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

interface ProductCardProps {
  p_title: string;
  p_price: number;
  p_priceId: string;
  p_image: string;
  p_rating: string;
  p_ratingCount: number;
  p_description: string;
}

const { Meta } = Card;

const ProductCard: React.FC<ProductCardProps> = ({
  p_image,
  p_title,
  p_description,
  p_price,
}) => {
  // console.log("product", productData);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/productd");
  };
  return (
    <>
      <div>
        <Card hoverable className="w-60" onClick={handleClick}>
          {/* <NavLink to="/productd"> */}
          <img src={p_image[0]} alt={""} />
          <Meta
            title={p_title}
            // description="iPhone 15 pro max 512gb with apple m17 chip with fast processing and smooth experience with titanium body"
          />
          <p className="line-clamp-2 mt-2">{p_description}</p>
          <div className="flex justify-between gap-2 mt-2">
            <p>
              <strong className="text">{p_price} &#8377;</strong>
            </p>
            <p>⭐4.5</p>
          </div>
          {/* </NavLink> */}
        </Card>
      </div>
    </>
  );
};

export default ProductCard;
