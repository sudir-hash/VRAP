import { Link } from "react-router-dom";
import "./LoginCard.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../../Context/Context";
import  getFormData  from "../../../utils/getFormData";

const LoginCard = () => {
  const {dispatch} = useContext(AuthContext);
  const userRef = useRef();
  const passwordRef = useRef();  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let username = userRef.current.value;
    let password = passwordRef.current.value;
    if(!username || !password){
      return alert('Empty Email or Password');
    }
    dispatch({type:"LOGIN_START"});
    try {
      const res = await fetch("http://localhost:8003/auth/jwt/login", {
        method: "POST",
        body: getFormData({username, password}),
      });
      const data = await res.json();
      console.log("data", data);
      let payload = {
        user: username.split('@')[0],
        access_token: data.access_token,
      }
      dispatch({type:"LOGIN_SUCCESS", payload:payload});
      window.location.href='/';
    } catch (err) {
      console.log("err", err);
      dispatch({type:"LOGIN_FAILURE"});
    }

  };

  return (
    <div className="login__card__container">
      <form className="login__card" onSubmit={handleSubmit}>
        <div className="login__header">
          <h1>Login</h1>
        </div>
        <div className="login__inputs">
          <div className="email__input__container input__container">
            <label className="email__label input__label" >Email</label>
            <input
              type="text"
              className="email__input login__input"
              placeholder="example@gmail.com"
              ref={userRef}
              value="JohnDoe@gmail.com"
            />
          </div>
          <div className="password__input__container input__container">
            <label className="password__label input__label" >Password</label>
            <input
              type="password"
              className="password__input login__input"
              placeholder="**********"
              value={"password"}
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
            
              <Link to="/account/register"><span className="create_acc" >Create account</span></Link>{" "}
            
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
