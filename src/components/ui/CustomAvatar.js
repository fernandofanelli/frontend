import React from "react";
import Avatar from "react-avatar";

const CustomAvatar = ({ image }) => {
  return (
    <Avatar
      id="avatar"
      src={image}
      size="50px"
      round={true}
      style={{ borderRadius: "10px" }}
    />
  );
};

export default CustomAvatar;
