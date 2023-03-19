import { Link } from "react-router-dom";
import { useRef } from "react";
import "./RegisterCard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegisterCard = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let name = nameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let address = addressRef.current.value;
    if (!name || !email || !password || !address) {
      return toast("Empty Fields Kindly Fill All Fields");
    }
    try {
      let form = {
        email,
        password,
        address,
      };
      form = JSON.stringify(form);
      //console.log(form, typeof form);
      const res = await fetch("http://localhost:8003/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: form,
      });
      const data = await res.json();
      console.log("data", data);
      // if(!data.hasOwnProperty('detail'))
      //    navigate('/account/login')
      // else{
      //   //console.log("error", data.detail);
      //   toast("error while registering", data.detail);
      //     setTimeout(()=>navigate('/account/register'),500)
      //   ;
      // }
    } catch (err) {
      toast("error while registering", err.detail);
      window.location.href = "/register";
      //console.log("err", err);
    }
  };

  return (
    <div className="register__card__container">
      <div className="register__card">
        <div className="register__header">
          <h1>Create Account</h1>
        </div>
        <div className="register__inputs">
          <div className="fname__input__container reg__input__container">
            <label className="fname__label input__label"> Name</label>
            <input
              type="text"
              className="fname__input register__input"
              ref={nameRef}
              value="John Doe"
            />
          </div>
          <div className="email__input__container reg__input__container">
            <label className="email__label input__label">Email</label>
            <input
              type="email"
              className="email__input register__input"
              placeholder="example@gmail.com"
              ref={emailRef}
              value="newuser0login@gmail.com"
            />
          </div>
          <div className="password__input__container reg__input__container">
            <label className="password__label input__label">Password</label>
            <input
              type="password"
              className="password__input register__input"
              ref={passwordRef}
              value="Patrick#123456"
            />
          </div>
          <div className="password__input__container reg__input__container">
            <label className="password__label input__label">Address</label>
            <input
              type="text"
              className="password__input register__input"
              ref={addressRef}
              value="1234, 5th Street, New York, NY 10001"
            />
          </div>
          <div className="register__button__container">
            <button className="register__button" onClick={handleSubmit}>
              Create Account
            </button>
          </div>
        </div>
        <div className="register__other__actions">
          <div className="register__login__account">
            Already have account? <Link to="/account/login">Login</Link>
          </div>
        </div>
      </div>
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

export default RegisterCard;
