import { useEffect } from "react";
import Book from "../../components/Book/components/Book";
import Button from "../../components/ui/Button";
import { Fade } from "react-awesome-reveal";

import useAuthStore from "../../store/useAuthStore";
import useBooksStore from "../../store/useBooksStore";
import classes from "./Profile.module.css";

const Profile = () => {
  const { userBooks, getUserBooks } = useBooksStore();
  const { userData } = useAuthStore();

  useEffect(() => {
    getUserBooks(userData.id);
  }, []);

  return (
    <div>
      <div className={classes.parentDiv}>
        <div className={classes.leftDiv}>
          <label className={classes.customFileUpload}>
            <div className={classes.imgWrap}>
              <img src={userData.image_cover} alt="user img" />
            </div>
          </label>
        </div>
        <div className={classes.rightDiv}>
          <div className={classes.name}>{userData.name}</div>
          <div className={classes.email}>{userData.email}</div>
          <div className={classes.name}>
            Amount of books owned: {userBooks.length}
          </div>
          <div className={classes.name}>Amount of books ordered: 0</div>
        </div>
      </div>
      <Button className={classes.actions}>Edit Profile</Button>

      <Fade bottom cascade>
        {!userBooks ? (
          <div>Loading...</div>
        ) : (
          <ul className={classes.books}>
            {userBooks.map((book, key) => (
              <Book book={book} key={key} />
            ))}
          </ul>
        )}
      </Fade>
    </div>
  );
};

export default Profile;
