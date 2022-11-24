import {
  BASE_URL,
  GET_BOOKS_URL,
  GET_BOOK_URL,
  GET_MATCHING_BOOKS_URL,
  POST_BOOK_URL,
} from "./constants";
import { getCurrentUserToken } from "../utils/service";

export const getBooks = async () => await fetch(`${BASE_URL}${GET_BOOKS_URL}`);

export const getBook = async (bid) =>
  await fetch(`${BASE_URL}${GET_BOOK_URL.replace("bid", bid)}`);

export const getMatchingBooks = async (value) =>
  await fetch(
    `${BASE_URL}${GET_MATCHING_BOOKS_URL.replace(":searchValue", value)}`
  );

export const postBook = async (data) =>
  await fetch(`${BASE_URL}${POST_BOOK_URL}`, reqMethod(data));

const reqMethod = (data) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCurrentUserToken(),
    },
    body: JSON.stringify(data),
  };
};
