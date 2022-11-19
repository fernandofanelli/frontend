import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo1 from "../../assets/2.jpeg";
import logo2 from "../../assets/3.jpeg";
import logo3 from "../../assets/4.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomCarousel = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100" src={logo1} alt="first slide" />
        <Carousel.Caption>
          <Button
            size="large"
            variant="contained"
            color="inherit"
            href="#books"
          >
            Explore
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={logo3} alt="Second slide" />
        <Carousel.Caption>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            component={Link}
            to="/cart"
          >
            Checkout Cart
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={logo2} alt="Second slide" />
        <Carousel.Caption>
          <Button size="large" variant="contained" color="primary" href="#foot">
            Other Works
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;
