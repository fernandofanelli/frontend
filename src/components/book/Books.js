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
  const { books, getBooks } = useBooksStore();
  const [searchBook, setSearchBook] = useState("");
  const classes = useStyles();

  useEffect(() => {
    getBooks();
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
    </section>
  );
};

export default Books;
