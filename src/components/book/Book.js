import React, { useState } from "react";
import BookModal from "./BookModal";

import useAuthStore from "../../store/useAuthStore";
import classes from "./Book.module.css";

const Book = ({ book, key }) => {
  const { isSigned } = useAuthStore();
  const [bookModal, setBookModal] = useState(null);

  const openModal = (book, key) => {
    setBookModal(book);
  };

  const closeModal = () => {
    setBookModal(null);
  };

  return (
    <>
      <li key={key}>
        <div className={classes.book}>
          <a href={"#" + book._id} onClick={() => openModal(book)}>
            <img src={book.image} alt={book.title}></img>
            <p>{book.title}</p>
          </a>
          <div className={classes.book}>
            {isSigned && (
              <button onClick={() => {}} className={classes.button}>
                Order Book
              </button>
            )}
          </div>
        </div>
      </li>
      {bookModal && <BookModal book={bookModal} closeModal={closeModal} />}
    </>
  );
};

export default Book;
