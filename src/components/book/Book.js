import React, { useState } from "react";
import BookModal from "./BookModal";

import useAuthStore from "../../store/useAuthStore";
import classes from "./Book.module.css";

const Book = ({ book, key }) => {
  const { isSigned } = useAuthStore();
  const [bookModal, setBookModal] = useState(null);
  const [bookRef, setBookRef] = useState("");

  const openModal = (book, key) => {
    setBookRef("#" + book.id);
    setBookModal(book);
  };

  const closeModal = () => {
    setBookRef("/");
    setBookModal(null);
  };

  return (
    <div>
      <li key={key}>
        <div className={classes.book}>
          <a href={bookRef} onClick={() => openModal(book)}>
            <img src={book.image} alt={book.title}></img>
            <p>{book.title}</p>
          </a>
          <div className={classes.book}>
            {isSigned && book.available && (
              <button onClick={() => {}} className={classes.button}>
                Order Book
              </button>
            )}
          </div>
        </div>
      </li>
      {bookModal && <BookModal book={bookModal} closeModal={closeModal} />}
    </div>
  );
};

export default Book;
