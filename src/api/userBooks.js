import { BASE_URL, ORDER_BOOK_URL } from "./constants";
import { getCurrentUserToken } from "../utils/service";

export const postOrderBook = async (data) =>
  await fetch(`${BASE_URL}${ORDER_BOOK_URL}`, reqMethod(data));

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
