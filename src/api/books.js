import {
  BASE_URL,
  GET_BOOKS_URL,
  GET_BOOK_URL,
  GET_BOOK_MAPPED_URL,
  GET_MATCHING_BOOKS_URL,
  POST_BOOK_URL,
  DELETE_BOOK_URL,
  PATCH_BOOK_URL,
} from "./constants";
import { getCurrentUserToken } from "../utils/service";

export const getBooks = async () => await fetch(`${BASE_URL}${GET_BOOKS_URL}`);

export const getBook = async (bid) =>
  await fetch(`${BASE_URL}${GET_BOOK_URL.replace("bid", bid)}`);

export const getBookMapped = async (bid) =>
  await fetch(`${BASE_URL}${GET_BOOK_MAPPED_URL.replace("bid", bid)}`);

export const getMatchingBooks = async (value) =>
  await fetch(
    `${BASE_URL}${GET_MATCHING_BOOKS_URL.replace(":searchValue", value)}`
  );

export const postBook = async (data) =>
  await fetch(`${BASE_URL}${POST_BOOK_URL}`, reqMethod(data));

export const deleteBook = async (data) =>
  await fetch(`${BASE_URL}${DELETE_BOOK_URL}`, delMethod(data));

export const patchBook = async (data, bid) =>
  await fetch(
    `${BASE_URL}${PATCH_BOOK_URL.replace("bid", bid)}`,
    patchMethod(data)
  );

const reqMethod = (data) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: getCurrentUserToken(),
    },
    body: JSON.stringify(data),
  };
};

const delMethod = (data) => {
  return {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCurrentUserToken(),
    },
    body: JSON.stringify(data),
  };
};

const patchMethod = (data) => {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Headers":
      //   "Origin, X-Requested-With, Content-Type, Accept",
      Authorization: getCurrentUserToken(),
    },
    body: JSON.stringify(data),
  };
};
