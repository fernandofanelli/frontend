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
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import EditIcon from "@mui/icons-material/Edit";
import CustomModal from "../../ui/CustomModal";
import CustomErrorModal from "../../ErrorModal/CustomErrorModal";
import { Link } from "react-router-dom";

import useAuthStore from "../../../store/useAuthStore";
import useUserBooksStore from "../../../store/useUserBooksStore";
import useBooksStore from "../../../store/useBooksStore";
import useStyles from "./styles";

const Book = ({
  book,
  buttonName,
  hideExtraData = false,
  showRemoveButton = false,
  disabled = false,
  editAction = "",
}) => {
  const { isSigned, userData } = useAuthStore();
  const { deleteBook, errMsg, cleanErrMsg, setCurrentBookId } = useBooksStore();
  const { orderBook, returnBook, bookOrdered, cleanBookOrdered } =
    useUserBooksStore();
  const [shorterTitle, setShorterTitle] = useState("false");
  const classes = useStyles();

  useEffect(() => {
    setShorterTitle(book.title);
    if (book.title.length > 17)
      setShorterTitle(book.title.substring(0, 17) + "...");
    cleanBookOrdered();
  }, [bookOrdered]);

  const buttonHandler = () => {
    if (buttonName === "Return") returnBookHandler();
    else if (buttonName === "Edit") editBookHandler();
    else orderBookHandler();
  };

  const returnBookHandler = () => {
    let body = {
      bid: book.id,
      uid: parseInt(userData.userId),
    };
    returnBook(body);
  };

  const editBookHandler = () => {
    setCurrentBookId(book.id);
    editAction();
  };

  const removeBookHandler = () => {
    let body = {
      bid: book.id,
      uid: parseInt(userData.userId),
    };
    deleteBook(body);
  };

  const orderBookHandler = () => {
    let body = {
      bid: book.id,
      uid: parseInt(userData.userId),
    };
    orderBook(body);
  };

  const closeErrorModal = () => {
    cleanErrMsg();
  };

  const CustomButton = (
    <Button
      variant="contained"
      className={
        buttonName === "Return" ? classes.returnButton : classes.button
      }
      endIcon={
        buttonName === "Return" ? (
          <BookmarkAddedIcon />
        ) : buttonName === "Edit" ? (
          <EditIcon />
        ) : (
          <BookmarkBorderIcon />
        )
      }
      onClick={buttonHandler}
      disabled={disabled}
    >
      <b>{buttonName}</b>
    </Button>
  );

  const RemoveButton = (
    <Button
      variant="contained"
      className={classes.removeButton}
      endIcon={<BookmarkRemoveIcon />}
      onClick={removeBookHandler}
      disabled={disabled}
    >
      <b>Remove</b>
    </Button>
  );

  const CustomModalContent = (
    <CustomErrorModal
      title="Delete Error"
      errMsg={errMsg}
      onClick={closeErrorModal}
    />
  );

  return (
    <>
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
        <CardActions
          disableSpacing
          className={
            showRemoveButton ? classes.cardButtons : classes.cardActions
          }
        >
          {isSigned && CustomButton}
          {showRemoveButton && RemoveButton}
        </CardActions>
      </Card>
      {errMsg.length !== 0 && (
        <CustomModal closed={closeErrorModal}>{CustomModalContent}</CustomModal>
      )}
    </>
  );
};

export default Book;
