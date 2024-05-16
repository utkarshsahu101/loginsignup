import React, { useContext } from "react";
import Logout from "../../components/Logout";
import { AuthContext } from "../../context/AuthContext";
import "./Header.css"

const Header = () => {
  const { token } = useContext(AuthContext);

  return <header>{token && <Logout />}</header>;
};

export default Header;
