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
import useBooksStore from "../../../store/useBooksStore";
import useStyles from "./styles";

const Book = ({ book }) => {
  const { isSigned } = useAuthStore();
  const { setBookView } = useBooksStore();
  const [shorterTitle, setShorterTitle] = useState("false");
  const classes = useStyles();

  useEffect(() => {
    setShorterTitle(book.title);
    if (book.title.length > 25)
      setShorterTitle(book.title.substring(0, 20) + "...");
  }, []);

  return (
    <Card className={classes.root}>
      <Link to={`/book/${book.id}`} onClick={() => setBookView(book)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={book.cover_image}
            title={book.title}
          />
        </CardActionArea>
      </Link>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h6">{shorterTitle}</Typography>
          <Typography variant="h6" color="secondary">
            Amount: <b>{book.amount}</b>
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        {isSigned && (
          <Button
            variant="contained"
            className={classes.button}
            endIcon={<BookmarkBorderIcon />}
            onClick={() => console.log("Press")}
          >
            <b>{book.amount ? "Order Book" : "Out of Stock"}</b>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Book;
