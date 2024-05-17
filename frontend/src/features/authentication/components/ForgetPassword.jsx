// Forget Password Form Component
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../../utils/Toast";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [sendPasswordBtnLoading, setSendPasswordBtnLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const showToastMessage = (msg, messageType) => {
    setMessage(msg);
    setType(messageType);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide the toast after 3 seconds
  };

  const handleSubmit = async (e) => {
    setSendPasswordBtnLoading(true);
    e.preventDefault();
    // Send a request to the backend to initiate the password reset process
    try {
      const response = await axios.post("/auth/forgetPassword", { email });
      const {
        status,
        data: { message },
      } = response;
      if (status === 200) {
        showToastMessage(message, "success");
      } else {
        showToastMessage(message, "error");
      }
    } catch (error) {
      console.error("Error logging info", error);
      showToastMessage("Internal server error", "error");
    }
    setSendPasswordBtnLoading(false);
  };

  return (
    <div>
      <h2>Forgot your password?</h2>
      <h5>Enter your email below to receive a password link.</h5>
      <form onSubmit={handleSubmit}>
        <label>Your email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="submit" disabled={sendPasswordBtnLoading}>
          Send password reset email
        </button>
      </form>
      <p>
        Don't have an account?
        <button type="submit" onClick={() => navigate("/register")}>
          Signup
        </button>
      </p>
      <Toast
        message={message}
        showToast={showToast}
        setShowToast={setShowToast}
        type={type}
      />
    </div>
  );
};

export default ForgetPassword;
