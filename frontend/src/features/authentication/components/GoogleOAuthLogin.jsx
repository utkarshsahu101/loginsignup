import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { fetchGoogleUserProfile } from "../services/authenticationService";
// from library
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
// from custom
// import useGoogleLogin from "../hooks/useGoogleLogin";
// import { googleLogout } from "@react-oauth/google";

function GoogleOAuthLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  //   from library
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
  });

  // from custom hook
  //   const login = useGoogleLogin({
  //     onSuccess: (codeResponse) => {
  //       setUser(codeResponse);
  //     },
  //     onError: (error) => {
  //       console.log("Login Failed:", error);
  //     },
  //   });

  const getGoogleUserProfile = async () => {
    let resp = await fetchGoogleUserProfile(user.access_token);
    console.log(resp)
    // if (resp) {
      setProfile(resp);
    //   navigate("/dashboard");
    // }
  };
  useEffect(() => {
    console.log(profile)
  }, [profile])

  useEffect(() => {
    if (user) {
      getGoogleUserProfile();
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return profile ? (
    <div>
      {/* <img src={profile.picture} alt="user image" />
      <h3>User Logged in</h3>
      <p>Name: {profile.name}</p>
      <p>Email Address: {profile.email}</p>
      <br />
      <br /> */}
      <button onClick={logOut}>Log out</button>
    </div>
  ) : (
    <Button
      onClick={login}
      style={{
        background: "#fff",
        border: "none",
        fontSize: "2.5rem",
        cursor: "pointer",
      }}
    >
      <FcGoogle />
    </Button>
  );
}

export default GoogleOAuthLogin;
