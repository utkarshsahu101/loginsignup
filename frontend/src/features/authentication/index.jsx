// index.jsx
import React from "react";
import GoogleOAuthLogin from "./components/GoogleOAuthLogin";

function AuthenticationFeature() {
  return (
    <div>
      <GoogleOAuthLogin />
    </div>
  );
}

export default AuthenticationFeature;
