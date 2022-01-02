import { HeartOutlined, HeartFilled, HomeOutlined } from "@ant-design/icons";
import "./card.css";
import { useNavigate } from "react-router";
import ImageSlider from "../ImageSlider";
const MyCard = ({ property }) => {
  const history = useNavigate();

  return (
    <div className="card">
      <div className="card__header">
        {/* <img
          src={property?.images[0]}
          alt="card__image"
          className="card__image"
          width="600"
          height="234"
        /> */}
        <ImageSlider images={property.images} />
      </div>
      <div
        className="card__body"
        onClick={() => {
          history(`/propertyDetail/${property?.id}`);
          window.scrollTo(0, 0);
        }}
      >
        <p>
          {property?.name}
          {property?.favorite === "true" ? <HeartFilled /> : <HeartOutlined />}
        </p>
        <h4>$ {property?.price}</h4>
        <ul>
          <li style={{ display: "flex" }}>
            <HomeOutlined />
            <strong>{property?.locality}</strong>
          </li>
          <li>{property?.bedrooms} bed</li>
          <li>{property?.bath} bath</li>
          <li>{property?.carpetArea}</li>
          <li>{property?.views} views</li>
        </ul>
        <p>{property?.description}</p>
      </div>
    </div>
  );
};

export default MyCard;
