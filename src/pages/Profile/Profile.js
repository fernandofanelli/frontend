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
    bookUpdated,
    bookCreated,
    cleanBookDeleted,
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
  }, [bookDeleted, bookReturned, bookUpdated, bookCreated]);

  const openUploadBookModal = () => {
    setUploadBook(true);
  };

  const closeUploadBookModal = () => {
    cleanCurrentBookId();
    setUploadBook(false);
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

  const BorrowedTipMessage = (
    <div>
      <p className={classes.infoMessage}>
        Currently you don't have any book borrowed. Remember you can borrowed up
        to 5 books.
      </p>
      <p className={classes.infoMessage}>
        Get started by pressing "Order Book" in the Home.
      </p>
    </div>
  );

  const OwnedTipMessage = (
    <div>
      <p className={classes.infoMessage}>
        Currently you don't have any books owned. Remember you don't have limits
        on the amount of books you want to upload.
      </p>
      <p className={classes.infoMessage}>
        Get started by pressing "Upload Book" next to your profile icon.
      </p>
    </div>
  );

  return (
    <div>
      <h2 className={classes.section}>Borrowed Books</h2>
      {borrowedBooks.length === 0 ? (
        BorrowedTipMessage
      ) : (
        <Carousel className={classes.carousel} responsive={responsive}>
          {borrowedBooks.map((bb, key) => (
            <Book book={bb} key={key} buttonName="Return" hideExtraData />
          ))}
        </Carousel>
      )}
      <h2 className={classes.section}>Owned Books</h2>
      <div className={classes.container}>
        {userBooks.length === 0 ? (
          OwnedTipMessage
        ) : (
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
        )}
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
