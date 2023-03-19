import React,{createContext} from 'react';
import { useSetState,useReduc } from 'react-use';
import axios from "axios";


const BASE_URL = "http://0.0.0.0:8003/";

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  access_token:JSON.parse(localStorage.getItem("access_token")) || null,
}

export const ContextProvider = props => {
  const [state, setState] = useSetState(initialState);
  const setLoginPending = (isLoginPending) => setState({isLoginPending});
  const setLoginSuccess = (isLoggedIn) => setState({isLoggedIn});
  const setLoginError = (loginError) => setState({loginError});
  const login = (email, password) => {
    //console.log('login initiated')
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);
    fetchLogin( email, password, error => {
      setLoginPending(false);
      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    });
  }

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
  }
  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext(initialState);

const getFormData = (email, password) => {
  const form = new FormData();
  form.append('username', email);
  form.append('password', password);
  return form;
}

// fake login
const fetchLogin = async(email, password, callback) => {
    if(!email || !password){
      return callback(new Error('Invalid email and password'));
    }
    let form= getFormData(email, password);
    const res = await axios({
      method: "post",
      url: BASE_URL + "auth/jwt/login/",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    }); 
    if(res.data.access_token){
      sessionStorage.setItem('access_token', res.data.access_token);
      sessionStorage.setItem('user', email.split('@')[0]);
      return callback(null);
    }else{
      return callback(new Error('Invalid email and password'));
    }
}
