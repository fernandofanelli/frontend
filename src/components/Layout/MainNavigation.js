import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthFormModal from "../Auth/AuthFormModal";
import BookFormModal from "../BookModal/BookFormModal";

import useAuthStore from "../../store/useAuthStore";
import CustomAvatar from "../ui/CustomAvatar";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const navigate = useNavigate();
  const { isSigned, signOut, userData } = useAuthStore();
  const [authModal, setAuthModal] = useState(null);
  const [uploadBookModal, setUploadBook] = useState(null);
  const [initials, setInitials] = useState("");

  useEffect(() => {
    setInitials(userData === "undefined" ? "" : userData.name);
  }, [isSigned]);

  const logoutHandler = () => {
    signOut();
    navigate("/");
  };

  const openUploadBookModal = () => {
    setUploadBook(true);
  };

  const closeUploadBookModal = () => {
    setUploadBook(null);
  };

  const openLoginModal = () => {
    setAuthModal(true);
  };

  const closeLoginModal = () => {
    setAuthModal(null);
  };

  const LoginNavigation = (
    <nav>
      <ul>
        <li>
          <button onClick={openLoginModal}>Login</button>
        </li>
      </ul>
    </nav>
  );

  const LogoutNavigation = (
    <nav>
      <ul>
        <li>
          <Link to="/profile">
            <CustomAvatar name={initials} />
          </Link>
        </li>
        <li>
          <button onClick={openUploadBookModal}>Upload Book</button>
        </li>
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      <header className={classes.header}>
        <Link to="/">
          <div className={classes.logo}>Bookstore</div>
        </Link>
        {isSigned ? LogoutNavigation : LoginNavigation}
      </header>
      {authModal && <AuthFormModal closeModal={closeLoginModal} />}
      {uploadBookModal && <BookFormModal closeModal={closeUploadBookModal} />}
    </>
  );
};

export default MainNavigation;
