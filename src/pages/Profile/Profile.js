import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Book from "../../components/Book/components/Book";
import Carousel from "react-multi-carousel";
import BookFormModal from "../../components/BookModal/BookFormModal";

import useAuthStore from "../../store/useAuthStore";
import useBooksStore from "../../store/useBooksStore";
import useUserBooksStore from "../../store/useUserBooksStore";
import useStyles from "./styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const { userData } = useAuthStore();
  const {
    bookDeleted,
    cleanBookDeleted,
    setCurrentBookId,
    cleanCurrentBookId,
    currentBookId,
  } = useBooksStore();
  const {
    userBooks,
    getUserBooks,
    borrowedBooks,
    getAllUserBorrowingBooks,
    bookReturned,
    cleanBookReturned,
  } = useUserBooksStore();
  const [uploadBookModal, setUploadBook] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    getUserBooks(userData.userId);
    getAllUserBorrowingBooks(userData.userId);

    cleanBookDeleted();
    cleanBookReturned();
  }, [bookDeleted, bookReturned]);

  const openUploadBookModal = () => {
    // setCurrentBookId(currentBookId)
    setUploadBook(true);
  };

  const closeUploadBookModal = () => {
    cleanCurrentBookId();
    setUploadBook("");
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
      <Carousel className={classes.carousel} responsive={responsive}>
        {borrowedBooks.map((bb) => (
          <Book book={bb} buttonName="Return" hideExtraData />
        ))}
      </Carousel>
      <h2 className={classes.section}>Owned Books</h2>
      <div className={classes.container}>
        <Grid container justify="center" spacing={1}>
          {userBooks.map((ub, key) => (
            <Grid item key={key} xs={12} sm={6} md={4} lg={3} id="books">
              <Book
                book={ub}
                buttonName="Edit"
                hideExtraData
                showRemoveButton
                editAction={openUploadBookModal}
                currentBookId={currentBookId}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      {uploadBookModal && (
        <BookFormModal
          closeModal={closeUploadBookModal}
          currentBookId={currentBookId}
          formTitle="Edit Book"
        />
      )}
    </div>
  );
};

export default Profile;
