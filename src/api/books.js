import {
  BASE_URL,
  GET_BOOKS_URL,
  GET_BOOK_URL,
  GET_USER_BOOKS_URL,
} from "./constants";

export const getBooks = async () => await fetch(`${BASE_URL}${GET_BOOKS_URL}`);

export const getBook = async (bid) =>
  await fetch(`${BASE_URL}${GET_BOOK_URL.replace("bid", bid)}`);

export const getUserBooks = async (uid) =>
  await fetch(`${BASE_URL}${GET_USER_BOOKS_URL.replace(":uid", uid)}`);

const reqMethod = (data) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};
