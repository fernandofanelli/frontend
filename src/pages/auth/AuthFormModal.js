import { useRef, useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import CustomModal from "../../components/ui/CustomModal";
import useAuthStore from "../../store/useAuthStore";

import classes from "./AuthFormModal.module.css";

const AuthFormModal = ({ closeModal }) => {
  const { isSigned, isLoading, errMsg, signIn, signUp, cleanErrMsg } =
    useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (isSigned) closeModal();
  }, [isSigned]);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const closeErrorModal = () => {
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
      <Button
        type="button"
        className={classes.actions}
        onClick={closeErrorModal}
        text="Close"
      />
    </div>
  );

  const NameInput = (
    <FormInput
      className={classes.control}
      type="text"
      text="Your Name"
      innerRef={nameInputRef}
    />
  );

  const LoginInputs = (
    <>
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
    </>
  );

  const LoginButtons = (
    <>
      <Button text={isLogin ? "Login" : "Create Account"} />
      <Button
        type="button"
        className={classes.toggle}
        onClick={switchAuthModeHandler}
        text={isLogin ? "Create new account" : "Login with existing account"}
      />
    </>
  );

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      width: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "4px",
      backgroundColor: "transparent",
      border: "none",
    },
  };

  return (
    <CustomModal closed={closeModal} style={modalStyle}>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          {!isLogin && NameInput}
          {LoginInputs}
          <div className={classes.actions}>
            {isLoading ? <Button text="Sending Request" /> : LoginButtons}
          </div>
        </form>
      </section>

      {errMsg.length !== 0 && (
        <CustomModal closed={closeErrorModal}>{customModalContent}</CustomModal>
      )}
    </CustomModal>
  );
};

export default AuthFormModal;
