import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CustomModal from "../../ui/CustomModal";
import Button from "../../ui/Button";
import classes from "./BookModal.module.css";
import BookDetail from "../../../pages/BookDetail/BookDetail";
import useBooksStore from "../../../store/useBooksStore";
import useAuthStore from "../../../store/useAuthStore";

const BookModal = ({ book, closeModal }) => {
  const navigate = useNavigate();
  const { isSigned } = useAuthStore();
  const { setBookView } = useBooksStore();
  const [shorterSynopsis, setShorterSynopsis] = useState("false");
  const [showBookDetails, setShowBookDetails] = useState(false);
  const cssCloseButton = [classes.button, classes.closeModal];
  const cssOrderButton = [classes.button, classes.buttonOrder];
  const MAX_AMOUNT_WORDS = 500;

  useEffect(() => {
    setShorterSynopsis(book.synopsis);
    if (book.synopsis.length > MAX_AMOUNT_WORDS)
      setShorterSynopsis(book.synopsis.substring(0, MAX_AMOUNT_WORDS) + "...");
  }, []);

  const readMoreHandler = () => {
    navigate("/book/" + book.id);
    setBookView(book);
    setShowBookDetails(true);
  };

  const StockButton = (
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
          <img
            src={book.cover_image}
            alt={book.title}
            className={classes.imgWrapper}
          ></img>
          <Button
            className={cssCloseButton.join(" ")}
            onClick={closeModal}
            text="X"
          />
          <div className={classes.summary}>
            <p className={classes.title}>
              <b>{book.title}</b>
            </p>
            <hr />
            <p className={classes.synopsis}>{shorterSynopsis}</p>

            <div className={classes.buttonContainer}>
              {isSigned && ReadMore}
              {isSigned && StockButton}
            </div>
          </div>
        </div>
      </CustomModal>
      {showBookDetails && <BookDetail />}
    </>
  );
};

export default BookModal;
