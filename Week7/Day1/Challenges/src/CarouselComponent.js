
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import CSS du carousel

function CarouselComponent() {
  return (
    <Carousel showThumbs={false} infiniteLoop autoPlay>
      <div>
        <img src="https://source.unsplash.com/800x400/?hongkong" alt="Hong Kong" />
        <p className="legend">Hong Kong</p>
      </div>
      <div>
        <img src="https://source.unsplash.com/800x400/?macao" alt="Macao" />
        <p className="legend">Macao</p>
      </div>
      <div>
        <img src="https://source.unsplash.com/800x400/?japan" alt="Japan" />
        <p className="legend">Japan</p>
      </div>
      <div>
        <img src="https://source.unsplash.com/800x400/?lasvegas" alt="Las Vegas" />
        <p className="legend">Las Vegas</p>
      </div>
    </Carousel>
  );
}

export default CarouselComponent;
