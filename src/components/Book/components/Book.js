import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardActionArea,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Link } from "react-router-dom";

import useAuthStore from "../../../store/useAuthStore";
import useUserBooksStore from "../../../store/useUserBooksStore";
import useBooksStore from "../../../store/useBooksStore";
import useStyles from "./styles";

const Book = ({ book, buttonName = "", hideExtraData = false , editAction = ""}) => {
  const { isSigned, userData } = useAuthStore();
  const { setCurrentBookId, cleanCurrentBookId } = useBooksStore();
  const { orderBook, returnBook } = useUserBooksStore();
  const [shorterTitle, setShorterTitle] = useState("false");
  const [buttonText, setButtonText] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    setShorterTitle(book.title);
    if (book.title.length > 17)
      setShorterTitle(book.title.substring(0, 17) + "...");

    if (buttonName === "")
      setButtonText(book.amount ? "Order Book" : "Out of Stock");
    else setButtonText(buttonName);

    if (buttonName === "") setButtonDisable(book.amount === 0);
    else setButtonDisable(false);
  }, []);

  const buttonHandler = () => {
    if (buttonName === "Return") returnBookHandler();
    else if (buttonName === "Edit") editBookHandler();
    else orderBookHandler();
  };

  const returnBookHandler = () => {
    let body = {
      bid: book.id,
      uid: userData.userId,
    };
    returnBook(body);
  };

  const editBookHandler = () => {
    console.log("New current book ID ->",book.id)
    setCurrentBookId( book.id )
    editAction();
  };

  const orderBookHandler = () => {
    let body = {
      bid: book.id,
      uid: userData.userId,
    };
    orderBook(body);
  };

  const CustomButton = (
    <Button
      variant="contained"
      className={classes.button}
      endIcon={<BookmarkBorderIcon />}
      onClick={buttonHandler}
      disabled={buttonDisable}
    >
      <b>{buttonText}</b>
    </Button>
  );

  return (
    <Card className={classes.root}>
      <Link to={`/book/${book.id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={book.cover_image}
            title={book.title}
          />
        </CardActionArea>
      </Link>
      {!hideExtraData && (
        <CardContent>
          <div className={classes.cardContent}>
            <Typography variant="h6">{shorterTitle}</Typography>
            <Typography variant="h6" color="secondary">
              Amount: <b>{book.amount}</b>
            </Typography>
          </div>
        </CardContent>
      )}
      <CardActions disableSpacing className={classes.cardActions}>
        {isSigned && CustomButton}
      </CardActions>
    </Card>
  );
};

export default Book;
