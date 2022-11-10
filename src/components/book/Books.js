import React, { useEffect } from "react";
import Book from "./Book";
import { Fade } from "react-awesome-reveal";

import classes from "./Books.module.css";
import useBooksStore from "../../store/useBooksStore";

const Books = () => {
  const { books, getBooks } = useBooksStore();

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Fade bottom cascade triggerOnce damping={0.2}>
      {!books ? (
        <div>Loading...</div>
      ) : (
        <ul className={classes.books}>
          {books.map((book, key) => (
            <Book book={book} key={key} />
          ))}
        </ul>
      )}
    </Fade>
  );
};

export default Books;
