import {
  BASE_URL,
  GET_USER_BOOKS_URL,
  GET_ALL_USER_BOOKS_URL,
  GET_ALL_USER_BORROWING_BOOKS_URL,
  ORDER_BOOK_URL,
  RETURN_BOOK_URL,
} from "./constants";
import { getCurrentUserToken } from "../utils/service";

export const getUserBooks = async (uid) =>
  await fetch(
    `${BASE_URL}${GET_USER_BOOKS_URL.replace(":uid", uid)}`,
    getMethod()
  );

export const getAllUserBooks = async () =>
  await fetch(`${BASE_URL}${GET_ALL_USER_BOOKS_URL}`, getMethod());

export const getAllUserBorrowingBooks = async (uid) =>
  await fetch(
    `${BASE_URL}${GET_ALL_USER_BORROWING_BOOKS_URL.replace(":uid", uid)}`,
    getMethod()
  );

export const postOrderBook = async (data) =>
  await fetch(`${BASE_URL}${ORDER_BOOK_URL}`, reqMethod(data));

export const returnOrderBook = async (data) =>
  await fetch(`${BASE_URL}${RETURN_BOOK_URL}`, patchMethod(data));

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

const patchMethod = (data) => {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCurrentUserToken(),
    },
    body: JSON.stringify(data),
  };
};

const getMethod = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCurrentUserToken(),
    },
  };
};
