import { HeartOutlined, HeartFilled, HomeOutlined } from "@ant-design/icons";
import "./card.css";

const MyCard = ({ property }) => {
  console.log(property?.favorite);
  return (
    <div class="card">
      <div class="card__header">
        <img
          src={property?.images[0]}
          alt="card__image"
          class="card__image"
          width="600"
          height="234"
        />
      </div>
      <div class="card__body">
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
