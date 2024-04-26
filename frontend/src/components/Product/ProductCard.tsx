import { Card } from "antd";
import { NavLink } from "react-router-dom";

interface ProductCardProps {
  p_title: string;
  p_price: number;
  p_priceId: string;
  p_url: string;
  p_rating: string;
  p_ratingCount: number;
  p_description: string;
}

const { Meta } = Card;

const ProductCard: React.FC<ProductCardProps> = () => {
  return (
    <>
      <NavLink to="/productd">
        <Card hoverable className="w-60" onClick={() => {}}>
          <img
            src={"https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg"}
            alt={""}
          />
          <Meta
            title="iPhone 15 pro max 512gb Titanium black"
            description="iPhone 15 pro max 512gb with apple m17 chip with fast processing and smooth experience with titanium body"
          />
          <div className="flex justify-between gap-2 mt-2">
            <p>
              <strong> MRP:</strong> 80000
            </p>
            <p>⭐4.5</p>
          </div>
        </Card>
      </NavLink>
    </>
  );
};

export default ProductCard;
