import { useContext, useState } from "react";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../../utils/Toast";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;

  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const { setToken } = useContext(AuthContext);

  const showToastMessage = (msg, messageType) => {
    setMessage(msg);
    setType(messageType);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000); // Hide the toast after 3 seconds
  };

  const handleFormFieldChange = (e) => {
    let { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const getPasswordCheck = () => {
    let { password, confirmPassword } = credentials;
    if (password !== confirmPassword)
      return { errorStatus: true, errorName: "Password must be same" };
    return { errorStatus: false };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { errorStatus, errorName } = getPasswordCheck();
    if (errorStatus) return showToastMessage(errorName, "error");
    try {
      const response = await axios.post(
        `/auth/resetPassword`,
        {
          password: credentials["password"],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const {
        status,
        data: { message },
      } = response;
      if (status === 200) {
        showToastMessage(message, "success");
        setToken(token);
        localStorage.setItem("token", token);
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
        showToastMessage(
          "This link is not valid anymore please regenerate",
          "error"
        );
      } else {
        console.error("Error logging in:", error);
      }
    }
  };

  return (
    <div>
      <h3>Update Password</h3>
      <form onSubmit={handleSubmit}>
        <label>Password:</label>
        <input
          type="password"
          value={credentials["password"]}
          onChange={handleFormFieldChange}
          name={"password"}
        />
        <br />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={credentials["confirmPassword"]}
          onChange={handleFormFieldChange}
          name={"confirmPassword"}
        />
        <br />
        <Button type="submit">Save</Button>
      </form>
      <Toast
        message={message}
        showToast={showToast}
        setShowToast={setShowToast}
        type={type}
      />
    </div>
  );
};

export default ResetPassword;
