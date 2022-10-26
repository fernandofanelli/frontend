import { BASE_URL, SIGN_IN_URL, SIGN_UP_URL } from "./constants";

export const signIn = async (data) =>
  await fetch(`${BASE_URL}${SIGN_IN_URL}`, reqMethod(data));

export const signUp = async (data) =>
  await fetch(`${BASE_URL}${SIGN_UP_URL}`, reqMethod(data));

const reqMethod = (data) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};
