import { Carousel } from "antd";

function ImageSlider(props) {
  return (
    <div>
      <Carousel>
        {props?.images?.map((image, index) => (
          <div key={index}>
            <img
              alt="card__image"
              className="card__image"
              width="600"
              height="234"
              src={image}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
