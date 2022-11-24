import {
  BASE_URL,
  GET_BOOKS_URL,
  GET_BOOK_URL,
  GET_MATCHING_BOOKS_URL,
  GET_ALL_USER_BOOKS_URL,
  GET_USER_BOOKS_URL,
  GET_ALL_USER_BORROWING_BOOKS_URL,
} from "./constants";
import { getCurrentUserToken } from "../utils/service";

export const getBooks = async () => await fetch(`${BASE_URL}${GET_BOOKS_URL}`);

export const getBook = async (bid) =>
  await fetch(`${BASE_URL}${GET_BOOK_URL.replace("bid", bid)}`);

export const getAllUserBooks = async () =>
  await fetch(`${BASE_URL}${GET_ALL_USER_BOOKS_URL}`, getMethod());

export const getAllUserBorrowingBooks = async (uid) =>
  await fetch(
    `${BASE_URL}${GET_ALL_USER_BORROWING_BOOKS_URL.replace(":uid", uid)}`
  );

export const getUserBooks = async (uid) =>
  await fetch(
    `${BASE_URL}${GET_USER_BOOKS_URL.replace(":uid", uid)}`,
    getMethod()
  );

export const getMatchingBooks = async (value) =>
  await fetch(
    `${BASE_URL}${GET_MATCHING_BOOKS_URL.replace(":searchValue", value)}`
  );

const getMethod = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCurrentUserToken(),
    },
  };
};
