import React from "react";

import useAuthStore from "../../store/useAuthStore";
import CustomModal from "../ui/CustomModal";
import classes from "./BookModal.module.css";

const BookModal = ({ book, closeModal }) => {
  const { isSigned } = useAuthStore();
  const cssCloseButton = [classes.button, classes.closeModal];
  const cssOrderButton = [classes.button, classes.buttonOrder];

  return (
    <CustomModal closed={closeModal}>
      {" "}
      <div className={classes.bookDetails}>
        <img src={book.cover_image} alt={book.title}></img>
        <button className={cssCloseButton.join(" ")} onClick={closeModal}>
          X
        </button>
        <div className={classes.bookDetailsDescription}>
          <h4>
            <strong>{book.title}</strong>
          </h4>
          {/* <h5>{book.plot}</h5> */}
          <div className={classes.bookInformation}>
            <p>Author: {book.author}</p>
            <p>Language: {book.language}</p>
            <p>Genre: {book.genre}</p>
            <p>Publication Date: {book.publicationDate}</p>
          </div>
          {isSigned && book.available && (
            <button onClick={() => {}} className={cssOrderButton.join(" ")}>
              Order Book
            </button>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default BookModal;
