import React, { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  return (
    <CiLogout
      onClick={() => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login");
      }}
    />
  );
};

export default Logout;
