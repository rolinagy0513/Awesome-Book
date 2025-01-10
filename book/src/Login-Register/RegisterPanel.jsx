import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import useCustomFetch from "../Hooks/fetchapi";
import "./RegisterPanel.css";

const url = import.meta.env.VITE_BOOK_API_URL_AUTH;
const URL = `${url}/Register`;

function RegisterPanel() {

  const navigate = useNavigate();
  const {postData} = useCustomFetch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordLength = () =>{
    if(password.length < 8){
      setMessage("The password must be minimum 8 character long");
      setPassword("");
      setConfirmPassword("");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

  if(!handlePasswordLength()){
    return;
  }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    
    setMessage("");
    setIsLoading(true);

    try{
      await postData(URL, null, {Email: email, Password: password, ConfirmPassword: confirmPassword}, "Register", false, "text");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/Login");

    }catch{
      console.log("The api is not responding(Register)")
    }finally{
      setIsLoading(false);
    }

  };

  return (
  <div className="register-page">
    <div className="register-container">

      <label className="welcome-text">
        <h1>Welcome to Awesome Book</h1>
      </label>

      <form className="register-form" onSubmit={handleSubmit}>

      <label className="register-text">Register</label>

        <input
          className="input-element-register"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Please Enter Your Email"
          value={email}
          required
        />
        <input
          className="input-element-register"
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          required
        />
        <input
          className="input-element-register"
          onChange={(e) => setConfirmPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          required
        />

        <div className="checkbox-container-register">
        <label htmlFor="showPassword">Show&nbsp;Password</label>
          <input
            className="checkbox-element-register"
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        </div>

        <button 
          className="submit-button-register"
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Submit"}
        </button> 

        <label className="login-navigate-text" onClick={()=>navigate("/Login")}>If you already have an account Log In</label>

      </form>   
    </div>
  </div>
  );
}

export default RegisterPanel;