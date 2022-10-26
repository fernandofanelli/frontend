import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import Modal from "../../components/ui/modal/Modal";
import useAuthStore from "../../store/useAuthStore";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const { isSigned, isLoading, errMsg, signIn, signUp, cleanErrMsg } =
    useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (isSigned) navigate("/profile");
  }, [isSigned]);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const showModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    cleanErrMsg();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let userData = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    if (isLogin) {
      signIn(userData);
      if (!isSigned) showModal();
    } else {
      userData = { ...userData, name: nameInputRef.current.value };
      signUp(userData);
      if (!isSigned) showModal();
    }
  };

  return (
    <>
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
            {isLoading ? (
              <Button>Sending Request</Button>
            ) : (
              <>
                <Button>{isLogin ? "Login" : "Create Account"}</Button>
                <Button
                  type="button"
                  className={classes.toggle}
                  onClick={switchAuthModeHandler}
                >
                  {isLogin
                    ? "Create new account"
                    : "Login with existing account"}
                </Button>
              </>
            )}
          </div>
        </form>
      </section>

      {errMsg.length !== 0 && (
        <Modal
          label={"Authentication Error"}
          message={errMsg}
          show={modalIsOpen}
          closed={closeModal}
        />
      )}
    </>
  );
};

export default AuthForm;
