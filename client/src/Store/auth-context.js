import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  cookies: {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    if (cookies.user) {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    removeCookie("user");
    setIsLoggedIn(false);
  };

  const loginHandler = (email, data) => {
    const user = { email, ...data };
    setCookie("user", user, { path: "/" });
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        cookies: cookies,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
