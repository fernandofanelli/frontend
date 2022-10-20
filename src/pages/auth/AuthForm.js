import { useRef, useState } from "react";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    console.log(enteredEmail);
    console.log(enteredPassword);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
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
          <Button>{isLogin ? "Login" : "Create Account"}</Button>
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
