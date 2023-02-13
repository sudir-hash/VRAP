import { Link } from "react-router-dom";
import "./LoginCard.css";
import axios from "axios";
import { useContext, useRef } from "react";
import { AuthContext } from "../../../Context/Auth.context";

const BASE_URL = "http://0.0.0.0:8003/";
const LoginCard = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("userRef", userRef.current.value);
  //   console.log("passwordRef", passwordRef.current.value);

  //   // dispatch({ type: "LOGIN_START" });
  //   try {
  //       const bodyFormData = new FormData();
  //       bodyFormData.append('username', userRef.current.value);
  //       bodyFormData.append('password', passwordRef.current.value);

  //       const res = await axios({
  //         method: "post",
  //         url: BASE_URL + "auth/jwt/login/",
  //         data: bodyFormData,
  //         headers: { "Content-Type": "multipart/form-data" },
  //       })  

  //       console.log("res", res.data);
  //       if(res.data.access_token){
  //           window.location.href = "/";
  //           dispatch({ type: "LOGIN_SUCCESS", payload: userRef.current.value.split('@')[0] });
  //       }else{
  //           alert("Invalid Credentials");
  //           dispatch({ type: "LOGIN_FAILURE" });
  //       }
  //   } catch (err) {
  //       dispatch({ type: "LOGIN_FAILURE" });
  //       console.log(err);
  //   }
  };

  return (
    <div className="login__card__container">
      <form className="login__card" onSubmit={handleSubmit}>
        <div className="login__header">
          <h1>Login</h1>
        </div>
        <div className="login__inputs">
          <div className="email__input__container input__container">
            <label className="email__label input__label">Email</label>
            <input
              type="email"
              className="email__input login__input"
              placeholder="example@gmail.com"
              ref={userRef}
            />
          </div>
          <div className="password__input__container input__container">
            <label className="password__label input__label">Password</label>
            <input
              type="password"
              className="password__input login__input"
              placeholder="**********"
              ref={passwordRef}
            />
          </div>
          <div className="login__button__container">
            <input
              className="login__button"
              type="submit"
              value={"LOGIN"}
            ></input>
          </div>
        </div>
        <div className="login__other__actions">
          <div className="login__forgot__password">Forgot password?</div>
          <div className="login__new__account">
            Don't have account?{" "}
            <span className="create_acc" >
              <Link to="/account/register">Create account</Link>{" "}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
