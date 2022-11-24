import React from "react";
import Avatar from "react-avatar";

const CustomAvatar = ({ name }) => {
  return (
    <Avatar
      id="avatar"
      name={name}
      size="50px"
      round={true}
      style={{ borderRadius: "10px" }}
    />
  );
};

export default CustomAvatar;
