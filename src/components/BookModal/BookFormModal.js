import { useRef, useEffect, useState } from "react";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import CustomModal from "../ui/CustomModal";
import CustomErrorModal from "../ErrorModal/CustomErrorModal";

import useAuthStore from "../../store/useAuthStore";
import useBooksStore from "../../store/useBooksStore";
import classes from "./BookFormModal.module.css";

const BookFormModal = ({ closeModal, currentBookId = 0 }) => {
  const { userData } = useAuthStore();
  const { getBook, updateBook, bookView, bookCreated, bookUpdated, errMsg, cleanErrMsg, cleanBookCreated, cleanBookUpdated, cleanCurrentBookId, postBook } =
    useBooksStore();
  const [ title, setTitle ] = useState();
  const titleInputRef = useRef();
  const isbnInputRef = useRef();
  const synopsisInputRef = useRef();
  const publicationDateInputRef = useRef();
  const coverImageInputRef = useRef();
  const languageInputRef = useRef();
  const genreInputRef = useRef();
  const publisherInputRef = useRef();
  const authorInputRef = useRef();

  useEffect(() => {
    if( currentBookId > 0 ){
      getBook(currentBookId)
      titleInputRef.current = bookView.title
      setTitle(bookView.title)
    }
  }, [currentBookId]);

  useEffect(() => {
    if (bookCreated) closeModal();
    cleanBookCreated();
    cleanBookUpdated();
  }, [bookCreated, bookUpdated]);

  const closeErrorModal = () => {
    cleanErrMsg();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let bookData = {
      uid: userData.userId,
      title: titleInputRef.current.value,
      isbn: isbnInputRef.current.value,
      publication_date: publicationDateInputRef.current.value,
      synopsis: synopsisInputRef.current.value,
      cover_image: coverImageInputRef.current.value,
      amount: 1,
      language: languageInputRef.current.value,
      genre: genreInputRef.current.value,
      publisher: publisherInputRef.current.value,
      author: authorInputRef.current.value,
    };
  console.log("updateBook ->",currentBookId)
  if(currentBookId > 0){ updateBook(bookData, currentBookId)}
  else postBook(bookData);
  };

  const CustomModalContent = (
    <CustomErrorModal
      title="Book creation Error"
      errMsg={errMsg}
      onClick={closeErrorModal}
    />
  );
  console.log("titleInputRef.current ->",titleInputRef.current)
  console.log("titleInputRef ->",titleInputRef)
  const FormInputs = (
    <>
      <FormInput
        className={classes.control}
        type="text"
        text="Title"
        innerRef={titleInputRef}
        maxLength="60"
        //value={titleInputRef.current === "undefined" ? "" : title}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Image"
        innerRef={coverImageInputRef}
        maxLength="200"
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Synopsis"
        innerRef={synopsisInputRef}
        maxLength="1100"
      />
      <FormInput
        className={classes.control}
        type="text"
        text="ISBN"
        innerRef={isbnInputRef}
        maxLength="13"
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Publication Date"
        innerRef={publicationDateInputRef}
        maxLength="4"
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Language"
        innerRef={languageInputRef}
        maxLength="2"
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Genre"
        innerRef={genreInputRef}
        maxLength="20"
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Author"
        innerRef={authorInputRef}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Publisher"
        innerRef={publisherInputRef}
      />
    </>
  );

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      width: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "4px",
      backgroundColor: "transparent",
      border: "none",
      zIndex: "1000",
    },
  };

  return (
    <CustomModal closed={closeModal} style={modalStyle}>
      <section className={classes.auth}>
        <h1>Upload New Book</h1>
        <form onSubmit={submitHandler}>
          {FormInputs}
          <div className={classes.actions}>
            <Button text="Submit" />
          </div>
        </form>
      </section>

      {errMsg.length !== 0 && (
        <CustomModal closed={closeErrorModal}>{CustomModalContent}</CustomModal>
      )}
    </CustomModal>
  );
};

export default BookFormModal;
