// useGoogleLogin.js
import { useGoogleLogin as useGoogleLoginLibrary } from "@react-oauth/google";

const useGoogleLogin = (onSuccess, onError) => {
  return useGoogleLoginLibrary({
    onSuccess,
    onError,
  });
};

export default useGoogleLogin;
