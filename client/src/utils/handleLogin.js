import handleVerification from "./handleVerification";
import getFormData from "./getFormData";
const handleLogin=async(dispatch,data)=>{
    dispatch({ type: "LOGIN_START" });
    try {
     const verified = await handleVerification(data.email,data.password);
    //  if(verified.data.detail) return toast(verified.data.detail);
      const res = await fetch("http://localhost:8003/auth/jwt/login", {
        method: "POST",
        body: getFormData({ username, password }),
      });
      const data = await res.json();
      console.log("data", data);
      if (data.detail) return toast(data.detail);
      let payload = {
        user: username.split("@")[0],
        access_token: data.access_token,
      };
      dispatch({ type: "LOGIN_SUCCESS", payload: payload });
      if(data.access_token)
        navigate('/');
      else 
        toast("Please login again");
    } catch (err) {
      console.log("err", err);
      dispatch({ type: "LOGIN_FAILURE" });
    }
}