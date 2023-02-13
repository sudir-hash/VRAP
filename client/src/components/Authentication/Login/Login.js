import { AuthContextProvider } from "../../../Context/Context";
import LoginCard from "../../Card/LoginCard/LoginCard";
import "./Login.css";

const Login = () => {
  return (
    // <AuthContextProvider>
      <div className="login__auth__container">
        <div className="login__auth">
          <LoginCard />
        </div>
      </div>
// </AuthContextProvider>
  );    
};

export default Login;
