import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "@mui/material";
import useBooksStore from "../../store/useBooksStore";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import logo1 from "../../assets/2.jpeg";
import logo2 from "../../assets/3.jpeg";
import logo3 from "../../assets/4.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomCarousel = () => {
  const { books } = useBooksStore();

  const getRandomId = () => Math.floor(Math.random() * books.length + 1);

  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100" src={logo1} alt="first slide" />
        <Carousel.Caption>
          <Button
            size="large"
            variant="contained"
            color="inherit"
            component={Link}
            to={"/book/" + getRandomId()}
          >
            Explore
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={logo3} alt="Second slide" />
        <Carousel.Caption>
          <a href="https://www.youtube.com/watch?v=mCdA4bJAGGk&ab_channel=sweetblue.">
            <Button size="large" variant="contained" color="secondary">
              Surprise Me
            </Button>
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={logo2} alt="Second slide" />
        <Carousel.Caption>
          <Button size="large" variant="contained" color="primary" href="#foot">
            About Us
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;
