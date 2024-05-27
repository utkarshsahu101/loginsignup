import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import Register from "./components/Register";
import Feed from "./components/Feed";
import Dashboard from "./components/Dashboard";
import "./index.css";
import Header from "./layouts/Header/Header";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import ForgetPassword from "./features/authentication/components/ForgetPassword";
import ResetPassword from "./features/authentication/components/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/feed" element={<Feed />} /> */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
