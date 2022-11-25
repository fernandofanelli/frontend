import { useRef, useEffect, useState } from "react";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import CustomModal from "../ui/CustomModal";
import CustomErrorModal from "../ErrorModal/CustomErrorModal";

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

  const CustomModalContent = (
    <CustomErrorModal
      title="Authentication Error"
      errMsg={errMsg}
      onClick={closeErrorModal}
    />
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
        maxLength="50"
      />
      <FormInput
        className={classes.control}
        type="password"
        text="Your Password"
        innerRef={passwordInputRef}
        maxLength="20"
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
        <CustomModal closed={closeErrorModal}>{CustomModalContent}</CustomModal>
      )}
    </CustomModal>
  );
};

export default AuthFormModal;
