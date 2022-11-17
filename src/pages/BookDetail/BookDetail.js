import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import "./style.css";
import useBooksStore from "../../store/useBooksStore";
import Button from "../../components/ui/Button";

import classes from "./BookDetail.module.css";
import CustomGrid from "../../components/ui/CustomGrid";

const BookDetail = () => {
  const { bookView } = useBooksStore();

  return (
    <Container className="product-view">
      <Grid container>
        <Grid item xs={12} md={6} className="image-wrapper">
          <img src={bookView.cover_image} alt={bookView.title} />
        </Grid>
        <Grid item xs={12} md={4} className="text">
          <Typography variant="h2">
            <b>{bookView.title}</b>
          </Typography>
          <hr />
          <Typography variant="p">{bookView.synopsis}</Typography>
          <br />
          <br />
          <Grid container>
            <CustomGrid label="ISBN" text={bookView.isbn} />
            <CustomGrid
              label="Publication Date"
              text={bookView.publication_date}
            />
            <CustomGrid label="Language" text={bookView.language} />
            <CustomGrid label="Genre" text={bookView.genre} />
            <CustomGrid label="Author" text={bookView.author} />
            <CustomGrid label="Stock" text={bookView.amount} />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                type="button"
                className={classes.button}
                text={bookView.amount ? "Order Book" : "Out of Stock"}
                disabled={bookView.amount === 0}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetail;
