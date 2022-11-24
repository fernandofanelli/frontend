import React, { useEffect, useState } from "react";
import Book from "./components/Book";
import { Grid, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useStyles from "./styles";

import useBooksStore from "../../store/useBooksStore";
import CustomCarousel from "../Carousel/CustomCarousel";

const Books = () => {
  const { books, getBooks, searchBooks, searchedBooks, cleanSearchBooks } =
    useBooksStore();
  const [searchBook, setSearchBook] = useState("");
  const classes = useStyles();

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if (searchBook.length === 0) cleanSearchBooks();
    if (searchBook.length > 2) searchBooks(searchBook);
  }, [searchBook]);

  const searchHandler = (e) => {
    setSearchBook(e.target.value);
  };

  const SearchBar = (
    <div className={classes.searchs}>
      <Input
        className={classes.searchb}
        type="text"
        placeholder="Search..."
        onChange={searchHandler}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon fontSize="medium" htmlColor="black" />
          </InputAdornment>
        }
      />
    </div>
  );

  const AllBook = books.map((book) => (
    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3} id="books">
      <Book book={book} />
    </Grid>
  ));

  const SearchedBook = searchedBooks.map((book) => (
    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3} id="books">
      <Book book={book} />
    </Grid>
  ));

  return (
    <section>
      <div className={classes.content}>
        <CustomCarousel />
      </div>
      {SearchBar}
      <div className={classes.content}>
        <Grid
          className={classes.container}
          container
          justify="center"
          spacing={5}
        >
          {searchBook.length < 3 ? AllBook : SearchedBook}
        </Grid>
      </div>
    </section>
  );
};

export default Books;
