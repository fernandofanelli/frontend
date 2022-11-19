import React from "react";
import { Button } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CarouselItem = React.forwardRef(({ imageSrc, buttonColor, text, to }) => {
  return (
    <Carousel.Item>
      <img className="d-block w-100" src={imageSrc} alt="slide" />
      <Carousel.Caption>
        <Button size="large" variant="contained" color={buttonColor} href={to}>
          {text}
        </Button>
      </Carousel.Caption>
    </Carousel.Item>
  );
});
export default CarouselItem;
