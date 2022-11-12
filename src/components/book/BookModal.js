import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/useAuthStore";
import CustomModal from "../ui/CustomModal";
import Button from "../ui/Button";
import classes from "./BookModal.module.css";
import BookDetail from "./BookDetail";

const BookModal = ({ book, closeModal }) => {
  const navigate = useNavigate();
  const { isSigned } = useAuthStore();
  const [showBookDetails, setShowBookDetails] = useState(false);
  const cssCloseButton = [classes.button, classes.closeModal];
  const cssOrderButton = [classes.button, classes.buttonOrder];

  const readMoreHandler = () => {
    navigate("/book/" + book.id);
    setShowBookDetails(true);
  };

  const stockButton = (
    <Button
      type="button"
      className={cssOrderButton.join(" ")}
      onClick={() => console.log("Press")}
      disabled={book.amount === 0}
      text={book.amount ? "Order Book" : "Out of Stock"}
    />
  );

  const ReadMore = (
    <Button
      type="button"
      className={cssOrderButton.join(" ")}
      onClick={readMoreHandler}
      disabled={false}
      text="Read More"
    />
  );

  return (
    <>
      <CustomModal closed={closeModal}>
        <div className={classes.bookDetails}>
          <img src={book.cover_image} alt={book.title}></img>
          <Button
            className={cssCloseButton.join(" ")}
            onClick={closeModal}
            text="X"
          />
          <div className={classes.summary}>
            <p>{book.title}</p>
            <p className={classes.synopsis}>{book.synopsis}</p>

            <div className={classes.buttonContainer}>
              {isSigned && ReadMore}
              {isSigned && stockButton}
            </div>
          </div>
        </div>
      </CustomModal>
      {showBookDetails && <BookDetail />}
    </>
  );
};

export default BookModal;
