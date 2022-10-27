import React from "react";

import useAuthStore from "../../store/useAuthStore";
import CustomModal from "../ui/modal/CustomModal";
import classes from "./BookModal.module.css";

const BookModal = ({ book, closeModal }) => {
  const { isSigned } = useAuthStore();
  const cssCloseButton = [classes.button, classes.closeModal];
  const cssOrderButton = [classes.button, classes.buttonOrder];

  const customModalContent = (
    <div className={classes.bookDetails}>
      <img src={book.image} alt={book.title}></img>
      <button className={cssCloseButton.join(" ")} onClick={closeModal}>
        X
      </button>
      <div className={classes.bookDetailsDescription}>
        <p>
          <strong>{book.title}</strong>
        </p>
        <p>{book.description}</p>
        {isSigned && (
          <button onClick={() => {}} className={cssOrderButton.join(" ")}>
            Order Book
          </button>
        )}
      </div>
    </div>
  );

  return <CustomModal closed={closeModal}>{customModalContent}</CustomModal>;
};

export default BookModal;
