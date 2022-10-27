import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import CustomModal from "../../components/ui/modal/CustomModal";
import useAuthStore from "../../store/useAuthStore";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const { isSigned, isLoading, errMsg, signIn, signUp, cleanErrMsg } =
    useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (isSigned) navigate("/profile");
  }, [isSigned]);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const closeModal = () => {
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
    } else {
      userData = { ...userData, name: nameInputRef.current.value };
      signUp(userData);
    }
  };

  const customModalContent = (
    <div>
      <h1>
        <p>{"Authentication Error"}</p>
      </h1>
      <p>{errMsg}</p>
      <Button type="button" className={classes.actions} onClick={closeModal}>
        Close
      </Button>
    </div>
  );

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
        <CustomModal closed={closeModal}>{customModalContent}</CustomModal>
      )}
    </>
  );
};

export default AuthForm;
