import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../utils/Toast";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import GoogleOAuthLogin from "../features/authentication/components/GoogleOAuthLogin";
import AuthenticationFeature from "../features/authentication";
import Button from "./Button";

function Login() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const { setToken } = useContext(AuthContext);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const showToastMessage = (msg, messageType) => {
    setMessage(msg);
    setType(messageType);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide the toast after 3 seconds
  };

  const handleFormFieldChange = (e) => {
    let { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", userDetails);
      const {
        data: { success, message, token: jwtToken },
      } = response;
      if (success) {
        setToken(jwtToken);
        localStorage.setItem("token", jwtToken);
        showToastMessage(message, "success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        showToastMessage(message, "error");
        setToken(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        // Handle invalid email/password error
        showToastMessage("Invalid email or password", "error");
      } else {
        console.error("Error logging in:", error);
      }
    }
  };

  const responseMessage = (response) => {
    console.log(response);
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={userDetails["email"]}
          onChange={handleFormFieldChange}
          name={"email"}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={userDetails["password"]}
          onChange={handleFormFieldChange}
          name={"password"}
        />
        <br />
        <label>Remember Me</label>
        <input type="checkbox" />
        <Button
          onClick={() => navigate("/forgetpassword")}
          style={{
            background: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Forget Password
        </Button>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>
        Don't have an account?
        <button type="submit" onClick={() => navigate("/register")}>
          Signup
        </button>
      </p>
      <AuthenticationFeature />
      <Toast
        message={message}
        showToast={showToast}
        setShowToast={setShowToast}
        type={type}
      />
    </div>
  );
}

export default Login;
