import { useRef, useEffect, useState } from "react";
import { Buffer } from "buffer";

import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import CustomModal from "../ui/CustomModal";
import CustomErrorModal from "../ErrorModal/CustomErrorModal";

import useAuthStore from "../../store/useAuthStore";
import useBooksStore from "../../store/useBooksStore";
import classes from "./BookFormModal.module.css";

const BookFormModal = ({
  closeModal,
  formTitle,
  currentBookId = 0,
  newBook = false,
}) => {
  const { userData } = useAuthStore();
  const {
    getBook,
    updateBook,
    bookView,
    bookCreated,
    bookUpdated,
    errMsg,
    cleanErrMsg,
    cleanBookCreated,
    cleanBookUpdated,
    postBook,
  } = useBooksStore();
  const [title, setTitle] = useState();
  const [isbn, setIsbn] = useState();
  const [synopsis, setSynopsis] = useState();
  const [publicationDate, setPublicationDate] = useState();
  const [language, setLanguage] = useState();
  const [author, setAuthor] = useState();
  const [genre, setGenre] = useState();
  const [publisher, setPublisher] = useState();
  const titleInputRef = useRef();
  const isbnInputRef = useRef();
  const synopsisInputRef = useRef();
  const publicationDateInputRef = useRef();
  const languageInputRef = useRef();
  const genreInputRef = useRef();
  const publisherInputRef = useRef();
  const authorInputRef = useRef();

  const [file, setFile] = useState();
  const [decoded, setDecoded] = useState();
  const FILE_MAX_SIZE_KB = 200;

  useEffect(() => {
    if (currentBookId > 0) getBook(currentBookId);
  }, []);

  useEffect(() => {
    setTitle(bookView?.title);
    setIsbn(bookView?.isbn);
    setSynopsis(bookView?.synopsis);
    setPublicationDate(bookView?.publication_date);
    setLanguage(bookView?.language);
    setAuthor(bookView?.author);
    setGenre(bookView?.genre);
    setPublisher(bookView?.publisher);
  }, [bookView]);

  useEffect(() => {
    if (bookCreated || bookUpdated) closeModal();
    cleanBookCreated();
    cleanBookUpdated();
  }, [bookCreated, bookUpdated]);

  const closeErrorModal = () => {
    cleanErrMsg();
  };

  const validateFileSize = () => {
    //max length will be 300k chars, this is 200kb aprox
    const fsize = Math.round(file.size / 1024);
    const isValid = fsize <= FILE_MAX_SIZE_KB;
    if (!isValid) alert("Invalid file size");
    return isValid;
  };

  const validateFileType = () => {
    const allowedExtensions = ["image/jpg", "image/jpeg", "image/png"];
    const isValid = allowedExtensions.includes(file.type);
    if (!isValid) alert("Invalid file type");
    return isValid;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (validateFileType() && validateFileSize()) {
      let bookData = {
        uid: userData.userId,
        title: titleInputRef.current.value,
        isbn: isbnInputRef.current.value,
        publication_date: publicationDateInputRef.current.value,
        synopsis: synopsisInputRef.current.value,
        cover_image: decoded,
        amount: 1,
        language: languageInputRef.current.value,
        genre: genreInputRef.current.value,
        publisher: publisherInputRef.current.value,
        author: authorInputRef.current.value,
      };
      if (currentBookId > 0) updateBook(bookData, currentBookId);
      else postBook(bookData);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadHandler = async (event) => {
    setFile(event.target.files[0]);

    if (event.target.files.length > 0) {
      const base64 = await convertBase64(event.target.files[0]);
      const encoded = Buffer.from(base64).toString("base64");
      const decoded = Buffer.from(encoded, "base64").toString("utf8");
      setDecoded(decoded);
    }
  };

  const CustomModalContent = (
    <CustomErrorModal
      title="Create/Update Error"
      errMsg={errMsg}
      onClick={closeErrorModal}
    />
  );
  const FormInputs = (
    <>
      <FormInput
        className={classes.control}
        type="text"
        text="Title"
        innerRef={titleInputRef}
        maxLength="60"
        value={newBook ? "" : title}
      />
      <FormInput
        className={classes.control}
        type="file"
        text="Image File (up to 200kb)"
        onChange={uploadHandler}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Synopsis"
        innerRef={synopsisInputRef}
        maxLength="1100"
        value={newBook ? "" : synopsis}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="ISBN"
        innerRef={isbnInputRef}
        maxLength="13"
        value={newBook ? "" : isbn}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Publication Date"
        innerRef={publicationDateInputRef}
        maxLength="4"
        value={newBook ? "" : publicationDate}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Language"
        innerRef={languageInputRef}
        maxLength="2"
        value={newBook ? "" : language}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Genre"
        innerRef={genreInputRef}
        maxLength="20"
        value={newBook ? "" : genre}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Author"
        innerRef={authorInputRef}
        value={newBook ? "" : author}
      />
      <FormInput
        className={classes.control}
        type="text"
        text="Publisher"
        innerRef={publisherInputRef}
        value={newBook ? "" : publisher}
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
        <h1>{formTitle}</h1>
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
