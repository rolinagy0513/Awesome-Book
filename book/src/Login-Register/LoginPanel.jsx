import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom'; 
import useCustomFetch from "../Hooks/fetchapi";
import { FaArrowLeft } from 'react-icons/fa';
import "./LoginPanel.css";

const URL = "http://bookstoreapiazure.azurewebsites.net/api/Auth/Login";

function LoginPanel(){

  const navigate = useNavigate("");

  const {postData} = useCustomFetch();

  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("");
  const[showPassword, setShowPassword] = useState(false);
  const[message, setMessage] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    if(isLoggedIn){
      const timer  = setTimeout(()=>{
        navigate("/Refresh")
      },2000);
      return() => clearTimeout(timer);
    }
  },[isLoggedIn])

  const handleNavigation = () => {
    navigate('/');
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setIsLoading(true);

    try{
      const data = await postData(URL, null, {Email: email, Password: password}, "LoginPanel", false);

      if(data){

        const accessToken = data["accessToken"];
        const refreshToken = data["refreshToken"];
        const accessExpiration = data["accessExpirationDate"];
        const refreshExpiartion = data["refreshExpirationDate"];

        localStorage.setItem('AccessToken', accessToken);
        localStorage.setItem('RefreshToken', refreshToken);
        localStorage.setItem('AccessExpiration', accessExpiration);
        localStorage.setItem('RefreshExpiration', refreshExpiartion)

        console.log("Access token saved:", accessToken);
        console.log("Refresh token saved:", refreshToken)
        console.log("A-Expiration saved:", accessExpiration);
        console.log("R-Expiration saved:", refreshExpiartion);
               
        localStorage.setItem("UserName",email)
        setEmail("");
        setPassword("");
        setMessage("Succesfull login");
        setIsLoggedIn(true);
        navigate("/Content")

      }else{
        setMessage("Can not acces data");
      }
    }catch{
      setMessage("Something went wrong...");
    }

  }

  return(
    <div className="loginpage-container">
       
      <div className="login-container">

        <div className="back-navigation-login">
        <button onClick={handleNavigation}><FaArrowLeft/></button>
        </div>

        <div className="form-container">

          <form onSubmit={handleSubmit}>

          <label className="login-text">Log In</label>

            <input
              className="input-element-login"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              value={email}
              required
            />
            <input
              className="input-element-login"
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
            />

            <div className="checkbox-container-login">
            <label htmlFor="showPassword">Show&nbsp;Password</label>
              <input
                className="checkbox-element-login"
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </div>

            {message && (
              <p style={{ 
                color: message.includes("Succesfull") ? "green" : "red" 
              }}>
                {message}
              </p>
            )}

            <button 
              className="submit-button-login"
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Submit"}
            </button>
          </form>
        </div> 
      </div>

      
      <div className="image-container">
        <p>Welcome Back!</p>
      </div>

    </div>
  )

}

export default LoginPanel;