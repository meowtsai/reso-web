import axios from "axios";
import jwtDecode from "jwt-decode";

const setAuthToken = (token) => {
  //console.log("setAuthToken", token);
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
  const user = getLoggedInUser();
  if (!user) {
    return false;
  }
  const decoded = jwtDecode(user.token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.warn("access token expired");
    return false;
  } else {
    setAuthToken(user.token);
    return true;
  }
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  //console.log("getLoggedInUser", typeof user);

  if (user?.token) {
    const decoded = jwtDecode(user.token);
    //console.log("decoded", decoded);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      //console.log("decoded expirde");
      localStorage.removeItem("userInfo");
      return null;
    }
  }
  return user;
};

const setLoggedInUser = (user) => {
  localStorage.setItem("userInfo", user);
};

const logoutUser = () => {
  localStorage.removeItem("userInfo");
};

const getFbLoginUrl = () => {
  return `https://www.facebook.com/v9.0/dialog/oauth?client_id=1702235999950689&redirect_uri=${window.location.origin}/login/facebook`;
};
export {
  getFbLoginUrl,
  isUserAuthenticated,
  getLoggedInUser,
  setAuthToken,
  setLoggedInUser,
  logoutUser,
};
