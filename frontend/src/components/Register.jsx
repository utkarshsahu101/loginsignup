import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../utils/Toast";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const showToastMessage = (msg, messageType) => {
    setMessage(msg);
    setType(messageType);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000); // Hide the toast after 3 seconds
  };

  const handleFormFieldChange = (e) => {
    let { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const getPasswordCheck = () => {
    let { password, confirmPassword } = userDetails;
    if (password !== confirmPassword)
      return { errorStatus: true, errorName: "Password must be same" };
    return { errorStatus: false };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { errorStatus, errorName } = getPasswordCheck();
    if (errorStatus) return showToastMessage(errorName, "error");
    try {
      const { success, message, data } = await axios.post(
        "/register",
        userDetails
      );
      if (success) {
        showToastMessage(message, "success");
      } else showToastMessage(message, "error");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
        <label>Confirm Password:</label>
        <input
          type="password"
          value={userDetails["confirmPassword"]}
          onChange={handleFormFieldChange}
          name={"confirmPassword"}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>
        Alreay have an account?
        <button type="submit" onClick={() => navigate("/login")}>
          Login
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
}

export default Register;
