import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Book from "../../components/Book/components/Book";
import Carousel from "react-multi-carousel";
import BookFormModal from "../../components/BookModal/BookFormModal";

import useAuthStore from "../../store/useAuthStore";
import useUserBooksStore from "../../store/useUserBooksStore";
import useBooksStore from "../../store/useBooksStore";
import useStyles from "./styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const { userData } = useAuthStore();
  const { userBooks, getUserBooks, borrowedBooks, getAllUserBorrowingBooks } =
  useUserBooksStore();
  const { setCurrentBookId, cleanCurrentBookId, currentBookId } = useBooksStore();
  const [uploadBookModal, setUploadBook] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    getUserBooks(userData.userId);
    getAllUserBorrowingBooks(userData.userId);
  }, []);

  const openUploadBookModal = () => {
    // setCurrentBookId(currentBookId)
    console.log("Old current book ID ->", currentBookId)
    setUploadBook(true);
  };
  
  const closeUploadBookModal = () => {
    cleanCurrentBookId();
    setUploadBook(null);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div>
      <h2 className={classes.section}>Borrowed Books</h2>
      <Carousel responsive={responsive}>
        {borrowedBooks.map((bb) => (
          <Book book={bb} buttonName="Return" hideExtraData />
        ))}
      </Carousel>
      <h2 className={classes.section}>Owned Books</h2>
      <div className={classes.content}>
        <Grid
          className={classes.container}
          container
          justify="center"
          spacing={5}
        >
          {userBooks.map((ub, key) => (
            <Grid item key={key} xs={12} sm={6} md={4} lg={3} id="books">
              <Book book={ub} buttonName="Edit" hideExtraData editAction = {openUploadBookModal} currentBookId = {currentBookId} />
            </Grid>
          ))}
        </Grid>
      </div>
      {uploadBookModal && <BookFormModal closeModal={closeUploadBookModal} currentBookId = {currentBookId} />}
    </div>
  );
};

export default Profile;
