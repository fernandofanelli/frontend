import { Link, useNavigate } from "react-router-dom";

import useAuthStore from "../../store/useAuthStore";
import CustomAvatar from "../ui/CustomAvatar";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const navigate = useNavigate();
  const { isSigned, signOut, userData } = useAuthStore();

  const logoutHandler = () => {
    signOut();
    navigate("/");
  };

  const loginNavigation = (
    <nav>
      <ul>
        <li>
          <Link to="/auth">Login</Link>
        </li>
      </ul>
    </nav>
  );

  const logoutNavigation = (
    <nav>
      <ul>
        <li>
          <Link to="/profile">
            <CustomAvatar image={userData.image} />
          </Link>
        </li>
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </nav>
  );

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Bookstore</div>
      </Link>
      {isSigned ? logoutNavigation : loginNavigation}
    </header>
  );
};

export default MainNavigation;
