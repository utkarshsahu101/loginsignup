// authenticationService.js
import axios from "axios";

export const fetchGoogleUserProfile = async (accessToken) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );
    if(response.status === 200) {
        return response.data;
    } else {
        return null;
    }
  } catch (error) {
    throw error;
  }
};
