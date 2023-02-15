import { Link } from 'react-router-dom';
import {  useRef } from 'react';
import './RegisterCard.css';
import  getFormData  from "../../../utils/getFormData";


const RegisterCard = () => {
    const fnameRef=useRef();
    const lnameRef=useRef();
    const emailRef=useRef();
    const passwordRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let fname = fnameRef.current.value;
        let lname = lnameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        if(!fname || !lname || !email || !password){
            return alert('Empty Fields');
        }
        try {
            const res = await fetch("http://localhost:8003/auth/jwt/register", {
                method: "POST",
                body: getFormData({fname, lname, email, password}),
            });
            const data = await res.json();
            console.log("data", data);
            if(data.hasOwnProperty('email'))
            window.location.href='/';
            
            else{
                console.log('error', data)
                alert('error while registering')
                window.location.href='/account/register';
            }
        } catch (err) {
            alert('error while registering')
            window.location.href='/register';
            console.log("err", err);
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
                        <label className="fname__label input__label">First name</label>
                        <input type="text" className="fname__input register__input" ref={fnameRef}/>
                    </div>
                    <div className="lname__input__container reg__input__container">
                        <label className="lname__label input__label">Last name</label>
                        <input type="text" className="lname__input register__input" ref={lnameRef}/>
                    </div>
                    <div className="email__input__container reg__input__container">
                        <label className="email__label input__label">Email</label>
                        <input type="email" className="email__input register__input" placeholder='example@gmail.com' ref={emailRef}/>
                    </div>
                    <div className="password__input__container reg__input__container">
                        <label className="password__label input__label">Password</label>
                        <input type="password" className="password__input register__input" ref={passwordRef}/>
                    </div>
                    <div className="register__button__container">
                        <button className="register__button" onClick={handleSubmit} >Create Account</button>
                    </div>
                </div>
                <div className="register__other__actions">
                    <div className="register__login__account">Already have account? <Link to="/account/login">Login</Link></div>
                </div>
            </div>
        </div>
     );
}
 
export default RegisterCard;