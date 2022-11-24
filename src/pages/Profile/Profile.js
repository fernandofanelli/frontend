import Book from "../../components/Book/components/Book";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import useAuthStore from "../../store/useAuthStore";
import useBooksStore from "../../store/useBooksStore";
import classes from "./Profile.module.css";

import React, { useEffect, useState } from "react";
import { Grid, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const { books, userBooks, getUserBooks } = useBooksStore();
  const [searchBook, setSearchBook] = useState("");
  const { userData } = useAuthStore();

  useEffect(() => {
    getUserBooks(userData.id);
  }, []);

  const SearchBar = (
    <div className={classes.searchs}>
      <Input
        className={classes.searchb}
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchBook(event.target.value);
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon fontSize="medium" htmlColor="black" />
          </InputAdornment>
        }
      />
    </div>
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  console.log(userBooks);
  return (
    <div>
      <Carousel responsive={responsive}>
        {books.map((book) => (
          <Book book={book} />
        ))}
      </Carousel>
      {SearchBar}
      <div className={classes.content}>
        <Grid
          className={classes.container}
          container
          justify="center"
          spacing={5}
        >
          {books
            .filter((book) => {
              if (searchBook === "") return book;
              else if (
                book.title
                  .toLowerCase()
                  .includes(searchBook.toLocaleLowerCase())
              ) {
                return book;
              }
            })
            .map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4} lg={3} id="books">
                <Book book={book} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
