import React, { useEffect, useState } from "react";
import Book from "./components/Book";
import CustomModal from "../ui/CustomModal";
import CustomErrorModal from "../ErrorModal/CustomErrorModal";
import { Grid, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useStyles from "./styles";

import useBooksStore from "../../store/useBooksStore";
import useUserBooksStore from "../../store/useUserBooksStore";
import CustomCarousel from "../Carousel/CustomCarousel";

const Books = () => {
  const {
    books,
    getBooks,
    searchBooks,
    searchedBooks,
    cleanSearchBooks,
    bookDeleted,
    cleanBookDeleted,
    errMsg,
    cleanErrMsg,
  } = useBooksStore();
  const { bookOrdered, userBookErrMsg, cleanUserBookErrMsg } =
    useUserBooksStore();
  const [searchBook, setSearchBook] = useState("");
  const classes = useStyles();

  useEffect(() => {
    getBooks();
    cleanBookDeleted();
  }, [bookDeleted, bookOrdered]);

  useEffect(() => {
    if (searchBook.length === 0) cleanSearchBooks();
    if (searchBook.length > 2) searchBooks(searchBook);
  }, [searchBook]);

  const searchHandler = (e) => {
    setSearchBook(e.target.value);
  };

  const closeErrorModal = () => {
    cleanErrMsg();
    cleanUserBookErrMsg();
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
      <Book
        book={book}
        disabled={book.amount === 0}
        buttonName={book.amount ? "Order Book" : "Out of Stock"}
      />
    </Grid>
  ));

  const SearchedBook = searchedBooks.map((book) => (
    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3} id="books">
      <Book
        book={book}
        disabled={book.amount === 0}
        buttonName={book.amount ? "Order Book" : "Out of Stock"}
      />
    </Grid>
  ));

  const CustomDeleteErrorModalContent = (
    <CustomErrorModal
      title="Delete Error"
      errMsg={errMsg}
      onClick={closeErrorModal}
    />
  );

  const CustomOrderErrorModalContent = (
    <CustomErrorModal
      title="Order Error"
      errMsg={userBookErrMsg}
      onClick={closeErrorModal}
    />
  );

  return (
    <section>
      <div className={classes.content}>
        <CustomCarousel />
      </div>
      {SearchBar}
      <div className={classes.content}>
        <Grid container justify="center" spacing={5}>
          {searchBook.length < 3 ? AllBook : SearchedBook}
        </Grid>
      </div>
      {errMsg.length !== 0 && (
        <CustomModal closed={closeErrorModal}>
          {CustomDeleteErrorModalContent}
        </CustomModal>
      )}
      {userBookErrMsg.length !== 0 && (
        <CustomModal closed={closeErrorModal}>
          {CustomOrderErrorModalContent}
        </CustomModal>
      )}
    </section>
  );
};

export default Books;
