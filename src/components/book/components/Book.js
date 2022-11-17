import React, { useState } from "react";
import BookModal from "./BookModal";

import Button from "../../ui/Button";
import useAuthStore from "../../../store/useAuthStore";
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

  const StockButton = (
    <Button
      type="button"
      className={classes.button}
      onClick={() => console.log("Press")}
      disabled={book.amount === 0}
      text={book.amount ? "Order Book" : "Out of Stock"}
    />
  );

  return (
    <div>
      <li key={key}>
        <div className={classes.book}>
          <a href={bookRef} onClick={() => openModal(book)}>
            <img src={book.cover_image} alt={book.title} />
            <p className={classes.title}>{book.title}</p>
          </a>
          {isSigned && StockButton}
        </div>
      </li>
      {bookModal && <BookModal book={bookModal} closeModal={closeModal} />}
    </div>
  );
};

export default Book;
