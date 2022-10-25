import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import useAuthStore from "../../store/useAuthStore";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const { isSigned, isLoading, signIn, signUp } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let userData = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    if (isLogin) {
      signIn(userData);
      if (isSigned) navigate("/profile");
    } else {
      userData = { ...userData, name: nameInputRef.current.value };
      signUp(userData);
      if (isSigned) navigate("/profile");
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <FormInput
            className={classes.control}
            type="text"
            text="Your Name"
            innerRef={nameInputRef}
          />
        )}
        <FormInput
          className={classes.control}
          type="email"
          text="Your Email"
          innerRef={emailInputRef}
        />
        <FormInput
          className={classes.control}
          type="password"
          text="Your Password"
          innerRef={passwordInputRef}
        />
        <div className={classes.actions}>
          {!isLoading && (
            <Button>{isLogin ? "Login" : "Create Account"}</Button>
          )}
          {isLoading && <p>Sending Request</p>}
          <Button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
