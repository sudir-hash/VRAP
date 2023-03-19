import { Link } from "react-router-dom";
import "./LoginCard.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../../Context/Context";
// import getFormData from "../../../utils/getFormData";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import handleLogin from "../../../utils/handleLogin";
import handleTokenExpiration from "../../../utils/handleTokenExpiration";

const LoginCard = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = emailRef.current.value.trim();
    let password = passwordRef.current.value.trim();
    if (!email || !password) {
      return toast("Empty Email or Password");
    }
    dispatch({ type: "LOGIN_START" });
    handleLogin({ email, password })
      .then((res) => {
        //console.log("res", res);
        if (!res.ok) {
          dispatch({ type: "LOGIN_FAILURE" });
          toast(res.error);
        } else if (res.data.access_token) {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          handleTokenExpiration(dispatch);
          navigate("/");
        }else if(res.code){
          dispatch({ type: "LOGIN_FAILURE" });
          toast(res.code==="ERR_NETWORK"?"Network Error":"Please login again");
        } else {
          dispatch({ type: "LOGIN_FAILURE" });
          toast("Please login again");
        }
      })
      .catch((e) => {
        dispatch({ type: "LOGIN_FAILURE" });
        console.error("error while logging in", e);
        toast("Please login again");
      });
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
              type="text"
              className="email__input login__input"
              placeholder="example@gmail.com"
              ref={emailRef}
              // value="newuser0login@gmail.com"
            />
          </div>
          <div className="password__input__container input__container">
            <label className="password__label input__label">Password</label>
            <input
              type="password"
              className="password__input login__input"
              placeholder="**********"
              // value={"Patrick#123456"}
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
            <Link to="/account/register">
              <span className="create_acc">Create account</span>
            </Link>{" "}
          </div>
        </div>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginCard;
