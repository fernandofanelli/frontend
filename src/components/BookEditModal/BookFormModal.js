import { useRef, useEffect, useState } from "react";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import CustomModal from "../ui/CustomModal";
import useAuthStore from "../../store/useAuthStore";

import classes from "./BookFormModal.module.css";

const BookFormModal = ({ closeModal }) => {
  const { errMsg, cleanErrMsg } = useAuthStore();
  const titleInputRef = useRef();
  const isbnInputRef = useRef();
  const synopsisInputRef = useRef();
  const publicationDateInputRef = useRef();
  const coverImageInputRef = useRef();
  const languageInputRef = useRef();
  const genreInputRef = useRef();
  const publisherInputRef = useRef();
  const authorInputRef = useRef();

  const closeErrorModal = () => {
    cleanErrMsg();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let userData = {
      title: titleInputRef.current.value,
      isbn: isbnInputRef.current.value,
      publication_date: publicationDateInputRef.current.value,
      synopsis: synopsisInputRef.current.value,
      cover_image: coverImageInputRef.current.value,
      language: languageInputRef.current.value,
      genre: genreInputRef.current.value,
      publisher: publisherInputRef.current.value,
      author: authorInputRef.current.value,
    };
  };

  const customModalContent = (
    <div>
      <h1>
        <p>{"Book creation Error"}</p>
      </h1>
      <p>{errMsg}</p>
      <Button
        type="button"
        className={classes.actions}
        onClick={closeErrorModal}
        text="Close"
      />
    </div>
  );

  const FormInputs = (
    <>
      <FormInput
        className={classes.control}
        type="text"
        text="Title"
        innerRef={titleInputRef}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Image"
        innerRef={coverImageInputRef}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Synopsis"
        innerRef={synopsisInputRef}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="ISBN"
        innerRef={isbnInputRef}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Publication Date"
        innerRef={publicationDateInputRef}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Language"
        innerRef={languageInputRef}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Genre"
        innerRef={genreInputRef}
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
        <CustomModal closed={closeErrorModal}>{customModalContent}</CustomModal>
      )}
    </CustomModal>
  );
};

export default BookFormModal;
