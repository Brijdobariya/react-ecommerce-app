import { Card } from "antd";

interface ProductCardProps {
  p_id: string;
  p_title: string;
  p_price: number;
  p_image: string[] | string;
  p_rating: string;
  p_description: string;
}

const { Meta } = Card;

const ProductCard: React.FC<ProductCardProps> = ({
  p_id,
  p_image,
  p_title,
  p_description,
  p_price,
}) => {
  const getFirstImageUrl = () => {
    if (p_image && Array.isArray(p_image)) {
      // console.log("a", p_image);
      return p_image[0];
    } else {
      // console.log("b");
      return p_image;
    }
  };
  // console.log(getFirstImageUrl());

  // const img = `../../../backend/server/uploads/${p_image[0]}`;

  return (
    <>
      <div>
        {/* <NavLink to={"/productd/:id"}> */}
        <Card hoverable className="w-60">
          <img
            src={
              new URL(
                `../../../../backend/server/uploads/${getFirstImageUrl()}`,
                import.meta.url
              ).href
            }
            className="w-full h-48 overflow-hidden object-contain"
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
        {/* </NavLink> */}
      </div>
    </>
  );
};

export default ProductCard;
