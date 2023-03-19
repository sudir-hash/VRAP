import handleVerification from "./handleVerification";
import getFormData from "./getFormData";
import axios from "axios";
const handleLogin=async({email,password})=>{
    
    try {
    //  const verified = await handleVerification(email,password);
    //  if(verified.data.detail) return toast(verified.data.detail);
      const res = await axios('http://localhost:8003/auth/jwt/login',{
        method:'POST',
        data:getFormData({username:email,password}),
        headers:{
          'Content-Type':'application/x-www-form-urlencoded',          
        }
      });
      const data = res.data;
      if (data.detail) return {
        ok:false,
        error:data.detail
      };
      let payload = {
        user: email.split("@")[0],
        access_token: data.access_token,
      };
      return {
        ok:true,
        data:payload
      };
    } catch (err) {
      console.log("err", err);
      return {
        ok:false,
        error:err,
        code:err.code 
      }
    }
}


export default handleLogin;