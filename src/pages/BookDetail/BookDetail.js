import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Button, Typography } from "@mui/material";
import CustomGrid from "../../components/ui/CustomGrid";

import useAuthStore from "../../store/useAuthStore";
import useBooksStore from "../../store/useBooksStore";

import "./style.css";

const BookDetail = () => {
  const { isSigned } = useAuthStore();
  const { getBook, bookView } = useBooksStore();
  let { id } = useParams();

  useEffect(() => {
    getBook(id);
  }, []);

  return (
    <Container className="product-view">
      <Grid container>
        <Grid item xs={12} md={6} className="image-wrapper">
          <img src={bookView.cover_image} alt={bookView.title} />
        </Grid>
        <Grid item xs={12} md={6} className="text">
          <Typography variant="h2">
            <b>{bookView.title}</b>
          </Typography>
          <hr />
          <Typography variant="p">{bookView.synopsis}</Typography>
          <br />
          <br />
          <Grid container spacing={2}>
            <CustomGrid label="ISBN" text={bookView.isbn} />
            <CustomGrid
              label="Publication Date"
              text={bookView.publication_date}
            />
            <CustomGrid label="Language" text={bookView.language} />
            <CustomGrid label="Genre" text={bookView.genre} />
            <CustomGrid label="Author" text={bookView.author} />
            <CustomGrid label="Publisher" text={bookView.publisher} />
            <CustomGrid label="Stock" text={bookView.amount} />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {isSigned && (
                <Button
                  className="button"
                  variant="contained"
                  disabled={bookView.amount === 0}
                >
                  <b>{bookView.amount ? "Order Book" : "Out of Stock"}</b>
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetail;
