import handleVerification from "./handleVerification";
import getFormData from "./getFormData";
import axios from "axios";
import BASE_URL from "../constants/BASE_URL";
const handleLogin=async({email,password})=>{
    
    try {
    //  const verified = await handleVerification(email,password);
    //  if(verified.data.detail) return toast(verified.data.detail);
      const res = await axios(BASE_URL+'/auth/jwt/login',{
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
      console.log("err", err.message);
      return {
        ok:false,
        error:err,
        code:err.code 
      }
    }
}


export default handleLogin;