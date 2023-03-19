import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
const INITIAL_STATE = {
  user:         (localStorage.getItem("user"))=="undefined"?null:JSON.parse(localStorage.getItem("user")),
  access_token:  (localStorage.getItem("access_token"))=="undefined"?null:JSON.parse(localStorage.getItem("access_token")),
  isFetching: false,
  error: false,
  isLogged: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    //console.log("state changed", state);
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("access_token", JSON.stringify(state.access_token));
  }, [state.user,state.access_token]);
 
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        access_token: state.access_token,
        isFetching: state.isFetching,
        error: state.error,
        dispatch:dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
